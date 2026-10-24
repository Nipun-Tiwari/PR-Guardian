import { Router } from 'express';
import type { Request, Response } from 'express';
import { getClient } from '@prguardian/database';

export const healthRouter = Router();

healthRouter.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

healthRouter.get('/readyz', async (_req: Request, res: Response) => {
  let dbStatus: 'ok' | 'error' = 'ok';
  try {
    await getClient().$queryRaw`SELECT 1`;
  } catch {
    dbStatus = 'error';
  }
  const httpStatus = dbStatus === 'ok' ? 200 : 503;
  res.status(httpStatus).json({
    status: dbStatus === 'ok' ? 'ok' : 'degraded',
    checks: { database: dbStatus },
    timestamp: new Date().toISOString(),
  });
});
