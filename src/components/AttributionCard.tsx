import type { Figure } from '@/data/types'
import { SourceTag } from './SourceTag'

/**
 * A reform ask, rendered so it can never be mistaken for the site's own voice.
 * The header states plainly that this is a position held by a named body; the
 * source tier (advocacy) and link follow. This is how editorial rule 2 — "asks
 * are attributed, never asserted" — is made structural.
 */
export function AttributionCard({ figure }: { figure: Figure }) {
  return (
    <div className="rounded-xl border border-dashed border-line-strong bg-accent-soft/40 p-5">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-tier-advocacy" aria-hidden="true" />
        A reform ask — attributed, not endorsed
      </p>
      <p className="mt-3 text-base leading-relaxed text-ink-soft">
        <span className="font-display font-semibold text-ink tnum">{figure.display}</span> — {figure.label}.
      </p>
      {figure.note && <p className="mt-1.5 text-sm italic text-muted">{figure.note}</p>}
      <SourceTag source={figure.source} asOf={figure.asOf} className="mt-3" />
    </div>
  )
}
