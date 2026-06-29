import { DATA } from '@/data/dataset'

/**
 * Site-wide "Data as of…" notice, driven by the single `DATA` provenance
 * constant. Because the policy is live and the figures are date-sensitive, this
 * is the reader's first signal of how fresh the page is.
 */
export function DataAsOfBanner() {
  return (
    <div className="bg-surface-invert text-on-invert">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-5 py-2 text-xs sm:px-8">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Data as of {DATA.asOf}
        </span>
        <span className="text-on-invert/40" aria-hidden="true">·</span>
        <span className="text-on-invert/80">{DATA.published}</span>
        <span className="text-on-invert/40" aria-hidden="true">·</span>
        <span className="text-on-invert/80">
          Verified <span className="font-medium text-on-invert">{DATA.verified}</span>
        </span>
        <span className="hidden text-on-invert/40 sm:inline" aria-hidden="true">·</span>
        <span className="hidden text-on-invert/60 sm:inline">{DATA.status}</span>
      </div>
    </div>
  )
}
