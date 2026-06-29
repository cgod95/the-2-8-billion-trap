import { preventionGrant } from '@/data/dataset'
import { SourceTag } from '../SourceTag'

/**
 * A single split bar for Act 5: of the £633m homelessness prevention grant, 51%
 * (£322m) is absorbed by temporary accommodation, leaving ~£310m for everything
 * else prevention is meant to fund. Plain HTML — proportional, labelled, and
 * legible to assistive tech.
 */
export function PreventionGrantBar() {
  const { total, absorbedByTA, remaining } = preventionGrant
  const taPct = (absorbedByTA.value / total.value) * 100
  const restPct = 100 - taPct

  return (
    <figure className="rounded-xl border border-line bg-surface p-5 sm:p-7">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-semibold leading-snug text-ink">Most of the prevention grant is swallowed by temporary accommodation</h3>
        <span className="font-display text-lg font-semibold text-ink tnum">{total.display} total</span>
      </figcaption>

      <div
        className="mt-5 flex h-12 w-full overflow-hidden rounded-md"
        role="img"
        aria-label={`Of the ${total.display} homelessness prevention grant, ${absorbedByTA.display} — ${Math.round(taPct)} percent — is absorbed by temporary accommodation, leaving ${remaining.display} for homelessness support.`}
      >
        <div className="flex items-center justify-start bg-spend px-3" style={{ width: `${taPct}%` }}>
          <span className="text-xs font-semibold text-on-invert tnum">{absorbedByTA.display}</span>
        </div>
        <div className="flex items-center justify-end px-3" style={{ width: `${restPct}%`, background: 'color-mix(in srgb, var(--color-reclaim) 22%, var(--color-surface))' }}>
          <span className="text-xs font-semibold text-ink-soft tnum">{remaining.display}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-spend" aria-hidden="true" />
          <span className="text-ink-soft">Absorbed by temporary accommodation — <span className="font-semibold text-ink tnum">{Math.round(taPct)}%</span></span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: 'color-mix(in srgb, var(--color-reclaim) 45%, var(--color-surface))' }} aria-hidden="true" />
          <span className="text-ink-soft">Left for homelessness support</span>
        </span>
      </div>

      <SourceTag source={preventionGrant.absorbedByTA.source} asOf={preventionGrant.asOf} className="mt-4" />
    </figure>
  )
}
