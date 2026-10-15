// Combined API + worker runtime for zero-cost free-tier deployment (Render, etc.)
// In M0 this starts only the API. The worker polling loop is added in M3.
import { createApp } from '@prguardian/api';
import { logger } from '@prguardian/observability';

const port = Number(process.env['PORT'] ?? 3001);
const app = createApp();

app.listen(port, () => {
  logger.info({ port }, 'PR Guardian runtime (API + worker) listening');
});
