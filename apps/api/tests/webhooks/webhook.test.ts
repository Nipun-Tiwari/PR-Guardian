import { describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/server.js';
import { getClient } from '@prguardian/database';
import { buildSignedWebhookRequest } from '../helpers/webhook.js';
import { createAuthenticatedSession, cleanupTestUser } from '../helpers/session.js';

const WEBHOOK_SECRET = 'test_webhook_secret_at_least_32_chars_xxx';
const app = createApp();
const db = getClient();

async function cleanupDelivery(deliveryId: string): Promise<void> {
  await db.webhookDelivery.deleteMany({ where: { githubDeliveryId: deliveryId } });
}

async function cleanupJobs(): Promise<void> {
  await db.reviewJob.deleteMany({});
}

afterEach(async () => {
  await cleanupJobs();
});

// UT-C07 — Bad signature
describe('POST /webhooks/github — signature verification', () => {
  it('returns 401 AUTHENTICATION_REQUIRED when signature is wrong', async () => {
    const deliveryId = `sig-test-${Date.now()}`;
    const { body, headers } = buildSignedWebhookRequest(
      'ping',
      { action: 'ping' },
      'wrong_secret',
      deliveryId,
    );

    const res = await request(app).post('/webhooks/github').set(headers).send(body);

    expect(res.status).toBe(401);
    expect(res.body.code).toBe('AUTHENTICATION_REQUIRED');
    await cleanupDelivery(deliveryId);
  });

  it('returns 401 when X-Hub-Signature-256 header is absent', async () => {
    const res = await request(app)
      .post('/webhooks/github')
      .set('content-type', 'application/json')
      .set('x-github-event', 'ping')
      .set('x-github-delivery', `no-sig-${Date.now()}`)
      .send(JSON.stringify({ action: 'ping' }));

    expect(res.status).toBe(401);
  });
});

// UT-C08 — Deduplication (IT-13)
describe('POST /webhooks/github — deduplication', () => {
  it('returns 409 CONFLICT on duplicate X-GitHub-Delivery', async () => {
    const deliveryId = `dup-test-${Date.now()}`;
    const payload = makePullRequestPayload('opened');
    const { body, headers } = buildSignedWebhookRequest(
      'pull_request',
      payload,
      WEBHOOK_SECRET,
      deliveryId,
    );

    const first = await request(app).post('/webhooks/github').set(headers).send(body);
    expect(first.status).toBe(204);

    const second = await request(app).post('/webhooks/github').set(headers).send(body);
    expect(second.status).toBe(409);
    expect(second.body.code).toBe('CONFLICT');

    // Only one job should have been created
    const jobs = await db.reviewJob.findMany({ where: { prNumber: payload.pull_request.number } });
    expect(jobs.length).toBe(1);

    await cleanupDelivery(deliveryId);
  });
});

// UT-C08 — Event routing
describe('POST /webhooks/github — event routing', () => {
  it('returns 204 for unsupported event type (push)', async () => {
    const deliveryId = `push-${Date.now()}`;
    const { body, headers } = buildSignedWebhookRequest(
      'push',
      { ref: 'refs/heads/main' },
      WEBHOOK_SECRET,
      deliveryId,
    );

    const res = await request(app).post('/webhooks/github').set(headers).send(body);
    expect(res.status).toBe(204);
    await cleanupDelivery(deliveryId);
  });

  it('returns 204 for pull_request:closed (unsupported action) — no job created', async () => {
    const deliveryId = `pr-closed-${Date.now()}`;
    const payload = makePullRequestPayload('closed');
    const { body, headers } = buildSignedWebhookRequest(
      'pull_request',
      payload,
      WEBHOOK_SECRET,
      deliveryId,
    );

    const res = await request(app).post('/webhooks/github').set(headers).send(body);
    expect(res.status).toBe(204);

    const jobs = await db.reviewJob.findMany({ where: { prNumber: payload.pull_request.number } });
    expect(jobs.length).toBe(0);
    await cleanupDelivery(deliveryId);
  });

  it('returns 204 and creates a review_jobs row for pull_request:opened (IT-12)', async () => {
    const deliveryId = `pr-opened-${Date.now()}`;
    const payload = makePullRequestPayload('opened');
    const { body, headers } = buildSignedWebhookRequest(
      'pull_request',
      payload,
      WEBHOOK_SECRET,
      deliveryId,
    );

    const res = await request(app).post('/webhooks/github').set(headers).send(body);
    expect(res.status).toBe(204);

    const job = await db.reviewJob.findFirst({ where: { prNumber: payload.pull_request.number } });
    expect(job).not.toBeNull();
    expect(job!.status).toBe('pending');
    expect(job!.headSha).toBe(payload.pull_request.head.sha);
    await cleanupDelivery(deliveryId);
  });

  it('returns 204 and creates a review_jobs row for pull_request:synchronize', async () => {
    const deliveryId = `pr-sync-${Date.now()}`;
    const payload = makePullRequestPayload('synchronize');
    const { body, headers } = buildSignedWebhookRequest(
      'pull_request',
      payload,
      WEBHOOK_SECRET,
      deliveryId,
    );

    const res = await request(app).post('/webhooks/github').set(headers).send(body);
    expect(res.status).toBe(204);

    const job = await db.reviewJob.findFirst({ where: { prNumber: payload.pull_request.number } });
    expect(job).not.toBeNull();
    expect(job!.status).toBe('pending');
    await cleanupDelivery(deliveryId);
  });

  it('returns 204 and upserts installation for installation:created', async () => {
    const deliveryId = `install-created-${Date.now()}`;
    const installationId = Math.floor(Math.random() * 1_000_000) + 100_000;
    const payload = makeInstallationPayload('created', installationId);
    const { body, headers } = buildSignedWebhookRequest(
      'installation',
      payload,
      WEBHOOK_SECRET,
      deliveryId,
    );

    const res = await request(app).post('/webhooks/github').set(headers).send(body);
    expect(res.status).toBe(204);

    const installation = await db.repositoryInstallation.findUnique({
      where: { githubInstallationId: BigInt(installationId) },
    });
    expect(installation).not.toBeNull();
    expect(installation!.status).toBe('active');
    expect(installation!.createdByUserId).toBeNull(); // no matching user in DB

    // Cleanup
    await db.repository.deleteMany({ where: { githubInstallationId: BigInt(installationId) } });
    await db.repositoryInstallation.delete({
      where: { githubInstallationId: BigInt(installationId) },
    });
    await cleanupDelivery(deliveryId);
  });

  it('populates createdByUserId when sender matches a known user (IT-12)', async () => {
    const { userId } = await createAuthenticatedSession({ githubUserId: BigInt(999888) });
    const deliveryId = `install-known-sender-${Date.now()}`;
    const installationId = Math.floor(Math.random() * 1_000_000) + 200_000;
    const payload = makeInstallationPayload('created', installationId, 999888);
    const { body, headers } = buildSignedWebhookRequest(
      'installation',
      payload,
      WEBHOOK_SECRET,
      deliveryId,
    );

    const res = await request(app).post('/webhooks/github').set(headers).send(body);
    expect(res.status).toBe(204);

    const installation = await db.repositoryInstallation.findUnique({
      where: { githubInstallationId: BigInt(installationId) },
    });
    expect(installation!.createdByUserId).toBe(userId);

    // Cleanup
    await db.repository.deleteMany({ where: { githubInstallationId: BigInt(installationId) } });
    await db.repositoryInstallation.delete({
      where: { githubInstallationId: BigInt(installationId) },
    });
    await cleanupDelivery(deliveryId);
    await cleanupTestUser(userId);
  });

  it('returns 204 and marks installation removed for installation:deleted', async () => {
    const installationId = Math.floor(Math.random() * 1_000_000) + 300_000;

    // Create an installation first
    await db.repositoryInstallation.create({
      data: {
        githubInstallationId: BigInt(installationId),
        githubAccountId: BigInt(42),
        githubAccountLogin: 'testorg',
        status: 'active',
        installedAt: new Date(),
      },
    });

    const deliveryId = `install-deleted-${Date.now()}`;
    const payload = makeInstallationPayload('deleted', installationId);
    const { body, headers } = buildSignedWebhookRequest(
      'installation',
      payload,
      WEBHOOK_SECRET,
      deliveryId,
    );

    const res = await request(app).post('/webhooks/github').set(headers).send(body);
    expect(res.status).toBe(204);

    const installation = await db.repositoryInstallation.findUnique({
      where: { githubInstallationId: BigInt(installationId) },
    });
    expect(installation!.status).toBe('removed');
    expect(installation!.removedAt).not.toBeNull();

    await db.repositoryInstallation.delete({
      where: { githubInstallationId: BigInt(installationId) },
    });
    await cleanupDelivery(deliveryId);
  });
});

// --- Payload factories ---

function makePullRequestPayload(action: string) {
  const prNumber = Math.floor(Math.random() * 10_000) + 1;
  return {
    action,
    installation: { id: 111111 },
    repository: { id: 222222 },
    pull_request: {
      number: prNumber,
      head: { sha: `deadbeef${prNumber.toString(16).padStart(8, '0')}` },
    },
  };
}

function makeInstallationPayload(action: string, installationId: number, senderId?: number) {
  return {
    action,
    installation: {
      id: installationId,
      account: { id: 42, login: 'testorg' },
    },
    sender: senderId ? { id: senderId } : { id: 0 },
    repositories: [{ id: installationId + 1, name: 'test-repo', full_name: 'testorg/test-repo' }],
  };
}
