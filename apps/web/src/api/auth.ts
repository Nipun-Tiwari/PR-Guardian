import { apiFetch, ApiError } from './client.js';

export interface AuthUser {
  id: string;
  githubUserId: string;
  githubUsername: string;
}

/** Returns the current authenticated user, or null if not signed in. */
export function getMe(): Promise<AuthUser | null> {
  return apiFetch<AuthUser>('/api/v1/auth/me').catch((err: unknown) => {
    if (err instanceof ApiError && err.status === 401) return null;
    throw err;
  });
}

/** Destroys the current session on the server. */
export async function logout(): Promise<void> {
  await apiFetch<void>('/api/v1/auth/logout', { method: 'POST' });
}
