import { describe, it, expect } from 'vitest';
import { ReviewSummaryV1Schema } from '../src/schemas/review-summary.js';
import { FindingV1Schema } from '../src/schemas/finding.js';
import { DEMO_REVIEWS, DEMO_FINDINGS, DEMO_REVIEW_IDS } from '../src/fixtures/index.js';

describe('Demo fixture validation (UT-A05 / M1-TEST-01)', () => {
  it('DEMO_REVIEWS is non-empty', () => {
    expect(DEMO_REVIEWS.length).toBeGreaterThan(0);
  });

  it('every demo review parses through ReviewSummaryV1Schema', () => {
    for (const review of DEMO_REVIEWS) {
      const result = ReviewSummaryV1Schema.safeParse(review);
      expect(
        result.success,
        `Review ${review.id} failed: ${!result.success ? JSON.stringify(result.error.errors) : ''}`,
      ).toBe(true);
    }
  });

  it('every demo review has mode: "demo"', () => {
    for (const review of DEMO_REVIEWS) {
      expect(review.mode).toBe('demo');
    }
  });

  it('every demo review has status: "succeeded"', () => {
    for (const review of DEMO_REVIEWS) {
      expect(review.status).toBe('succeeded');
    }
  });

  it('DEMO_FINDINGS is non-empty', () => {
    expect(DEMO_FINDINGS.length).toBeGreaterThan(0);
  });

  it('every demo finding parses through FindingV1Schema', () => {
    for (const finding of DEMO_FINDINGS) {
      const result = FindingV1Schema.safeParse(finding);
      expect(
        result.success,
        `Finding ${finding.id} failed: ${!result.success ? JSON.stringify(result.error.errors) : ''}`,
      ).toBe(true);
    }
  });

  it('every demo finding has source: "demo_fixture"', () => {
    for (const finding of DEMO_FINDINGS) {
      expect(finding.source).toBe('demo_fixture');
    }
  });

  it('every demo finding has validationStatus: "valid"', () => {
    for (const finding of DEMO_FINDINGS) {
      expect(finding.validationStatus).toBe('valid');
    }
  });

  it('every demo finding has a non-empty fingerprint', () => {
    for (const finding of DEMO_FINDINGS) {
      expect(finding.fingerprint.length).toBeGreaterThan(0);
    }
  });

  it('all finding IDs are unique', () => {
    const ids = DEMO_FINDINGS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all finding reviewIds reference a known review', () => {
    const reviewIds = new Set(DEMO_REVIEW_IDS);
    for (const finding of DEMO_FINDINGS) {
      expect(reviewIds.has(finding.reviewId)).toBe(true);
    }
  });

  it('findingsSummary counts match actual finding counts per review', () => {
    for (const review of DEMO_REVIEWS) {
      const forReview = DEMO_FINDINGS.filter((f) => f.reviewId === review.id);
      const counts = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
      for (const f of forReview) {
        counts[f.severity]++;
      }
      expect(review.findingsSummary.total).toBe(forReview.length);
      expect(review.findingsSummary.critical).toBe(counts.critical);
      expect(review.findingsSummary.high).toBe(counts.high);
      expect(review.findingsSummary.medium).toBe(counts.medium);
      expect(review.findingsSummary.low).toBe(counts.low);
      expect(review.findingsSummary.info).toBe(counts.info);
    }
  });
});
