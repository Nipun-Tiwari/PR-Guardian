import express from 'express';
import cors from 'cors';
import { requestIdMiddleware } from './middleware/requestId.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { router } from './routes/index.js';
import { config } from './config.js';

export function createApp(): express.Application {
  const app = express();

  // CORS must be applied before express.json() so OPTIONS preflight is handled first
  if (config.API_CORS_ORIGIN) {
    app.use(
      cors({
        origin: config.API_CORS_ORIGIN,
        methods: ['GET'],
        allowedHeaders: ['Content-Type', 'X-Request-Id'],
        exposedHeaders: [
          'RateLimit-Limit',
          'RateLimit-Remaining',
          'RateLimit-Reset',
          'RateLimit-Policy',
        ],
      }),
    );
  }

  app.use(express.json({ limit: '1mb' }));
  app.use(requestIdMiddleware);
  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
