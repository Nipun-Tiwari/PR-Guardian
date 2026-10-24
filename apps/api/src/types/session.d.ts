import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string | undefined;
    githubUserId: string | undefined; // BigInt serialized as string
    githubUsername: string | undefined;
    oauthState: string | undefined; // temporary — cleared immediately after callback
  }
}
