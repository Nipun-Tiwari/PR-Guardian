interface LoadingSkeletonProps {
  lines?: number;
}

export function LoadingSkeleton({ lines = 3 }: LoadingSkeletonProps) {
  return (
    <div className="animate-pulse space-y-3" role="status" aria-label="Loading">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded w-full" />
      ))}
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div
      className="animate-pulse rounded-lg border border-gray-200 bg-white p-5"
      role="status"
      aria-label="Loading"
    >
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
      <div className="h-3 bg-gray-200 rounded w-full mb-2" />
      <div className="h-3 bg-gray-200 rounded w-3/4" />
    </div>
  );
}
