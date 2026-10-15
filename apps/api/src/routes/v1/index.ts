import { Router } from 'express';
import type { Request, Response } from 'express';

export const v1Router = Router();

// Placeholder — routes are added per milestone
v1Router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ version: 'v1', status: 'ready' });
});
