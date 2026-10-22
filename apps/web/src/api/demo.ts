import type {
  ReviewSummaryV1,
  FindingV1,
  FindingSeverity,
  FindingCategory,
} from '@prguardian/shared';
import { apiFetch } from './client.js';

export interface FindingsQueryParams {
  severity?: FindingSeverity;
  category?: FindingCategory;
}

export interface FindingsResponse {
  reviewId: string;
  findings: FindingV1[];
  total: number;
}

export function getDemoReviews(): Promise<ReviewSummaryV1[]> {
  return apiFetch<ReviewSummaryV1[]>('/api/v1/demo/reviews');
}

export function getDemoReview(id: string): Promise<ReviewSummaryV1> {
  return apiFetch<ReviewSummaryV1>(`/api/v1/demo/reviews/${encodeURIComponent(id)}`);
}

export function getDemoFindings(
  reviewId: string,
  params?: FindingsQueryParams,
): Promise<FindingsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.severity) searchParams.set('severity', params.severity);
  if (params?.category) searchParams.set('category', params.category);
  const qs = searchParams.size > 0 ? `?${searchParams.toString()}` : '';
  return apiFetch<FindingsResponse>(
    `/api/v1/demo/reviews/${encodeURIComponent(reviewId)}/findings${qs}`,
  );
}
