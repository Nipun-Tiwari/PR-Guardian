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
