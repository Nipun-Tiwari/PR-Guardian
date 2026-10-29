import { Router } from 'express';
import express from 'express';
import type { Request, Response } from 'express';
import { getClient } from '@prguardian/database';
import { logger } from '@prguardian/observability';
import { config } from '../config.js';
import { verifyGitHubSignature, WebhookSignatureError } from '../lib/webhookSignature.js';
import type { ApiProblemV1 } from '@prguardian/shared';

export const webhookRouter = Router();

// Raw body parser — must run before express.json() consumes the stream
webhookRouter.post(
  '/webhooks/github',
  express.raw({ type: '*/*', limit: '1mb' }),
  async (req: Request, res: Response): Promise<void> => {
    const db = getClient();

    // 1. Verify HMAC-SHA256 signature against raw bytes
    try {
      verifyGitHubSignature(
        req.body as Buffer,
        config.WEBHOOK_SECRET,
        req.headers['x-hub-signature-256'] as string | undefined,
      );
    } catch (err) {
      if (err instanceof WebhookSignatureError) {
        logger.warn({ err: err.message }, 'Webhook signature verification failed');
        const problem: ApiProblemV1 = {
          type: 'https://prguardian.dev/problems/signature-invalid',
          title: 'Webhook signature invalid',
          status: 401,
          detail: err.message,
          code: 'AUTHENTICATION_REQUIRED',
          requestId: (req as { id?: string }).id ?? 'unknown',
          retryable: false,
        };
        res.status(401).contentType('application/problem+json').json(problem);
        return;
      }
      throw err;
    }

    // 2. Parse JSON after signature is confirmed valid
    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse((req.body as Buffer).toString('utf8')) as Record<string, unknown>;
    } catch {
      res.status(400).json({ error: 'Invalid JSON payload' });
      return;
    }

    const deliveryId = req.headers['x-github-delivery'] as string | undefined;
    const event = req.headers['x-github-event'] as string | undefined;
    const action = typeof payload['action'] === 'string' ? payload['action'] : null;

    if (!deliveryId || !event) {
      res.status(400).json({ error: 'Missing required webhook headers' });
      return;
    }

    // 3. Deduplicate by delivery ID
    try {
      await db.webhookDelivery.create({
        data: { githubDeliveryId: deliveryId, event, action },
      });
    } catch (err: unknown) {
      // Prisma unique constraint violation code
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code: string }).code === 'P2002'
      ) {
        logger.info({ deliveryId }, 'Duplicate webhook delivery — ignoring');
        const problem: ApiProblemV1 = {
          type: 'https://prguardian.dev/problems/conflict',
          title: 'Duplicate delivery',
          status: 409,
          detail: 'This delivery has already been processed.',
          code: 'CONFLICT',
          requestId: (req as { id?: string }).id ?? 'unknown',
          retryable: false,
        };
        res.status(409).contentType('application/problem+json').json(problem);
        return;
      }
      throw err;
    }

    // 4. Route by event type
    try {
      if (event === 'pull_request') {
        await handlePullRequestEvent(payload, action);
      } else if (event === 'installation') {
        await handleInstallationEvent(payload, action);
      } else {
        logger.debug({ event, deliveryId }, 'Unsupported webhook event — skipping');
      }
    } catch (err) {
      logger.error({ err, event, deliveryId }, 'Error handling webhook event');
      throw err;
    }

    res.status(204).end();
  },
);

async function handlePullRequestEvent(
  payload: Record<string, unknown>,
  action: string | null,
): Promise<void> {
  const supportedActions = ['opened', 'synchronize', 'reopened'];
  if (!action || !supportedActions.includes(action)) {
    logger.debug({ action }, 'Unsupported pull_request action — skipping');
    return;
  }

  const db = getClient();
  const installation = payload['installation'] as { id: number } | undefined;
  const repository = payload['repository'] as { id: number } | undefined;
  const pullRequest = payload['pull_request'] as
    { number: number; head: { sha: string } } | undefined;

  if (!installation || !repository || !pullRequest) {
    logger.warn({ payload }, 'pull_request event missing required fields');
    return;
  }

  const job = await db.reviewJob.create({
    data: {
      status: 'pending',
      installationId: BigInt(installation.id),
      repositoryId: BigInt(repository.id),
      prNumber: pullRequest.number,
      headSha: pullRequest.head.sha,
      attempts: 0,
      maxAttempts: 3,
    },
  });

  logger.info({ jobId: job.id, prNumber: pullRequest.number, action }, 'Review job enqueued');
}

async function handleInstallationEvent(
  payload: Record<string, unknown>,
  action: string | null,
): Promise<void> {
  const db = getClient();
  const installation = payload['installation'] as
    { id: number; account: { id: number; login: string } } | undefined;
  const sender = payload['sender'] as { id: number } | undefined;
  const repositories = payload['repositories'] as
    Array<{ id: number; name: string; full_name: string }> | undefined;

  if (!installation) {
    logger.warn('installation event missing installation field');
    return;
  }

  if (action === 'created') {
    // Best-effort: look up the User by sender's GitHub ID
    let createdByUserId: string | null = null;
    if (sender?.id) {
      const user = await db.user.findUnique({
        where: { githubUserId: BigInt(sender.id) },
      });
      createdByUserId = user?.id ?? null;
    }

    await db.repositoryInstallation.upsert({
      where: { githubInstallationId: BigInt(installation.id) },
      create: {
        githubInstallationId: BigInt(installation.id),
        githubAccountId: BigInt(installation.account.id),
        githubAccountLogin: installation.account.login,
        createdByUserId,
        status: 'active',
        installedAt: new Date(),
      },
      update: {
        status: 'active',
        removedAt: null,
      },
    });

    // Upsert each repository in the payload
    for (const repo of repositories ?? []) {
      await db.repository.upsert({
        where: { githubRepositoryId: BigInt(repo.id) },
        create: {
          githubRepositoryId: BigInt(repo.id),
          githubInstallationId: BigInt(installation.id),
          owner: installation.account.login,
          name: repo.name,
          fullName: repo.full_name,
          isActive: true,
          ownedByUserId: createdByUserId,
        },
        update: {
          isActive: true,
          githubInstallationId: BigInt(installation.id),
        },
      });
    }

    logger.info(
      { installationId: installation.id, createdByUserId, repoCount: (repositories ?? []).length },
      'GitHub App installation created',
    );
  } else if (action === 'deleted') {
    await db.repositoryInstallation.updateMany({
      where: { githubInstallationId: BigInt(installation.id) },
      data: { status: 'removed', removedAt: new Date() },
    });
    await db.repository.updateMany({
      where: { githubInstallationId: BigInt(installation.id) },
      data: { isActive: false },
    });

    logger.info({ installationId: installation.id }, 'GitHub App installation deleted');
  } else {
    logger.debug({ action }, 'Unsupported installation action — skipping');
  }
}
