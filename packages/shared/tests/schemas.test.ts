import { describe, it, expect } from 'vitest';
import { ZodError } from 'zod';
import {
  ApiProblemV1Schema,
  FindingV1Schema,
  ReviewSummaryV1Schema,
} from '../src/index.js';

describe('ApiProblemV1Schema', () => {
  const valid = {
    type: 'https://prguardian.dev/problems/internal-error',
    title: 'Internal Error',
    status: 500,
    detail: 'Something went wrong.',
    code: 'INTERNAL_ERROR' as const,
    requestId: 'req_abc123',
    retryable: false,
  };

  it('parses a valid problem', () => {
    expect(() => ApiProblemV1Schema.parse(valid)).not.toThrow();
  });

  it('parses with optional errors array', () => {
    const withErrors = {
      ...valid,
      code: 'VALIDATION_ERROR' as const,
      status: 400,
      errors: [{ path: 'field', message: 'Required' }],
    };
    expect(() => ApiProblemV1Schema.parse(withErrors)).not.toThrow();
  });

  it('rejects missing required fields', () => {
    expect(() => ApiProblemV1Schema.parse({})).toThrow(ZodError);
  });

  it('rejects invalid status code', () => {
    expect(() => ApiProblemV1Schema.parse({ ...valid, status: 99 })).toThrow(ZodError);
  });

  it('rejects unknown error code', () => {
    expect(() => ApiProblemV1Schema.parse({ ...valid, code: 'UNKNOWN_CODE' })).toThrow(ZodError);
  });
});

describe('FindingV1Schema', () => {
  const valid = {
    schemaVersion: 1 as const,
    id: '123e4567-e89b-12d3-a456-426614174000',
    reviewId: '123e4567-e89b-12d3-a456-426614174001',
    source: 'static_rule' as const,
    category: 'security' as const,
    severity: 'high' as const,
    confidence: 'high' as const,
    filePath: 'src/auth.ts',
    lineStart: 42,
    message: 'SQL injection risk detected',
    validationStatus: 'valid' as const,
    fingerprint: 'abc123def456',
  };

  it('parses a valid finding', () => {
    expect(() => FindingV1Schema.parse(valid)).not.toThrow();
  });

  it('parses with optional fields', () => {
    const full = {
      ...valid,
      lineEnd: 45,
      evidence: 'user input passed to query',
      recommendation: 'Use parameterized queries',
    };
    expect(() => FindingV1Schema.parse(full)).not.toThrow();
  });

  it('rejects schemaVersion other than 1', () => {
    expect(() => FindingV1Schema.parse({ ...valid, schemaVersion: 2 })).toThrow(ZodError);
  });

  it('rejects invalid severity', () => {
    expect(() => FindingV1Schema.parse({ ...valid, severity: 'extreme' })).toThrow(ZodError);
  });

  it('rejects negative lineStart', () => {
    expect(() => FindingV1Schema.parse({ ...valid, lineStart: -1 })).toThrow(ZodError);
  });
});

describe('ReviewSummaryV1Schema', () => {
  const valid = {
    schemaVersion: 1 as const,
    id: '123e4567-e89b-12d3-a456-426614174000',
    mode: 'demo' as const,
    repository: { id: 'repo-1', owner: 'acme', name: 'backend' },
    pullRequest: { number: 42, title: 'Add auth middleware' },
    headSha: 'abc1234def5678',
    status: 'succeeded' as const,
    findingsSummary: { total: 3, critical: 0, high: 1, medium: 2, low: 0, info: 0 },
  };

  it('parses a valid review summary', () => {
    expect(() => ReviewSummaryV1Schema.parse(valid)).not.toThrow();
  });

  it('parses with optional timestamps', () => {
    const withTimestamps = {
      ...valid,
      startedAt: '2026-10-15T10:00:00.000Z',
      completedAt: '2026-10-15T10:01:30.000Z',
    };
    expect(() => ReviewSummaryV1Schema.parse(withTimestamps)).not.toThrow();
  });

  it('rejects invalid status', () => {
    expect(() => ReviewSummaryV1Schema.parse({ ...valid, status: 'unknown' })).toThrow(ZodError);
  });

  it('rejects headSha shorter than 7 chars', () => {
    expect(() => ReviewSummaryV1Schema.parse({ ...valid, headSha: 'abc' })).toThrow(ZodError);
  });

  it('rejects negative finding counts', () => {
    const bad = { ...valid, findingsSummary: { ...valid.findingsSummary, total: -1 } };
    expect(() => ReviewSummaryV1Schema.parse(bad)).toThrow(ZodError);
  });
});
