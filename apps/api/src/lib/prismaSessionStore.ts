import session from 'express-session';
import type { PrismaClient } from '@prguardian/database';

type SessionCallback = (err: unknown, session?: session.SessionData | null) => void;
type DoneCallback = (err?: unknown) => void;

export class PrismaSessionStore extends session.Store {
  constructor(
    private readonly db: PrismaClient,
    private readonly ttlSeconds: number,
  ) {
    super();
  }

  override get(sid: string, callback: SessionCallback): void {
    this.db.session
      .findUnique({ where: { id: sid } })
      .then((row: { id: string; data: unknown; expiresAt: Date } | null) => {
        if (!row) {
          callback(null, null);
          return;
        }
        if (row.expiresAt < new Date()) {
          // Eager cleanup of expired session
          this.db.session.delete({ where: { id: sid } }).catch(() => undefined);
          callback(null, null);
          return;
        }
        callback(null, row.data as session.SessionData);
      })
      .catch((err: unknown) => callback(err));
  }

  override set(sid: string, data: session.SessionData, callback?: DoneCallback): void {
    const expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    // userId must be present before set is called (we only create sessions after auth)
    const userId = (data as unknown as Record<string, unknown>)['userId'];
    if (typeof userId !== 'string') {
      callback?.(new Error('Cannot persist session without userId'));
      return;
    }

    this.db.session
      .upsert({
        where: { id: sid },
        create: {
          id: sid,
          userId,
          data: data as unknown as Record<string, unknown>,
          expiresAt,
        },
        update: {
          data: data as unknown as Record<string, unknown>,
          expiresAt,
        },
      })
      .then(() => callback?.())
      .catch((err: unknown) => callback?.(err));
  }

  override destroy(sid: string, callback?: DoneCallback): void {
    this.db.session
      .delete({ where: { id: sid } })
      .then(() => callback?.())
      .catch(() => callback?.()); // noop if not found
  }

  override touch(sid: string, _data: session.SessionData, callback?: DoneCallback): void {
    const expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    this.db.session
      .update({ where: { id: sid }, data: { expiresAt } })
      .then(() => callback?.())
      .catch(() => callback?.()); // noop if not found
  }
}
