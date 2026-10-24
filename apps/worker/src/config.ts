import { z } from 'zod';

const workerConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  WORKER_POLL_INTERVAL_MS: z.coerce.number().int().min(100).default(2000),
  WORKER_CONCURRENCY: z.coerce.number().int().min(1).default(1),
  WORKER_MAX_ATTEMPTS: z.coerce.number().int().min(1).default(3),
  WORKER_LEASE_SECONDS: z.coerce.number().int().min(10).default(120),
  WORKER_JOB_TIMEOUT_SECONDS: z.coerce.number().int().min(10).default(600),
});

const result = workerConfigSchema.safeParse(process.env);

if (!result.success) {
  const missing = result.error.errors.map((e) => `  ${e.path.join('.')}: ${e.message}`).join('\n');
  throw new Error(
    `Invalid worker configuration:\n${missing}\n\nCheck your .env file against .env.example`,
  );
}

export const workerConfig = result.data;
export type WorkerConfig = typeof workerConfig;
