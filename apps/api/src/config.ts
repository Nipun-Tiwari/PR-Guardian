import { z } from 'zod';

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  DEMO_MODE_ENABLED: z
    .string()
    .transform((v) => v === 'true')
    .default('true'),
  AI_REVIEW_ENABLED: z
    .string()
    .transform((v) => v === 'true')
    .default('false'),
  LIVE_GITHUB_ENABLED: z
    .string()
    .transform((v) => v === 'true')
    .default('false'),
  STATIC_ANALYSIS_ENABLED: z
    .string()
    .transform((v) => v === 'true')
    .default('true'),
  GITHUB_PUBLISH_ENABLED: z
    .string()
    .transform((v) => v === 'true')
    .default('false'),
  LIVE_REVIEW_RATE_LIMIT_ENABLED: z
    .string()
    .transform((v) => v === 'true')
    .default('true'),
  COST_LIMIT_ENFORCED: z
    .string()
    .transform((v) => v === 'true')
    .default('true'),
  RATE_LIMIT_DEMO_RPM: z.coerce.number().int().min(1).default(60),
  RATE_LIMIT_AUTH_ATTEMPTS: z.coerce.number().int().min(1).default(10),
  API_CORS_ORIGIN: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().min(1, 'GITHUB_CLIENT_ID is required'),
  GITHUB_CLIENT_SECRET: z.string().min(1, 'GITHUB_CLIENT_SECRET is required'),
  GITHUB_OAUTH_CALLBACK_URL: z.string().url('GITHUB_OAUTH_CALLBACK_URL must be a valid URL'),
  FRONTEND_URL: z.string().url('FRONTEND_URL must be a valid URL'),
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters'),
  SESSION_TTL_SECONDS: z.coerce.number().int().min(60).default(604800),
  GITHUB_APP_ID: z.coerce.number().int().optional(),
});

const result = configSchema.safeParse(process.env);

if (!result.success) {
  const missing = result.error.errors.map((e) => `  ${e.path.join('.')}: ${e.message}`).join('\n');
  throw new Error(
    `Invalid configuration:\n${missing}\n\nCheck your .env file against .env.example`,
  );
}

export const config = result.data;
export type Config = typeof config;
