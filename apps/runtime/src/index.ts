// Combined API + worker runtime for zero-cost free-tier deployment (Render, etc.)
// API and worker run in the same process with WORKER_CONCURRENCY=1.
import { createApp } from '@prguardian/api';
import { startWorker } from '@prguardian/worker';
import { logger } from '@prguardian/observability';

const port = Number(process.env['PORT'] ?? 3001);
const app = createApp();

app.listen(port, () => {
  logger.info({ port }, 'PR Guardian runtime (API + worker) listening');
});

startWorker();
