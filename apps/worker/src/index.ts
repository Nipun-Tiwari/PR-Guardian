import { getClient, disconnectClient } from '@prguardian/database';
import { logger } from '@prguardian/observability';
import { workerConfig, type WorkerConfig } from './config.js';
import { claimJob, processJob, handleJobFailure } from './lib/jobQueue.js';

let draining = false;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pollOnce(config: WorkerConfig): Promise<void> {
  const job = await claimJob(config);
  if (!job) return;

  try {
    await processJob(job);
  } catch (err) {
    await handleJobFailure(job, config, err);
  }
}

async function pollLoop(config: WorkerConfig): Promise<void> {
  logger.info({ pollIntervalMs: config.WORKER_POLL_INTERVAL_MS }, 'Worker poll loop started');

  while (!draining) {
    try {
      await pollOnce(config);
    } catch (err) {
      logger.error({ err }, 'Unhandled error in worker poll iteration');
    }
    if (!draining) {
      await sleep(config.WORKER_POLL_INTERVAL_MS);
    }
  }

  logger.info('Worker drained — shutting down');
  await disconnectClient();
  process.exit(0);
}

export function startWorker(config: WorkerConfig = workerConfig): void {
  logger.info('PR Guardian worker starting');

  // Initialise DB connection eagerly so the first claim is fast
  getClient();

  process.on('SIGTERM', () => {
    logger.info('Worker received SIGTERM — draining');
    draining = true;
  });

  process.on('SIGINT', () => {
    logger.info('Worker received SIGINT — draining');
    draining = true;
  });

  pollLoop(config).catch((err) => {
    logger.error({ err }, 'Worker poll loop crashed');
    process.exit(1);
  });
}

