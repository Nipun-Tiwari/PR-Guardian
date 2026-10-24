import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { getClient } from '@prguardian/database';
import { requireAuth, type RequestWithSession } from '../../middleware/requireAuth.js';

export const repositoriesRouter = Router();

repositoriesRouter.use(requireAuth);

/** GET /api/v1/repositories — List repositories for the authenticated user */
repositoriesRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user } = req as RequestWithSession;
    try {
      const repos = await getClient().repository.findMany({
        where: { ownedByUserId: user.id, isActive: true },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          githubRepositoryId: true,
          githubInstallationId: true,
          owner: true,
          name: true,
          fullName: true,
          isActive: true,
          createdAt: true,
        },
      });

      res.status(200).json({
        repositories: repos.map(
          (r: {
            id: string;
            githubRepositoryId: bigint;
            githubInstallationId: bigint;
            owner: string;
            name: string;
            fullName: string;
            isActive: boolean;
            createdAt: Date;
          }) => ({
            ...r,
            githubRepositoryId: r.githubRepositoryId.toString(),
            githubInstallationId: r.githubInstallationId.toString(),
          }),
        ),
        total: repos.length,
      });
    } catch (err) {
      next(err);
    }
  },
);
