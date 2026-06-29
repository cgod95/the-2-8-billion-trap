import { sources } from '@/data/sources'
import { DATA } from '@/data/dataset'
import { tierMeta, tierOrder } from '@/lib/meta'
import { BrandMark } from './BrandMark'
import { ExternalLinkIcon } from './icons'
import type { SourceTier } from '@/data/types'

/** All registered sources, grouped by tier and de-duplicated by URL. */
function sourcesByTier(): Record<SourceTier, { name: string; url: string }[]> {
  const out: Record<SourceTier, { name: string; url: string }[]> = {
    official: [], parliament: [], analysis: [], advocacy: [],
  }
  const seen = new Set<string>()
  for (const s of Object.values(sources)) {
    if (seen.has(s.url)) continue
    seen.add(s.url)
    out[s.tier].push({ name: s.name, url: s.url })
  }
  return out
}

export function Footer() {
  const grouped = sourcesByTier()

  return (
    <footer className="bg-surface-invert text-on-invert">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex items-center gap-3">
          <BrandMark className="h-7 w-7" />
          <span className="font-display text-lg font-semibold">The £2.8 Billion Trap</span>
        </div>

        {/* Neutrality & method */}
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-on-invert/60">How this was made</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-on-invert/80">
              <li>Every on-screen figure restates a named source's published finding, linked at the point of use.</li>
              <li>Sources are tiered so official statistics read differently from advocacy analysis — see the key below.</li>
              <li>Reform asks (unfreezing the subsidy and LHA) are attributed to the bodies that made them, never adopted in the site's own voice.</li>
              <li>Forecasts are labelled as forecasts; where a chart shows an illustrative trend between sparse outturns, that is disclosed on the chart.</li>
              <li>No stock imagery, no emotional framing. The numbers carry the argument.</li>
            </ul>
            <p className="mt-6 text-sm text-on-invert/60">
              Data as of {DATA.asOf} ({DATA.published}). Last verified {DATA.verified}. Figures are
              England unless stated. Re-check the sources before citing — the policy is live.
            </p>
          </div>

          {/* Source index */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-on-invert/60">Sources</h2>
            <div className="mt-4 space-y-5">
              {tierOrder.map((tier) => (
                <div key={tier}>
                  <p className="flex items-center gap-2 text-xs font-medium text-on-invert/70">
                    <span className={`h-1.5 w-1.5 rounded-full ${tierMeta[tier].dot}`} aria-hidden="true" />
                    {tierMeta[tier].label}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {grouped[tier].map((s) => (
                      <li key={s.url}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-start gap-1.5 text-sm text-on-invert/85 underline-offset-2 hover:text-on-invert hover:underline"
                        >
                          <span>{s.name}</span>
                          <ExternalLinkIcon className="mt-0.5 h-3 w-3 shrink-0 opacity-50 group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-on-invert/15 pt-6 text-xs text-on-invert/50">
          A neutral, public-record data piece. Not affiliated with any of the organisations cited.
          Built as an explanatory companion in the spirit of ONS, the FT and Our World in Data.
        </div>
      </div>
    </footer>
  )
}
