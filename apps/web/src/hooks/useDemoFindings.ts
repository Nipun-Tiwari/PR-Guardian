import { useState, useEffect } from 'react';
import type { FindingV1 } from '@prguardian/shared';
import type { FindingsQueryParams } from '../api/demo.js';
import { getDemoFindings } from '../api/demo.js';
import { ApiError } from '../api/client.js';

interface UseDemoFindingsResult {
  findings: FindingV1[] | null;
  total: number;
  loading: boolean;
  error: ApiError | Error | null;
}

export function useDemoFindings(
  reviewId: string,
  params: FindingsQueryParams = {},
): UseDemoFindingsResult {
  const [findings, setFindings] = useState<FindingV1[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getDemoFindings(reviewId, params)
      .then((data) => {
        if (!controller.signal.aborted) {
          setFindings(data.findings);
          setTotal(data.total);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [reviewId, params.severity, params.category]);

  return { findings, total, loading, error };
}
