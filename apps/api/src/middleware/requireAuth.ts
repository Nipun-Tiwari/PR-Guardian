import type { Request, Response, NextFunction } from 'express';
import type { ApiProblemV1 } from '@prguardian/shared';
import type { RequestWithId } from './requestId.js';

export interface AuthenticatedUser {
  id: string;
  githubUserId: bigint;
  githubUsername: string;
}

export interface RequestWithSession extends RequestWithId {
  user: AuthenticatedUser;
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const { userId, githubUserId, githubUsername } = req.session;

  if (!userId || !githubUserId || !githubUsername) {
    const requestId = (req as RequestWithId).id ?? 'unknown';
    const problem: ApiProblemV1 = {
      type: 'https://prguardian.dev/problems/authentication-required',
      title: 'Authentication required',
      status: 401,
      detail: 'You must be signed in to access this resource.',
      code: 'AUTHENTICATION_REQUIRED',
      requestId,
      retryable: false,
    };
    res.status(401).contentType('application/problem+json').json(problem);
    return;
  }

  (req as RequestWithSession).user = {
    id: userId,
    githubUserId: BigInt(githubUserId),
    githubUsername,
  };

  next();
}
