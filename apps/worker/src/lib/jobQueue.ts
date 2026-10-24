import { getClient } from '@prguardian/database';
import { logger } from '@prguardian/observability';
import type { WorkerConfig } from '../config.js';

export interface ReviewJobRow {
  id: string;
  status: string;
  installation_id: bigint;
  repository_id: bigint;
  pr_number: number;
  head_sha: string;
  attempts: number;
  max_attempts: number;
  lease_expires_at: Date | null;
  created_at: Date;
}

export async function claimJob(config: WorkerConfig): Promise<ReviewJobRow | null> {
  const db = getClient();

  return db.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<ReviewJobRow[]>`
      SELECT id, status, installation_id, repository_id, pr_number,
             head_sha, attempts, max_attempts, lease_expires_at, created_at
      FROM   review_jobs
      WHERE  status = 'pending'
        AND  (lease_expires_at IS NULL OR lease_expires_at < NOW())
      ORDER  BY created_at ASC
      LIMIT  1
      FOR UPDATE SKIP LOCKED
    `;

    if (rows.length === 0) return null;

    const row = rows[0]!;
    const leaseExpiresAt = new Date(Date.now() + config.WORKER_LEASE_SECONDS * 1000);

    await tx.reviewJob.update({
      where: { id: row.id },
      data: {
        status: 'running',
        leaseExpiresAt,
        attempts: { increment: 1 },
      },
    });

    return row;
  });
}

export async function processJob(job: ReviewJobRow): Promise<void> {
  const db = getClient();

  logger.info(
    { jobId: job.id, prNumber: job.pr_number, installationId: String(job.installation_id) },
    'Processing job (pipeline not implemented in M3)',
  );

  await db.reviewJob.update({
    where: { id: job.id },
    data: { status: 'succeeded', completedAt: new Date() },
  });
}

export async function handleJobFailure(
  job: ReviewJobRow,
  config: WorkerConfig,
  error: unknown,
): Promise<void> {
  const db = getClient();
  const errorMessage = error instanceof Error ? error.message : String(error);

  logger.error({ jobId: job.id, attempts: job.attempts, error: errorMessage }, 'Job processing failed');

  if (job.attempts < job.max_attempts) {
    await db.reviewJob.update({
      where: { id: job.id },
      data: { status: 'pending', leaseExpiresAt: null, errorMessage },
    });
  } else {
    await db.reviewJob.update({
      where: { id: job.id },
      data: { status: 'failed', completedAt: new Date(), errorMessage },
    });
  }
}
