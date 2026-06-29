import type { Source } from '@/data/types'
import { tierMeta } from '@/lib/meta'
import { ExternalLinkIcon } from './icons'

interface SourceTagProps {
  source: Source
  asOf: string
  /** Marks the attached figure as a forecast, not an outturn. */
  isProjection?: boolean
  /** Compact variant for dense contexts (legends, table rows). */
  compact?: boolean
  className?: string
}

/**
 * The single component used everywhere a sourced figure appears. It shows the
 * source tier (so official statistics read differently from advocacy analysis),
 * links through to the source, and carries the "as of" date and any projection
 * flag. If a figure can't supply these props, it shouldn't be on screen.
 */
export function SourceTag({ source, asOf, isProjection, compact = false, className = '' }: SourceTagProps) {
  const meta = tierMeta[source.tier]

  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${compact ? 'text-[11px]' : 'text-xs'} ${className}`}>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-medium ${meta.chip}`}
        title={meta.description}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
        {meta.label}
      </span>

      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1 font-medium text-accent decoration-accent/30 underline-offset-2 hover:underline"
        aria-label={`Source: ${source.name} (opens in a new tab)`}
      >
        <span className={compact ? 'max-w-[15rem] truncate' : ''}>{source.name}</span>
        <ExternalLinkIcon className="h-3 w-3 shrink-0 opacity-60 group-hover:opacity-100" />
      </a>

      <span className="text-muted">· as of {asOf}</span>

      {isProjection && (
        <span className="inline-flex items-center gap-1 rounded-full border border-forecast/50 px-1.5 py-0.5 font-medium text-muted">
          Forecast
        </span>
      )}
    </div>
  )
}
