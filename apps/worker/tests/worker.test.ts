import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { getClient } from '@prguardian/database';
import { claimJob, processJob, handleJobFailure, type ReviewJobRow } from '../src/lib/jobQueue.js';
import { workerConfig } from '../src/config.js';

const db = getClient();

async function createPendingJob(overrides?: Partial<{
  attempts: number;
  maxAttempts: number;
  leaseExpiresAt: Date | null;
}>): Promise<string> {
  const job = await db.reviewJob.create({
    data: {
      status: 'pending',
      installationId: BigInt(111),
      repositoryId: BigInt(222),
      prNumber: Math.floor(Math.random() * 10_000) + 1,
      headSha: 'abc123',
      attempts: overrides?.attempts ?? 0,
      maxAttempts: overrides?.maxAttempts ?? 3,
      leaseExpiresAt: overrides?.leaseExpiresAt !== undefined ? overrides.leaseExpiresAt : null,
    },
  });
  return job.id;
}

afterEach(async () => {
  await db.reviewJob.deleteMany({});
});

// UT-L05 — Worker claim/retry logic
describe('claimJob', () => {
  it('returns null when queue is empty', async () => {
    const job = await claimJob(workerConfig);
    expect(job).toBeNull();
  });

  it('claims the oldest pending job and marks it running', async () => {
    // Create two jobs — first one (older) should be claimed
    const id1 = await createPendingJob();
    await new Promise((r) => setTimeout(r, 5)); // ensure different created_at
    await createPendingJob();

    const claimed = await claimJob(workerConfig);
    expect(claimed).not.toBeNull();
    expect(claimed!.id).toBe(id1);

    const updated = await db.reviewJob.findUniqueOrThrow({ where: { id: id1 } });
    expect(updated.status).toBe('running');
    expect(updated.attempts).toBe(1);
    expect(updated.leaseExpiresAt).not.toBeNull();
  });

  it('does not claim a job with a non-expired lease (running job)', async () => {
    const futureExpiry = new Date(Date.now() + 120_000);
    await db.reviewJob.create({
      data: {
        status: 'pending',
        installationId: BigInt(111),
        repositoryId: BigInt(222),
        prNumber: 1,
        headSha: 'abc',
        attempts: 1,
        maxAttempts: 3,
        leaseExpiresAt: futureExpiry,
      },
    });

    const claimed = await claimJob(workerConfig);
    expect(claimed).toBeNull();
  });

  it('claims a job whose lease has expired (stale worker recovery)', async () => {
    const pastExpiry = new Date(Date.now() - 1000);
    const id = await createPendingJob({ attempts: 1, leaseExpiresAt: pastExpiry });

    const claimed = await claimJob(workerConfig);
    expect(claimed).not.toBeNull();
    expect(claimed!.id).toBe(id);
  });
});

describe('processJob (M3 stub)', () => {
  it('marks job as succeeded', async () => {
    const id = await createPendingJob();
    const row = await db.reviewJob.findUniqueOrThrow({ where: { id } });

    const jobRow: ReviewJobRow = {
      id: row.id,
      status: row.status,
      installation_id: row.installationId,
      repository_id: row.repositoryId,
      pr_number: row.prNumber,
      head_sha: row.headSha,
      attempts: row.attempts,
      max_attempts: row.maxAttempts,
      lease_expires_at: row.leaseExpiresAt,
      created_at: row.createdAt,
    };

    await processJob(jobRow);

    const updated = await db.reviewJob.findUniqueOrThrow({ where: { id } });
    expect(updated.status).toBe('succeeded');
    expect(updated.completedAt).not.toBeNull();
  });
});

describe('handleJobFailure', () => {
  it('resets to pending when attempts < maxAttempts', async () => {
    const id = await createPendingJob({ attempts: 1, maxAttempts: 3 });
    const row = await db.reviewJob.findUniqueOrThrow({ where: { id } });

    const jobRow: ReviewJobRow = {
      id: row.id,
      status: row.status,
      installation_id: row.installationId,
      repository_id: row.repositoryId,
      pr_number: row.prNumber,
      head_sha: row.headSha,
      attempts: row.attempts,
      max_attempts: row.maxAttempts,
      lease_expires_at: row.leaseExpiresAt,
      created_at: row.createdAt,
    };

    await handleJobFailure(jobRow, workerConfig, new Error('transient error'));

    const updated = await db.reviewJob.findUniqueOrThrow({ where: { id } });
    expect(updated.status).toBe('pending');
    expect(updated.leaseExpiresAt).toBeNull();
    expect(updated.errorMessage).toBe('transient error');
  });

  it('marks failed when attempts >= maxAttempts', async () => {
    const id = await createPendingJob({ attempts: 3, maxAttempts: 3 });
    const row = await db.reviewJob.findUniqueOrThrow({ where: { id } });

    const jobRow: ReviewJobRow = {
      id: row.id,
      status: row.status,
      installation_id: row.installationId,
      repository_id: row.repositoryId,
      pr_number: row.prNumber,
      head_sha: row.headSha,
      attempts: row.attempts,
      max_attempts: row.maxAttempts,
      lease_expires_at: row.leaseExpiresAt,
      created_at: row.createdAt,
    };

    await handleJobFailure(jobRow, workerConfig, new Error('fatal error'));

    const updated = await db.reviewJob.findUniqueOrThrow({ where: { id } });
    expect(updated.status).toBe('failed');
    expect(updated.completedAt).not.toBeNull();
    expect(updated.errorMessage).toBe('fatal error');
  });

  it('stores errorMessage on both pending and failed transitions', async () => {
    for (const attempts of [1, 3]) {
      const id = await createPendingJob({ attempts, maxAttempts: 3 });
      const row = await db.reviewJob.findUniqueOrThrow({ where: { id } });

      const jobRow: ReviewJobRow = {
        id: row.id,
        status: row.status,
        installation_id: row.installationId,
        repository_id: row.repositoryId,
        pr_number: row.prNumber,
        head_sha: row.headSha,
        attempts: row.attempts,
        max_attempts: row.maxAttempts,
        lease_expires_at: row.leaseExpiresAt,
        created_at: row.createdAt,
      };

      await handleJobFailure(jobRow, workerConfig, 'string error message');

      const updated = await db.reviewJob.findUniqueOrThrow({ where: { id } });
      expect(updated.errorMessage).toBe('string error message');
    }
  });
});
