import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import type { ApiProblemV1 } from '@prguardian/shared';
import type { RequestWithId } from './requestId.js';

export class AuthenticationError extends Error {
  readonly code = 'AUTHENTICATION_REQUIRED' as const;
  constructor(detail = 'Authentication is required to access this resource.') {
    super(detail);
    this.name = 'AuthenticationError';
  }
}

export class AccessDeniedError extends Error {
  readonly code = 'ACCESS_DENIED' as const;
  constructor(detail = 'You do not have permission to access this resource.') {
    super(detail);
    this.name = 'AccessDeniedError';
  }
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  const requestId = (req as RequestWithId).id ?? 'unknown';

  if (err instanceof AuthenticationError) {
    const problem: ApiProblemV1 = {
      type: 'https://prguardian.dev/problems/authentication-required',
      title: 'Authentication required',
      status: 401,
      detail: err.message,
      code: 'AUTHENTICATION_REQUIRED',
      requestId,
      retryable: false,
    };
    res.status(401).contentType('application/problem+json').json(problem);
    return;
  }

  if (err instanceof AccessDeniedError) {
    const problem: ApiProblemV1 = {
      type: 'https://prguardian.dev/problems/access-denied',
      title: 'Access denied',
      status: 403,
      detail: err.message,
      code: 'ACCESS_DENIED',
      requestId,
      retryable: false,
    };
    res.status(403).contentType('application/problem+json').json(problem);
    return;
  }

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
