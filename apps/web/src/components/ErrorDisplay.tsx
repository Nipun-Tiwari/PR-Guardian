import { ApiError } from '../api/client.js';

interface ErrorDisplayProps {
  error: ApiError | Error;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (error instanceof ApiError) {
    const isUnavailable = error.problem.code === 'SERVICE_UNAVAILABLE';
    return (
      <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="font-semibold text-red-900">
          {isUnavailable ? 'Demo Unavailable' : error.problem.title}
        </p>
        <p className="mt-1 text-sm text-red-700">{error.problem.detail}</p>
        {error.problem.retryable && (
          <p className="mt-2 text-xs text-red-500">
            This error is temporary. Please refresh and try again.
          </p>
        )}
        {error.problem.requestId !== 'unknown' && (
          <p className="mt-2 text-xs text-red-400 font-mono">
            Request ID: {error.problem.requestId}
          </p>
        )}
      </div>
    );
  }

  return (
    <div role="alert" className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="font-semibold text-gray-900">Something went wrong</p>
      <p className="mt-1 text-sm text-gray-600">{error.message}</p>
    </div>
  );
}
