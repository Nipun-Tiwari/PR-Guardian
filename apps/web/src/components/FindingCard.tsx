import type { FindingV1 } from '@prguardian/shared';
import { SeverityBadge } from './SeverityBadge.js';

interface FindingCardProps {
  finding: FindingV1;
  expanded?: boolean;
  onClick?: () => void;
}

export function FindingCard({ finding, expanded = false, onClick }: FindingCardProps) {
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white p-4 hover:border-gray-300 transition-colors cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <SeverityBadge severity={finding.severity} />
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
            {finding.category.replace('_', ' ')}
          </span>
        </div>
        <span className="text-xs text-gray-400 font-mono whitespace-nowrap">
          {finding.filePath}:{finding.lineStart}
          {finding.lineEnd && finding.lineEnd !== finding.lineStart ? `–${finding.lineEnd}` : ''}
        </span>
      </div>

      {/* Message is rendered as text — React escapes HTML entities automatically */}
      <p className="mt-2 text-sm text-gray-800">{finding.message}</p>

      {expanded && (
        <>
          {finding.evidence && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Evidence
              </p>
              <pre className="text-xs bg-gray-50 border border-gray-100 rounded p-2 overflow-x-auto text-gray-700 whitespace-pre-wrap">
                {finding.evidence}
              </pre>
            </div>
          )}
          {finding.recommendation && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Recommendation
              </p>
              <p className="text-sm text-gray-700">{finding.recommendation}</p>
            </div>
          )}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-400">
              Confidence: <span className="capitalize">{finding.confidence}</span>
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-400">
              Source: {finding.source.replace('_', ' ')}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
