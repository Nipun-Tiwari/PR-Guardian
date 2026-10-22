import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  DEMO_REVIEWS,
  DEMO_FINDINGS,
  FindingSeveritySchema,
  FindingCategorySchema,
} from '@prguardian/shared';
import type { ApiProblemV1 } from '@prguardian/shared';
import type { RequestWithId } from '../../middleware/requestId.js';
import { demoGuard } from '../../middleware/demoGuard.js';
import { createDemoLimiter } from '../../middleware/rateLimiter.js';
import { config } from '../../config.js';

export const demoRouter = Router();
const demoLimiter = createDemoLimiter(config.RATE_LIMIT_DEMO_RPM);

// Rate limiter applied first — counts requests even when demo mode is disabled
// so polling a disabled endpoint doesn't bypass the rate limit.
demoRouter.use(demoLimiter);
demoRouter.use(demoGuard);

function problemNotFound(req: Request, id: string): ApiProblemV1 {
  return {
    type: 'https://prguardian.dev/problems/resource-not-found',
    title: 'Demo resource not found',
    status: 404,
    detail: `No demo resource with id "${id}" exists.`,
    code: 'RESOURCE_NOT_FOUND',
    requestId: (req as RequestWithId).id ?? 'unknown',
    retryable: false,
  };
}

function problemValidation(req: Request, paramPath: string, message: string): ApiProblemV1 {
  return {
    type: 'https://prguardian.dev/problems/validation-error',
    title: 'Invalid query parameter',
    status: 400,
    detail: message,
    code: 'VALIDATION_ERROR',
    requestId: (req as RequestWithId).id ?? 'unknown',
    retryable: false,
    errors: [{ path: paramPath, message }],
  };
}

/** GET /api/v1/demo/reviews — list all demo reviews */
demoRouter.get('/reviews', (_req: Request, res: Response): void => {
  res.status(200).json(DEMO_REVIEWS);
});

/** GET /api/v1/demo/reviews/:id — get a single demo review by id */
demoRouter.get('/reviews/:id', (req: Request, res: Response): void => {
  const rawId = req.params['id'];
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  if (!id) {
    res
      .status(400)
      .contentType('application/problem+json')
      .json(problemValidation(req, 'id', 'Review id is required'));
    return;
  }

  const review = DEMO_REVIEWS.find((r) => r.id === id);
  if (!review) {
    res.status(404).contentType('application/problem+json').json(problemNotFound(req, id));
    return;
  }

  res.status(200).json(review);
});

/** GET /api/v1/demo/reviews/:id/findings — get findings for a demo review
 *  Supports optional query params: ?severity=<FindingSeverity> and ?category=<FindingCategory>
 *  Both params accept comma-separated lists for multi-value filtering.
 */
demoRouter.get('/reviews/:id/findings', (req: Request, res: Response): void => {
  const rawId = req.params['id'];
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  if (!id) {
    res
      .status(400)
      .contentType('application/problem+json')
      .json(problemValidation(req, 'id', 'Review id is required'));
    return;
  }

  const review = DEMO_REVIEWS.find((r) => r.id === id);
  if (!review) {
    res.status(404).contentType('application/problem+json').json(problemNotFound(req, id));
    return;
  }

  let findings = DEMO_FINDINGS.filter((f) => f.reviewId === id);

  // Parse ?severity — accepts single string or array of strings
  const rawSeverity = req.query['severity'];
  if (rawSeverity !== undefined) {
    const raw = rawSeverity;
    const severityValues: string[] = Array.isArray(raw)
      ? (raw as unknown[]).filter((v): v is string => typeof v === 'string')
      : typeof raw === 'string'
        ? [raw]
        : [];

    const parsed = severityValues.map((v) => FindingSeveritySchema.safeParse(v));
    const invalid = parsed.find((r) => !r.success);
    if (invalid) {
      const validValues = FindingSeveritySchema.options.join(', ');
      res
        .status(400)
        .contentType('application/problem+json')
        .json(
          problemValidation(
            req,
            'severity',
            `Invalid severity value. Must be one of: ${validValues}`,
          ),
        );
      return;
    }
    const validSeverities = new Set(parsed.map((r) => (r.success ? r.data : null)));
    findings = findings.filter((f) => validSeverities.has(f.severity));
  }

  // Parse ?category — accepts single string or array of strings
  const rawCategory = req.query['category'];
  if (rawCategory !== undefined) {
    const raw = rawCategory;
    const categoryValues: string[] = Array.isArray(raw)
      ? (raw as unknown[]).filter((v): v is string => typeof v === 'string')
      : typeof raw === 'string'
        ? [raw]
        : [];

    const parsed = categoryValues.map((v) => FindingCategorySchema.safeParse(v));
    const invalid = parsed.find((r) => !r.success);
    if (invalid) {
      const validValues = FindingCategorySchema.options.join(', ');
      res
        .status(400)
        .contentType('application/problem+json')
        .json(
          problemValidation(
            req,
            'category',
            `Invalid category value. Must be one of: ${validValues}`,
          ),
        );
      return;
    }
    const validCategories = new Set(parsed.map((r) => (r.success ? r.data : null)));
    findings = findings.filter((f) => validCategories.has(f.category));
  }

  res.status(200).json({ reviewId: id, findings, total: findings.length });
});
