import { z } from 'zod';

export const ApiProblemErrorItemSchema = z.object({
  path: z.string(),
  message: z.string(),
});

export const ApiProblemV1Schema = z.object({
  type: z.string().url(),
  title: z.string(),
  status: z.number().int().min(100).max(599),
  detail: z.string(),
  instance: z.string().optional(),
  code: z.enum([
    'VALIDATION_ERROR',
    'AUTHENTICATION_REQUIRED',
    'ACCESS_DENIED',
    'RESOURCE_NOT_FOUND',
    'CONFLICT',
    'PAYLOAD_TOO_LARGE',
    'RATE_LIMITED',
    'UPSTREAM_FAILURE',
    'SERVICE_UNAVAILABLE',
    'INTERNAL_ERROR',
  ]),
  requestId: z.string(),
  retryable: z.boolean(),
  errors: z.array(ApiProblemErrorItemSchema).optional(),
});

export type ApiProblemV1 = z.infer<typeof ApiProblemV1Schema>;
export type ApiProblemCode = ApiProblemV1['code'];
export type ApiProblemErrorItem = z.infer<typeof ApiProblemErrorItemSchema>;
