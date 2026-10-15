import { z } from 'zod';

export const ReviewStatusSchema = z.enum([
  'queued',
  'running',
  'succeeded',
  'failed',
  'cancelled',
  'partial',
]);

export const ReviewSummaryV1Schema = z.object({
  schemaVersion: z.literal(1),
  id: z.string().uuid(),
  mode: z.enum(['demo', 'live']),
  repository: z.object({
    id: z.string(),
    owner: z.string(),
    name: z.string(),
  }),
  pullRequest: z.object({
    number: z.number().int().positive(),
    title: z.string(),
    url: z.string().url().optional(),
  }),
  headSha: z.string().min(7).max(40),
  status: ReviewStatusSchema,
  findingsSummary: z.object({
    total: z.number().int().min(0),
    critical: z.number().int().min(0),
    high: z.number().int().min(0),
    medium: z.number().int().min(0),
    low: z.number().int().min(0),
    info: z.number().int().min(0),
  }),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
});

export type ReviewSummaryV1 = z.infer<typeof ReviewSummaryV1Schema>;
export type ReviewStatus = z.infer<typeof ReviewStatusSchema>;
