import { createApp } from './server.js';
import { config } from './config.js';
import { logger } from '@prguardian/observability';

const app = createApp();

app.listen(config.PORT, () => {
  logger.info({ port: config.PORT, env: config.NODE_ENV }, 'PR Guardian API listening');
});
