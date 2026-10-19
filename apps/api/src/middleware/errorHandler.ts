import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import type { ApiProblemV1 } from '@prguardian/shared';
import type { RequestWithId } from './requestId.js';

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  const requestId = (req as RequestWithId).id ?? 'unknown';

  if (err instanceof ZodError) {
    const problem: ApiProblemV1 = {
      type: 'https://prguardian.dev/problems/validation-error',
      title: 'Request validation failed',
      status: 400,
      detail: 'One or more request fields are invalid.',
      code: 'VALIDATION_ERROR',
      requestId,
      retryable: false,
      errors: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    };
    res.status(400).contentType('application/problem+json').json(problem);
    return;
  }

  const problem: ApiProblemV1 = {
    type: 'https://prguardian.dev/problems/internal-error',
    title: 'An unexpected error occurred',
    status: 500,
    detail: 'The server encountered an unexpected condition.',
    code: 'INTERNAL_ERROR',
    requestId,
    retryable: false,
  };
  res.status(500).contentType('application/problem+json').json(problem);
}

export function notFoundHandler(req: Request, res: Response): void {
  const requestId = (req as RequestWithId).id ?? 'unknown';
  const problem: ApiProblemV1 = {
    type: 'https://prguardian.dev/problems/resource-not-found',
    title: 'Resource not found',
    status: 404,
    detail: `${req.method} ${req.path} does not exist.`,
    code: 'RESOURCE_NOT_FOUND',
    requestId,
    retryable: false,
  };
  res.status(404).contentType('application/problem+json').json(problem);
}
