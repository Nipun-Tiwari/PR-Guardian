import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    include: ['tests/**/*.test.ts'],
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://prguardian:prguardian_test@localhost:5432/prguardian_test',
      LOG_LEVEL: 'error',
      WORKER_POLL_INTERVAL_MS: '100',
      WORKER_CONCURRENCY: '1',
      WORKER_MAX_ATTEMPTS: '3',
      WORKER_LEASE_SECONDS: '10',
      WORKER_JOB_TIMEOUT_SECONDS: '30',
    },
  },
});
