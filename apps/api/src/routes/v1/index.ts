import { Router } from 'express';
import type { Request, Response } from 'express';
import { demoRouter } from './demo.js';
import { authRouter } from './auth.js';
import { repositoriesRouter } from './repositories.js';

export const v1Router = Router();

v1Router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ version: 'v1', status: 'ready' });
});

v1Router.use('/demo', demoRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/repositories', repositoriesRouter);
