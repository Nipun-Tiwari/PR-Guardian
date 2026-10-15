import { Router } from 'express';
import type { Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// DB check is added in M2 when Prisma client is wired to the API
healthRouter.get('/readyz', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    checks: {
      database: 'skip',
    },
    timestamp: new Date().toISOString(),
  });
});
