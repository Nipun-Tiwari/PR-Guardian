import rateLimit from 'express-rate-limit';
import type { ApiProblemV1 } from '@prguardian/shared';
import type { RequestWithId } from './requestId.js';
import type { Request, Response } from 'express';

function rateLimitHandler(_req: Request, res: Response): void {
  const requestId = (_req as RequestWithId).id ?? 'unknown';
  const problem: ApiProblemV1 = {
    type: 'https://prguardian.dev/problems/rate-limited',
    title: 'Too many requests',
    status: 429,
    detail: 'You have exceeded the allowed request rate. Please try again later.',
    code: 'RATE_LIMITED',
    requestId,
    retryable: true,
  };
  res.status(429).contentType('application/problem+json').json(problem);
}

export function createDemoLimiter(requestsPerMinute: number) {
  return rateLimit({
    windowMs: 60 * 1000,
    max: requestsPerMinute,
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler,
  });
}

export function createAuthLimiter(maxAttempts: number, windowMinutes = 15) {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max: maxAttempts,
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler,
  });
}
