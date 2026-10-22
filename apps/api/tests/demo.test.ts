import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/server.js';
import { ReviewSummaryV1Schema } from '@prguardian/shared';
import { FindingV1Schema } from '@prguardian/shared';
import { DEMO_REVIEWS, DEMO_FINDINGS, DEMO_REVIEW_IDS } from '@prguardian/shared';

const app = createApp();
const knownReviewId = DEMO_REVIEW_IDS[0]!;

describe('GET /api/v1/demo/reviews', () => {
  it('returns 200 with an array of reviews', async () => {
    const res = await request(app).get('/api/v1/demo/reviews');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('each review conforms to ReviewSummaryV1Schema', async () => {
    const res = await request(app).get('/api/v1/demo/reviews');
    for (const review of res.body as unknown[]) {
      expect(ReviewSummaryV1Schema.safeParse(review).success).toBe(true);
    }
  });

  it('includes RateLimit-Limit header', async () => {
    const res = await request(app).get('/api/v1/demo/reviews');
    expect(res.headers['ratelimit-limit']).toBeDefined();
  });
});

describe('GET /api/v1/demo/reviews/:id', () => {
  it('returns 200 for a known review id', async () => {
    const res = await request(app).get(`/api/v1/demo/reviews/${knownReviewId}`);
    expect(res.status).toBe(200);
    expect(ReviewSummaryV1Schema.safeParse(res.body).success).toBe(true);
  });

  it('returns 404 with RESOURCE_NOT_FOUND for unknown id', async () => {
    const res = await request(app).get('/api/v1/demo/reviews/not-a-real-id');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/application\/problem\+json/);
    expect(res.body.code).toBe('RESOURCE_NOT_FOUND');
    expect(typeof res.body.requestId).toBe('string');
  });
});

describe('GET /api/v1/demo/reviews/:id/findings', () => {
  it('returns 200 with findings array for known review', async () => {
    const res = await request(app).get(`/api/v1/demo/reviews/${knownReviewId}/findings`);
    expect(res.status).toBe(200);
    expect(res.body.reviewId).toBe(knownReviewId);
    expect(Array.isArray(res.body.findings)).toBe(true);
    expect(typeof res.body.total).toBe('number');
  });

  it('each finding conforms to FindingV1Schema', async () => {
    const res = await request(app).get(`/api/v1/demo/reviews/${knownReviewId}/findings`);
    for (const finding of res.body.findings as unknown[]) {
      expect(FindingV1Schema.safeParse(finding).success).toBe(true);
    }
  });

  it('total matches findings array length', async () => {
    const res = await request(app).get(`/api/v1/demo/reviews/${knownReviewId}/findings`);
    expect(res.body.total).toBe((res.body.findings as unknown[]).length);
  });

  it('filters by severity=critical', async () => {
    const res = await request(app).get(
      `/api/v1/demo/reviews/${knownReviewId}/findings?severity=critical`,
    );
    expect(res.status).toBe(200);
    for (const finding of res.body.findings as Array<{ severity: string }>) {
      expect(finding.severity).toBe('critical');
    }
    const expected = DEMO_FINDINGS.filter(
      (f) => f.reviewId === knownReviewId && f.severity === 'critical',
    ).length;
    expect(res.body.total).toBe(expected);
  });

  it('filters by category=security', async () => {
    const res = await request(app).get(
      `/api/v1/demo/reviews/${knownReviewId}/findings?category=security`,
    );
    expect(res.status).toBe(200);
    for (const finding of res.body.findings as Array<{ category: string }>) {
      expect(finding.category).toBe('security');
    }
  });

  it('returns empty array when filter matches nothing', async () => {
    // Filter by two non-overlapping constraints
    const res = await request(app).get(
      `/api/v1/demo/reviews/${knownReviewId}/findings?severity=info&category=security`,
    );
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(0);
  });

  it('returns 400 VALIDATION_ERROR for invalid severity', async () => {
    const res = await request(app).get(
      `/api/v1/demo/reviews/${knownReviewId}/findings?severity=extreme`,
    );
    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/application\/problem\+json/);
    expect(res.body.code).toBe('VALIDATION_ERROR');
    expect(Array.isArray(res.body.errors)).toBe(true);
    const errorPaths = (res.body.errors as Array<{ path: string }>).map((e) => e.path);
    expect(errorPaths).toContain('severity');
  });

  it('returns 400 VALIDATION_ERROR for invalid category', async () => {
    const res = await request(app).get(
      `/api/v1/demo/reviews/${knownReviewId}/findings?category=unknown`,
    );
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('VALIDATION_ERROR');
  });

  it('returns 404 for findings of unknown review', async () => {
    const res = await request(app).get('/api/v1/demo/reviews/no-such-review/findings');
    expect(res.status).toBe(404);
    expect(res.body.code).toBe('RESOURCE_NOT_FOUND');
  });
});

describe('Demo endpoints with DEMO_MODE_ENABLED=false', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('returns 503 SERVICE_UNAVAILABLE when demo mode is disabled', async () => {
    vi.stubEnv('DEMO_MODE_ENABLED', 'false');
    const { createApp: createAppFresh } = await import('../src/server.js');
    const freshApp = createAppFresh();
    const res = await request(freshApp).get('/api/v1/demo/reviews');
    expect(res.status).toBe(503);
    expect(res.headers['content-type']).toMatch(/application\/problem\+json/);
    expect(res.body.code).toBe('SERVICE_UNAVAILABLE');
    expect(res.body.retryable).toBe(true);
    vi.unstubAllEnvs();
  });
});
