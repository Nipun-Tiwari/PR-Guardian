import { Router } from 'express';
import { randomBytes } from 'crypto';
import type { Request, Response, NextFunction } from 'express';
import type { ApiProblemV1 } from '@prguardian/shared';
import { config } from '../../config.js';
import { getClient } from '@prguardian/database';
import { createAuthLimiter } from '../../middleware/rateLimiter.js';
import { requireAuth, type RequestWithSession } from '../../middleware/requireAuth.js';
import type { RequestWithId } from '../../middleware/requestId.js';

export const authRouter = Router();

const authLimiter = createAuthLimiter(config.RATE_LIMIT_AUTH_ATTEMPTS);
authRouter.use(authLimiter);

function problemResponse(
  req: Request,
  status: number,
  code: ApiProblemV1['code'],
  title: string,
  detail: string,
): ApiProblemV1 {
  return {
    type: `https://prguardian.dev/problems/${code.toLowerCase().replace(/_/g, '-')}`,
    title,
    status,
    detail,
    code,
    requestId: (req as RequestWithId).id ?? 'unknown',
    retryable: false,
  };
}

/** GET /api/v1/auth/github — Initiate GitHub OAuth flow */
authRouter.get('/github', (req: Request, res: Response): void => {
  const state = randomBytes(32).toString('hex');

  // Store state in a signed short-lived cookie (not a session row — avoids userId FK constraint)
  res.cookie('oauth_state', state, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 10 * 60 * 1000, // 10 minutes
    signed: true,
  });

  const params = new URLSearchParams({
    client_id: config.GITHUB_CLIENT_ID,
    redirect_uri: config.GITHUB_OAUTH_CALLBACK_URL,
    state,
    scope: 'read:user',
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
});

/** GET /api/v1/auth/github/callback — Handle GitHub OAuth callback */
authRouter.get(
  '/github/callback',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1. Read and verify stored state from signed cookie
    const storedState = req.signedCookies['oauth_state'] as string | undefined | false;
    res.clearCookie('oauth_state'); // Always clear — even on failure

    if (!storedState) {
      res
        .status(400)
        .contentType('application/problem+json')
        .json(
          problemResponse(
            req,
            400,
            'VALIDATION_ERROR',
            'Invalid OAuth state',
            'OAuth state cookie is missing or has an invalid signature.',
          ),
        );
      return;
    }

    // 2. Read state and code from query params
    const rawState = req.query['state'];
    const rawCode = req.query['code'];

    const queryState = typeof rawState === 'string' ? rawState : undefined;
    const code = typeof rawCode === 'string' ? rawCode : undefined;

    if (!queryState) {
      res
        .status(400)
        .contentType('application/problem+json')
        .json(
          problemResponse(
            req,
            400,
            'VALIDATION_ERROR',
            'Missing OAuth state',
            'The state parameter is missing from the callback.',
          ),
        );
      return;
    }

    // 3. Validate state matches (CSRF protection — UT-B03, UT-B05)
    if (storedState !== queryState) {
      res
        .status(400)
        .contentType('application/problem+json')
        .json(
          problemResponse(
            req,
            400,
            'VALIDATION_ERROR',
            'OAuth state mismatch',
            'The OAuth state parameter does not match. The request may have been tampered with.',
          ),
        );
      return;
    }

    if (!code) {
      res
        .status(400)
        .contentType('application/problem+json')
        .json(
          problemResponse(
            req,
            400,
            'VALIDATION_ERROR',
            'Missing authorization code',
            'The authorization code is missing from the callback.',
          ),
        );
      return;
    }

    try {
      // 4. Exchange code for token via GitHub OAuth endpoint
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: config.GITHUB_CLIENT_ID,
          client_secret: config.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: config.GITHUB_OAUTH_CALLBACK_URL,
        }),
      });

      if (!tokenResponse.ok) {
        res
          .status(502)
          .contentType('application/problem+json')
          .json(
            problemResponse(
              req,
              502,
              'UPSTREAM_FAILURE',
              'GitHub token exchange failed',
              'Failed to exchange authorization code for access token.',
            ),
          );
        return;
      }

      const tokenData = (await tokenResponse.json()) as { access_token?: string; error?: string };
      if (!tokenData.access_token) {
        res
          .status(400)
          .contentType('application/problem+json')
          .json(
            problemResponse(
              req,
              400,
              'UPSTREAM_FAILURE',
              'GitHub OAuth error',
              tokenData.error ?? 'GitHub did not return an access token.',
            ),
          );
        return;
      }

      const accessToken = tokenData.access_token;

      // 5. Fetch GitHub user identity — token used only here, then discarded (D-002)
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      if (!userResponse.ok) {
        res
          .status(502)
          .contentType('application/problem+json')
          .json(
            problemResponse(
              req,
              502,
              'UPSTREAM_FAILURE',
              'GitHub API error',
              'Failed to fetch user information from GitHub.',
            ),
          );
        return;
      }

      const githubUser = (await userResponse.json()) as { id: number; login: string };
      // accessToken is no longer referenced after this point — discarded per D-002

      // 6. Upsert user record
      const db = getClient();
      const user = await db.user.upsert({
        where: { githubUserId: BigInt(githubUser.id) },
        update: { githubUsername: githubUser.login },
        create: {
          githubUserId: BigInt(githubUser.id),
          githubUsername: githubUser.login,
        },
      });

      // 7. Session fixation prevention — regenerate session ID before writing user data
      await new Promise<void>((resolve, reject) => {
        req.session.regenerate((err) => (err ? reject(err) : resolve()));
      });

      // 8. Write user data into fresh session
      req.session.userId = user.id;
      req.session.githubUserId = user.githubUserId.toString();
      req.session.githubUsername = user.githubUsername;

      // 9. Explicitly save session before redirecting
      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => (err ? reject(err) : resolve()));
      });

      res.redirect(config.FRONTEND_URL);
    } catch (err) {
      next(err);
    }
  },
);

/** POST /api/v1/auth/logout — Destroy session and clear cookie */
authRouter.post('/logout', requireAuth, (req: Request, res: Response, next: NextFunction): void => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.clearCookie('prg_sid');
    res.status(204).send();
  });
});

/** GET /api/v1/auth/me — Return current authenticated user */
authRouter.get('/me', requireAuth, (req: Request, res: Response): void => {
  const { user } = req as RequestWithSession;
  res.status(200).json({
    id: user.id,
    githubUserId: user.githubUserId.toString(), // BigInt → string for JSON
    githubUsername: user.githubUsername,
  });
});
