import type { Figure as FigureData } from '@/data/types'
import { SourceTag } from './SourceTag'

interface FigureProps {
  figure: FigureData
  /** Visual weight. `hero` is for the one or two defining numbers per act. */
  size?: 'hero' | 'card' | 'inline'
  className?: string
}

/**
 * A single sourced figure rendered as a stat block: the published value, a short
 * restatement of what it measures, and the source tag beneath. Every number the
 * reader sees on the page comes through here (or through a chart, which carries
 * its own source line) — so every number is attributable by construction.
 */
export function Figure({ figure, size = 'card', className = '' }: FigureProps) {
  if (size === 'inline') {
    return (
      <span className={className}>
        <span className="font-display font-semibold text-accent tnum">{figure.display}</span>
      </span>
    )
  }

  const valueClass =
    size === 'hero'
      ? 'text-5xl sm:text-6xl'
      : 'text-3xl sm:text-4xl'

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-baseline gap-2">
        <span className={`font-display font-semibold leading-none tracking-tight text-ink tnum ${valueClass}`}>
          {figure.display}
        </span>
        {figure.isProjection && (
          <span className="rounded-full border border-forecast/50 px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">
            Forecast
          </span>
        )}
      </div>
      <p className={`text-ink-soft ${size === 'hero' ? 'max-w-md text-base' : 'text-sm'}`}>{figure.label}</p>
      {figure.note && <p className="text-xs italic text-muted">{figure.note}</p>}
      <SourceTag source={figure.source} asOf={figure.asOf} isProjection={figure.isProjection} className="mt-0.5" />
    </div>
  )
}
