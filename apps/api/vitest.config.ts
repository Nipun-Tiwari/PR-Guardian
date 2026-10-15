import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    include: ['tests/**/*.test.ts'],
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://prguardian:prguardian_test@localhost:5432/prguardian_test',
      PORT: '3001',
    },
  },
});
