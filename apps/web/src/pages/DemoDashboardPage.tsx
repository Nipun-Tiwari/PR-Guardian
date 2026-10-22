import { Link } from 'react-router-dom';
import type { ReviewSummaryV1 } from '@prguardian/shared';
import { useDemoReviews } from '../hooks/useDemoReviews.js';
import { LoadingCard } from '../components/LoadingSkeleton.js';
import { ErrorDisplay } from '../components/ErrorDisplay.js';
import { SeverityBadge } from '../components/SeverityBadge.js';

function ReviewCard({ review }: { review: ReviewSummaryV1 }) {
  const { findingsSummary: s } = review;
  const severityCounts = [
    { key: 'critical' as const, count: s.critical },
    { key: 'high' as const, count: s.high },
    { key: 'medium' as const, count: s.medium },
    { key: 'low' as const, count: s.low },
    { key: 'info' as const, count: s.info },
  ].filter((x) => x.count > 0);

  return (
    <Link
      to={`/demo/reviews/${review.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500 font-mono mb-1">
            {review.repository.owner}/{review.repository.name} · PR #{review.pullRequest.number}
          </p>
          <h3 className="font-semibold text-gray-900 leading-snug">{review.pullRequest.title}</h3>
        </div>
        <span className="shrink-0 text-xs bg-green-100 text-green-800 border border-green-200 px-2 py-0.5 rounded-full font-medium capitalize">
          {review.status}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500">{s.total} findings:</span>
        {severityCounts.map(({ key, count }) => (
          <span key={key} className="flex items-center gap-1">
            <SeverityBadge severity={key} />
            <span className="text-xs text-gray-600">×{count}</span>
          </span>
        ))}
      </div>

      {review.completedAt && (
        <p className="mt-3 text-xs text-gray-400">
          Completed {new Date(review.completedAt).toLocaleString()}
        </p>
      )}
    </Link>
  );
}

export function DemoDashboardPage() {
  const { reviews, loading, error } = useDemoReviews();

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-gray-900">Demo Reviews</h1>
          <span className="text-xs bg-yellow-100 text-yellow-800 border border-yellow-200 px-2 py-0.5 rounded-full">
            Sample data
          </span>
        </div>
        <p className="text-gray-600 text-sm">
          Illustrative reviews from a fictional API gateway repository. This is not a real review.
        </p>
      </div>

      {loading && (
        <div className="space-y-3">
          <LoadingCard />
          <LoadingCard />
        </div>
      )}

      {error && <ErrorDisplay error={error} />}

      {reviews && reviews.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <p>No demo reviews available.</p>
        </div>
      )}

      {reviews && reviews.length > 0 && (
        <div className="space-y-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
