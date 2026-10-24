import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { requestIdMiddleware } from './middleware/requestId.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { router } from './routes/index.js';
import { webhookRouter } from './routes/webhooks.js';
import { config } from './config.js';
import { getClient } from '@prguardian/database';
import { PrismaSessionStore } from './lib/prismaSessionStore.js';

export function createApp(): express.Application {
  const app = express();

  // CORS must be first — handles OPTIONS preflight before body parsing
  if (config.API_CORS_ORIGIN) {
    app.use(
      cors({
        origin: config.API_CORS_ORIGIN,
        methods: ['GET', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'X-Request-Id'],
        exposedHeaders: [
          'RateLimit-Limit',
          'RateLimit-Remaining',
          'RateLimit-Reset',
          'RateLimit-Policy',
        ],
        credentials: true, // Required for cross-origin cookie transmission
      }),
    );
  }

  // Cookie parser needed to read signed oauth_state cookie
  app.use(cookieParser(config.SESSION_SECRET));

  // Session middleware — only creates sessions when explicitly saved (saveUninitialized: false)
  app.use(
    session({
      name: 'prg_sid',
      secret: config.SESSION_SECRET,
      store: new PrismaSessionStore(getClient(), config.SESSION_TTL_SECONDS),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        sameSite: 'lax', // lax allows OAuth callback top-level navigation redirect
        maxAge: config.SESSION_TTL_SECONDS * 1000,
      },
    }),
  );

  // Webhook router must be mounted BEFORE express.json() — it uses express.raw() internally
  // to preserve raw bytes for HMAC-SHA256 signature verification
  app.use(webhookRouter);

  app.use(express.json({ limit: '1mb' }));
  app.use(requestIdMiddleware);
  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
