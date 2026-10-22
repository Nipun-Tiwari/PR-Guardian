import type { FindingSeverity } from '@prguardian/shared';

const severityColors: Record<FindingSeverity, string> = {
  critical: 'bg-red-100 text-red-800 border border-red-200',
  high: 'bg-orange-100 text-orange-800 border border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  low: 'bg-blue-100 text-blue-800 border border-blue-200',
  info: 'bg-gray-100 text-gray-600 border border-gray-200',
};

interface SeverityBadgeProps {
  severity: FindingSeverity;
  size?: 'sm' | 'md';
}

export function SeverityBadge({ severity, size = 'sm' }: SeverityBadgeProps) {
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';
  return (
    <span
      data-testid="severity-badge"
      className={`inline-flex items-center rounded-full font-medium capitalize ${sizeClass} ${severityColors[severity]}`}
    >
      {severity}
    </span>
  );
}
