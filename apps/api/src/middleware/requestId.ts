import type { Request, Response, NextFunction } from 'express';

let counter = 0;

function generateRequestId(): string {
  counter = (counter + 1) % 1_000_000;
  return `req_${Date.now()}_${counter.toString().padStart(6, '0')}`;
}

export interface RequestWithId extends Request {
  id: string;
}

export function requestIdMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  (req as RequestWithId).id = generateRequestId();
  next();
}
