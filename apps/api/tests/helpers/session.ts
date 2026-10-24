import { getClient } from '@prguardian/database';
import { createHmac } from 'crypto';

const SESSION_SECRET = 'test_session_secret_at_least_32_chars_long_xx';

/**
 * Creates a test user and injects a valid session into the DB.
 * Returns a signed cookie string that can be attached to supertest requests.
 */
export async function createAuthenticatedSession(overrides?: {
  githubUserId?: bigint;
  githubUsername?: string;
}): Promise<{ cookie: string; userId: string; githubUsername: string }> {
  const db = getClient();
  const githubUserId = overrides?.githubUserId ?? BigInt(Math.floor(Math.random() * 1_000_000) + 1);
  const githubUsername = overrides?.githubUsername ?? `testuser_${githubUserId}`;

  const user = await db.user.upsert({
    where: { githubUserId },
    update: { githubUsername },
    create: { githubUserId, githubUsername },
  });

  const sid = `test_sid_${user.id}`;
  const sessionData = {
    userId: user.id,
    githubUserId: user.githubUserId.toString(),
    githubUsername: user.githubUsername,
    cookie: { originalMaxAge: 86400000 },
  };

  const expiresAt = new Date(Date.now() + 86400 * 1000);
  await db.session.upsert({
    where: { id: sid },
    create: { id: sid, userId: user.id, data: sessionData, expiresAt },
    update: { data: sessionData, expiresAt },
  });

  // Build a signed cookie matching express-session's format: s:<sid>.<hmac>
  const hmac = createHmac('sha256', SESSION_SECRET)
    .update(sid)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  const signedValue = `s:${sid}.${hmac}`;
  const cookie = `prg_sid=${encodeURIComponent(signedValue)}`;

  return { cookie, userId: user.id, githubUsername: user.githubUsername };
}

export async function cleanupTestUser(userId: string): Promise<void> {
  const db = getClient();
  await db.session.deleteMany({ where: { userId } });
  await db.user.delete({ where: { id: userId } }).catch(() => undefined);
}
