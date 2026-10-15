import { z } from 'zod';

export const FindingSeveritySchema = z.enum(['critical', 'high', 'medium', 'low', 'info']);
export const FindingSourceSchema = z.enum(['demo_fixture', 'static_rule', 'llm']);
export const FindingCategorySchema = z.enum([
  'security',
  'bug',
  'error_handling',
  'performance',
  'test_coverage',
  'style',
]);
export const FindingConfidenceSchema = z.enum(['high', 'medium', 'low']);
export const FindingValidationStatusSchema = z.enum([
  'valid',
  'invalid_location',
  'low_confidence',
  'rejected',
]);

export const FindingV1Schema = z.object({
  schemaVersion: z.literal(1),
  id: z.string().uuid(),
  reviewId: z.string().uuid(),
  source: FindingSourceSchema,
  category: FindingCategorySchema,
  severity: FindingSeveritySchema,
  confidence: FindingConfidenceSchema,
  filePath: z.string().min(1),
  lineStart: z.number().int().positive(),
  lineEnd: z.number().int().positive().optional(),
  message: z.string().min(1),
  evidence: z.string().optional(),
  recommendation: z.string().optional(),
  validationStatus: FindingValidationStatusSchema,
  fingerprint: z.string().min(1),
});

export type FindingV1 = z.infer<typeof FindingV1Schema>;
export type FindingSeverity = z.infer<typeof FindingSeveritySchema>;
export type FindingSource = z.infer<typeof FindingSourceSchema>;
export type FindingCategory = z.infer<typeof FindingCategorySchema>;
export type FindingValidationStatus = z.infer<typeof FindingValidationStatusSchema>;
