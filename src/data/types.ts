/**
 * Data model for "The £2.8 Billion Trap".
 *
 * The organising principle: **no figure reaches the screen without its source.**
 * Every number is a `Figure` (or a `SeriesPoint`) that carries its own source,
 * source tier and `asOf` date. Neutrality and attribution are therefore
 * structural, not a matter of editorial discipline — a value literally cannot be
 * rendered without the metadata the `<SourceTag>` needs.
 *
 * The four source tiers exist to satisfy the central editorial rule: the reader
 * must be able to tell a neutral government/parliamentary statistic from an
 * advocacy body's analysis at a glance.
 */

/**
 * Source tier — drives the badge colour and tells the reader the *kind* of
 * authority behind a figure.
 *
 *  - `official`    Official statistics or impartial parliamentary research
 *                  (MHCLG live tables, House of Commons Library briefings).
 *  - `parliament`  Hansard — a named member's words on the record in a debate.
 *  - `analysis`    Independent research / think-tank analysis (IfG, Resolution
 *                  Foundation). Rigorous, but the body has an analytical view.
 *  - `advocacy`    Sector & campaign bodies with a stated position (Shelter, the
 *                  LGA, JRF, CIH, London Councils). Their asks are attributed,
 *                  never adopted in the site's own voice.
 */
export type SourceTier = 'official' | 'parliament' | 'analysis' | 'advocacy'

/** A named, linkable source. Reused across many figures via the registry. */
export interface Source {
  id: string
  /** Display name, e.g. "House of Commons Library, CBP-10421". */
  name: string
  /** Canonical URL. Re-fetch before publishing (see README). */
  url: string
  tier: SourceTier
  /** Optional one-line note on the body's standing / any stated position. */
  note?: string
}

/** A single sourced figure. Nothing numeric is shown to the reader without one. */
export interface Figure {
  id: string
  /** Numeric value in the figure's stated unit (for charts and sorting). */
  value: number
  /** Formatted value as published, e.g. "£2.84bn", "+25%", "165,510". */
  display: string
  /** Short restatement of what the figure measures. */
  label: string
  source: Source
  /** Human "as of" marker, e.g. "FY2024/25", "31 Dec 2024", "Sep 2025". */
  asOf: string
  /** True where the value is a forecast/projection, not an outturn. */
  isProjection?: boolean
  /** Optional clarifying note, rendered as fine print where space allows. */
  note?: string
}

/** One point in a time series for a chart. */
export interface SeriesPoint {
  /** Numeric x — a calendar year (financial years use the ending year). */
  year: number
  /** Display label for the period, e.g. "2024/25", "2023/24", "2030". */
  period: string
  /** Numeric y in the series' unit. */
  value: number
  /** Optional formatted value for labels/tooltips, e.g. "£2.84bn". */
  display?: string
  /**
   * True where this point is a directly-sourced outturn. False (or absent) where
   * it is approximate or an illustrative/modelled connector — flagged on-chart so
   * the reader never mistakes a modelled trend line for a year-by-year dataset.
   */
  isHard?: boolean
  /** True where the point is a forecast/projection. */
  isProjection?: boolean
  source?: Source
  note?: string
}
