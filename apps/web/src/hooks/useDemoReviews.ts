import { useState, useEffect } from 'react';
import type { ReviewSummaryV1 } from '@prguardian/shared';
import { getDemoReviews } from '../api/demo.js';
import { ApiError } from '../api/client.js';

interface UseDemoReviewsResult {
  reviews: ReviewSummaryV1[] | null;
  loading: boolean;
  error: ApiError | Error | null;
}

export function useDemoReviews(): UseDemoReviewsResult {
  const [reviews, setReviews] = useState<ReviewSummaryV1[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getDemoReviews()
      .then((data) => {
        if (!controller.signal.aborted) {
          setReviews(data);
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
  }, []);

  return { reviews, loading, error };
}
