import { ReviewSummaryV1Schema } from '../schemas/review-summary.js';
import { FindingV1Schema } from '../schemas/finding.js';
import type { ReviewSummaryV1, FindingV1 } from '../index.js';
import demoReviewRaw from './demo-review-001.json';
import demoFindingsRaw from './demo-findings-001.json';

// Parse at module init — fails fast at startup if a fixture violates the schema contract
export const DEMO_REVIEWS: ReviewSummaryV1[] = [ReviewSummaryV1Schema.parse(demoReviewRaw)];
export const DEMO_FINDINGS: FindingV1[] = (demoFindingsRaw as unknown[]).map((f) =>
  FindingV1Schema.parse(f),
);
export const DEMO_REVIEW_IDS: string[] = DEMO_REVIEWS.map((r) => r.id);
