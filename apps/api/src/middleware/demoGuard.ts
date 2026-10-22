import type { Request, Response, NextFunction } from 'express';
import type { ApiProblemV1 } from '@prguardian/shared';
import type { RequestWithId } from './requestId.js';
import { config } from '../config.js';

export function demoGuard(_req: Request, res: Response, next: NextFunction): void {
  if (!config.DEMO_MODE_ENABLED) {
    const requestId = (_req as RequestWithId).id ?? 'unknown';
    const problem: ApiProblemV1 = {
      type: 'https://prguardian.dev/problems/service-unavailable',
      title: 'Demo mode is not available',
      status: 503,
      detail: 'The demo feature is currently disabled. Please try again later.',
      code: 'SERVICE_UNAVAILABLE',
      requestId,
      retryable: true,
    };
    res.status(503).contentType('application/problem+json').json(problem);
    return;
  }
  next();
}
