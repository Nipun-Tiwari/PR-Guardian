import express from 'express';
import { requestIdMiddleware } from './middleware/requestId.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { router } from './routes/index.js';

export function createApp(): express.Application {
  const app = express();

  app.use(express.json({ limit: '1mb' }));
  app.use(requestIdMiddleware);
  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
