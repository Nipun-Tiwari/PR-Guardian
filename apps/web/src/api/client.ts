import type { ApiProblemV1 } from '@prguardian/shared';

const BASE_URL = import.meta.env['VITE_API_BASE_URL'] ?? '';

export class ApiError extends Error {
  readonly problem: ApiProblemV1;
  readonly status: number;

  constructor(problem: ApiProblemV1) {
    super(problem.detail);
    this.name = 'ApiError';
    this.problem = problem;
    this.status = problem.status;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...init,
    credentials: 'include', // send session cookie cross-origin
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });

  if (!res.ok) {
    const contentType = res.headers.get('content-type') ?? '';
    if (contentType.includes('application/problem+json')) {
      const problem = (await res.json()) as ApiProblemV1;
      throw new ApiError(problem);
    }
    throw new ApiError({
      type: 'https://prguardian.dev/problems/upstream-failure',
      title: 'Unexpected server error',
      status: res.status,
      detail: `Server returned ${res.status} ${res.statusText}`,
      code: 'UPSTREAM_FAILURE',
      requestId: 'unknown',
      retryable: false,
    });
  }

  return res.json() as Promise<T>;
}
