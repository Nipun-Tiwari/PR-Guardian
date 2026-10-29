import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    include: ['tests/**/*.test.ts'],
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://prguardian:prguardian_test@localhost:5432/prguardian_test',
      PORT: '3001',
      GITHUB_CLIENT_ID: 'test_client_id',
      GITHUB_CLIENT_SECRET: 'test_client_secret',
      GITHUB_OAUTH_CALLBACK_URL: 'http://localhost:3001/api/v1/auth/github/callback',
      FRONTEND_URL: 'http://localhost:5173/auth/callback',
      SESSION_SECRET: 'test_session_secret_at_least_32_chars_long_xx',
      SESSION_TTL_SECONDS: '86400',
      GITHUB_APP_ID: '12345',
      GITHUB_APP_PRIVATE_KEY: 'dGVzdF9kdW1teV9wcml2YXRlX2tleQ==',
      WEBHOOK_SECRET: 'test_webhook_secret_at_least_32_chars_xxx',
    },
  },
});
