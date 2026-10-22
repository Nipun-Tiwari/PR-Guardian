import { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import type { FindingSeverity, FindingCategory, FindingV1 } from '@prguardian/shared';
import { useDemoReviews } from '../hooks/useDemoReviews.js';
import { useDemoFindings } from '../hooks/useDemoFindings.js';
import { FindingCard } from '../components/FindingCard.js';
import { SeverityBadge } from '../components/SeverityBadge.js';
import { LoadingSkeleton } from '../components/LoadingSkeleton.js';
import { ErrorDisplay } from '../components/ErrorDisplay.js';

const SEVERITY_OPTIONS: Array<{ value: FindingSeverity; label: string }> = [
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
  { value: 'info', label: 'Info' },
];

const CATEGORY_OPTIONS: Array<{ value: FindingCategory; label: string }> = [
  { value: 'security', label: 'Security' },
  { value: 'bug', label: 'Bug' },
  { value: 'error_handling', label: 'Error Handling' },
  { value: 'performance', label: 'Performance' },
  { value: 'test_coverage', label: 'Test Coverage' },
  { value: 'style', label: 'Style' },
];

export function ReviewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);

  const severity = (searchParams.get('severity') as FindingSeverity | null) ?? undefined;
  const category = (searchParams.get('category') as FindingCategory | null) ?? undefined;

  const { reviews, loading: reviewsLoading, error: reviewsError } = useDemoReviews();
  const review = reviews?.find((r) => r.id === id);

  const {
    findings,
    total,
    loading: findingsLoading,
    error: findingsError,
  } = useDemoFindings(id ?? '', { severity, category });

  function clearFilters() {
    setSearchParams({});
  }

  if (reviewsLoading) {
    return <LoadingSkeleton lines={5} />;
  }

  if (reviewsError) {
    return <ErrorDisplay error={reviewsError} />;
  }

  if (!review) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Review not found.</p>
        <Link to="/demo" className="mt-2 inline-block text-sm text-blue-600 hover:underline">
          ← Back to demo
        </Link>
      </div>
    );
  }

  const { findingsSummary: s } = review;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/demo" className="hover:text-gray-700">
          Demo
        </Link>
        <span>›</span>
        <span className="text-gray-900">PR #{review.pullRequest.number}</span>
      </div>

      {/* Review header */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 mb-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-xs text-gray-500 font-mono mb-1">
              {review.repository.owner}/{review.repository.name}
            </p>
            <h1 className="text-xl font-bold text-gray-900">{review.pullRequest.title}</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">
              #{review.pullRequest.number} · {review.headSha}
            </p>
          </div>
          <span className="shrink-0 text-xs bg-green-100 text-green-800 border border-green-200 px-2 py-0.5 rounded-full font-medium capitalize">
            {review.status}
          </span>
        </div>

        {/* Severity summary */}
        <div className="flex items-center gap-3 flex-wrap pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-600 font-medium">{s.total} findings</span>
          {(
            [
              ['critical', s.critical],
              ['high', s.high],
              ['medium', s.medium],
              ['low', s.low],
              ['info', s.info],
            ] as Array<[FindingSeverity, number]>
          )
            .filter(([, count]) => count > 0)
            .map(([sev, count]) => (
              <button
                key={sev}
                onClick={() => setSearchParams(severity === sev ? {} : { severity: sev })}
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                title={`Filter by ${sev}`}
              >
                <SeverityBadge severity={sev} />
                <span className="text-xs text-gray-600">×{count}</span>
              </button>
            ))}
        </div>
      </div>

      {/* Sample data notice */}
      <div className="mb-4 flex items-center gap-2 text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md px-3 py-2">
        <span>⚠️</span>
        <span>
          This is illustrative sample data from a fictional codebase. Not a real code review.
        </span>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <span className="text-sm text-gray-600 font-medium">Filter:</span>
        <select
          value={severity ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            const next = new URLSearchParams(searchParams);
            if (val) next.set('severity', val);
            else next.delete('severity');
            setSearchParams(next);
          }}
          className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700"
          aria-label="Filter by severity"
        >
          <option value="">All severities</option>
          {SEVERITY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <select
          value={category ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            const next = new URLSearchParams(searchParams);
            if (val) next.set('category', val);
            else next.delete('category');
            setSearchParams(next);
          }}
          className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700"
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {CATEGORY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {(severity || category) && (
          <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">
            Clear filters
          </button>
        )}
      </div>

      {/* Findings list */}
      {findingsLoading && <LoadingSkeleton lines={6} />}
      {findingsError && <ErrorDisplay error={findingsError} />}

      {!findingsLoading && !findingsError && findings !== null && (
        <>
          <p className="text-sm text-gray-500 mb-3">
            {total} finding{total !== 1 ? 's' : ''}
            {severity || category ? ' (filtered)' : ''}
          </p>

          {findings.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-500">No findings match the selected filters.</p>
              <button onClick={clearFilters} className="mt-2 text-sm text-blue-600 hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {findings.map((finding: FindingV1) => (
                <FindingCard
                  key={finding.id}
                  finding={finding}
                  expanded={expandedFinding === finding.id}
                  onClick={() =>
                    setExpandedFinding(expandedFinding === finding.id ? null : finding.id)
                  }
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
