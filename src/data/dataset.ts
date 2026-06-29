import type { Figure, SeriesPoint } from './types'
import { sources } from './sources'

/**
 * The verified dataset for "The £2.8 Billion Trap".
 *
 * Figures are England, FY2024/25 (published Sep–Dec 2025) plus time series back
 * to 2009/10. Every value restates a named source's published finding; nothing
 * here is invented. Forecasts are flagged `isProjection`. Where a chart needs a
 * connecting trend between sparse outturns, those connectors are flagged
 * `isHard: false` and disclosed on the chart itself.
 *
 * Refreshing: when MHCLG publishes the next outturn, update the figures below,
 * bump `DATA.asOf` / `DATA.verified`, and mark any changed number with
 * `// REVIEW:` (see README).
 */

/** Site-wide provenance, drives the "Data as of…" banner and footer. */
export const DATA = {
  /** The reporting period most headline figures describe. */
  asOf: 'FY2024/25',
  /** When figures were last checked against sources. */
  verified: 'June 2026',
  published: 'published Sep–Dec 2025',
  /** A neutral, current status line for the banner. */
  status: 'Live policy — LHA frozen to at least 2029-30 (HM Treasury forecast)',
} as const

/* ───────────────────────── ACT 1 — Human scale (A3) ───────────────────────── */

/** Children in temporary accommodation — the headline human unit. */
export const childrenInTA: Figure = {
  id: 'children-ta',
  value: 165510,
  display: '165,510',
  label: 'children in temporary accommodation, England',
  source: sources.shelterChildren,
  asOf: '31 Dec 2024',
  note: 'An eighth consecutive record high. Rose further to 172,420 by Jun 2025.',
}

/** Children-in-TA time series (point-in-time counts at quarter end). */
export const childrenSeries: SeriesPoint[] = [
  { year: 2022, period: '30 Jun 2022', value: 120710, display: '120,710', isHard: true, source: sources.mhclgTA1 },
  { year: 2023, period: '30 Sep 2023', value: 142490, display: '142,490', isHard: true, source: sources.mhclgTA1 },
  { year: 2024, period: '31 Dec 2024', value: 165510, display: '165,510', isHard: true, source: sources.shelterChildren, note: 'Record high' },
  { year: 2025, period: 'Jun 2025', value: 172420, display: '172,420', isHard: true, source: sources.mhclgTA1, note: 'In 84,240 households with children' },
]

/** Households in temporary accommodation (point-in-time counts). */
export const householdsSeries: SeriesPoint[] = [
  { year: 2010, period: 'Q2 2010', value: 51310, display: '51,310', isHard: true, source: sources.ifg },
  { year: 2022, period: '30 Jun 2022', value: 99000, display: '~99,000', isHard: false, source: sources.mhclgTA1, note: 'Approximate' },
  { year: 2023, period: '30 Sep 2023', value: 109000, display: '109,000', isHard: true, source: sources.mhclgTA1 },
  { year: 2024, period: '31 Dec 2024', value: 127890, display: '127,890', isHard: true, source: sources.mhclgTA1, note: 'Record high' },
]

export const humanScaleFigures: Figure[] = [
  {
    id: 'households-growth',
    value: 156,
    display: '+156%',
    label: 'growth in households in TA since Q2 2010 (51,310 → 127,890)',
    source: sources.ifg,
    asOf: '31 Dec 2024',
  },
  {
    id: 'households-per-1000',
    value: 5.4,
    display: '5.4',
    label: 'households per 1,000 in England now in temporary accommodation',
    source: sources.ifg,
    asOf: 'FY2024/25',
  },
  {
    id: 'children-since-2019',
    value: 36,
    display: '+36%',
    label: 'households with children in TA since June 2019',
    source: sources.commonsTA,
    asOf: 'Jun 2025',
  },
  {
    id: 'london-children',
    value: 85000,
    display: '~85,000',
    label: 'children in TA in London — about one homeless child per classroom',
    source: sources.londonCouncils,
    asOf: '2025',
    note: '~175,000 Londoners in TA; roughly 1 in 50 (1 in 20 in Newham).',
  },
]

/* ───────────────────────── ACT 2 — The money (A1, A2) ──────────────────────── */

export const headlineSpend: Figure[] = [
  {
    id: 'ta-gross',
    value: 2.84,
    display: '£2.84bn',
    label: 'gross spend on temporary accommodation, England, 2024/25',
    source: sources.commonsTA,
    asOf: 'FY2024/25',
    note: '£1.43bn net of subsidy and contributions.',
  },
  {
    id: 'ta-yoy',
    value: 25,
    display: '+25%',
    label: 'increase in the TA bill in twelve months',
    source: sources.shelter,
    asOf: 'Sep 2025',
  },
  {
    id: 'ta-bnb',
    value: 0.844,
    display: '£844m',
    label: 'spent on emergency B&Bs and hostels — about a third of the total',
    source: sources.cih,
    asOf: 'FY2024/25',
  },
  {
    id: 'ta-nightly',
    // REVIEW: Part A stated ">£1bn (≈40%)"; Shelter's release gives the precise £1.078bn. Verified Jun 2026.
    value: 1.08,
    display: '£1.08bn',
    label: 'spent on nightly-paid self-contained rooms — about 40% of the total',
    source: sources.shelter,
    asOf: 'FY2024/25',
    note: 'Nightly-paid spend rose +79% year on year — the biggest single rise.',
  },
  {
    id: 'ta-5yr',
    value: 118,
    display: '+118%',
    label: 'growth in total TA spend over five years',
    source: sources.shelter,
    asOf: 'FY2024/25',
  },
  {
    id: 'london-per-day',
    value: 5,
    display: '≈£5m',
    label: 'spent on temporary accommodation in London every day',
    source: sources.commonsTA,
    asOf: 'FY2024/25',
  },
]

/**
 * Gross TA spend by year, England (£bn). Recent years are well-sourced outturns;
 * 2009/10 and 2018/19 are approximate (flagged `isHard: false`). The 2009/10 base
 * anchors the IfG "more than a 19× real-terms rise" framing.
 */
export const spendSeries: SeriesPoint[] = [
  { year: 2010, period: '2009/10', value: 0.15, display: '~£0.15bn', isHard: false, source: sources.ifg, note: 'Real-terms base — IfG: ~1/19th of 2024/25 net' },
  { year: 2019, period: '2018/19', value: 1.1, display: '~£1.1bn', isHard: false, source: sources.mhclgRO, note: 'Approximate — confirm from RO tables' },
  { year: 2023, period: '2022/23', value: 1.74, display: '£1.74bn', isHard: true, source: sources.mhclgRO },
  { year: 2024, period: '2023/24', value: 2.3, display: '~£2.3bn', isHard: true, source: sources.commonsTA },
  { year: 2025, period: '2024/25', value: 2.84, display: '£2.84bn', isHard: true, source: sources.commonsTA, note: 'Record. £1.43bn net.' },
]

/**
 * Split of the 2024/25 gross total by accommodation type — to shade the share on
 * the worst-value, worst-outcome end. B&B/hostels + nightly-paid ≈ £1.85bn of
 * £2.84bn (~65%).
 */
export const spendSplit2425 = {
  total: { value: 2.84, display: '£2.84bn' },
  worstValue: {
    // REVIEW: £844m (B&Bs/hostels) + £1.078bn (nightly-paid) = ~£1.92bn (~68%). Verified Jun 2026.
    value: 1.92,
    display: '~£1.9bn',
    label: 'on B&Bs/hostels (£844m) and nightly-paid rooms (£1.08bn)',
    source: sources.shelter,
  },
  rest: { value: 0.92, display: '~£0.92bn', label: 'other temporary accommodation' },
} as const

/* ─────────────────── ACT 3 — The mechanism / subsidy gap (A4) ──────────────── */

export const subsidyFigures: Figure[] = [
  {
    id: 'subsidy-peg',
    value: 2011,
    display: '90% of Jan 2011',
    label: 'the cap on reclaimable TA subsidy — pegged to Jan-2011 LHA rates, frozen since',
    source: sources.lga,
    asOf: 'Nov 2025',
  },
  {
    id: 'ta-hb-spend',
    value: 1.05,
    display: '£1.05bn',
    label: 'councils’ TA housing-benefit spend, 2023/24',
    source: sources.lga,
    asOf: '2023/24',
  },
  {
    id: 'dwp-reimb',
    value: 0.78,
    display: '£780m',
    label: 'reimbursed by DWP, 2023/24 — held down by the frozen peg',
    source: sources.lga,
    asOf: '2023/24',
  },
  {
    id: 'gap-1yr',
    value: 0.266,
    display: '£266m',
    label: 'the subsidy gap councils covered from their own budgets in a single year',
    source: sources.lga,
    asOf: '2023/24',
  },
  {
    id: 'gap-5yr',
    value: 0.7,
    display: '>£700m',
    label: 'unrecoverable TA subsidy over five years',
    source: sources.lga,
    asOf: '5 years to 2023/24',
  },
]

/** The LGA's reform ask — attributed, never adopted in the site's voice. */
export const subsidyAsk: Figure = {
  id: 'lga-ask',
  value: 90,
  display: '90% of prevailing',
  label: 'The LGA calls for the subsidy to be re-pegged to 90% of prevailing LHA rates',
  source: sources.lga,
  asOf: 'Nov 2025',
}

/**
 * The subsidy-gap series, £bn, 2011 → 2023/24.
 *
 * IMPORTANT — read with the on-chart disclosure:
 *  - `spend`  = councils' TA housing-benefit spend. Only 2024 (= 2023/24, £1.05bn)
 *               is a sourced outturn (`isHard: true`). Earlier points trace the
 *               documented TA-spend escalation and are illustrative connectors.
 *  - `reclaim`= the reclaimable subsidy, capped at 90% of Jan-2011 LHA and frozen.
 *               Only 2024 (= 2023/24, £780m) is a sourced outturn. It rises only
 *               with caseload, far slower than real costs — the widening wedge.
 *
 * The on-screen annotations (£266m, >£700m, the 2011 peg) are all sourced
 * outturns; the connecting trajectory is disclosed as illustrative, not a
 * year-by-year dataset.
 */
export const subsidyGapSeries: { spend: SeriesPoint[]; reclaim: SeriesPoint[] } = {
  spend: [
    { year: 2011, period: '2011', value: 0.45, isHard: false },
    { year: 2013, period: '2013', value: 0.52, isHard: false },
    { year: 2015, period: '2015', value: 0.6, isHard: false },
    { year: 2017, period: '2017', value: 0.7, isHard: false },
    { year: 2019, period: '2019', value: 0.82, isHard: false },
    { year: 2021, period: '2021', value: 0.93, isHard: false },
    { year: 2023, period: '2022/23', value: 1.0, isHard: false },
    { year: 2024, period: '2023/24', value: 1.05, display: '£1.05bn', isHard: true, source: sources.lga },
  ],
  reclaim: [
    { year: 2011, period: '2011', value: 0.42, isHard: false },
    { year: 2013, period: '2013', value: 0.45, isHard: false },
    { year: 2015, period: '2015', value: 0.49, isHard: false },
    { year: 2017, period: '2017', value: 0.55, isHard: false },
    { year: 2019, period: '2019', value: 0.62, isHard: false },
    { year: 2021, period: '2021', value: 0.7, isHard: false },
    { year: 2023, period: '2022/23', value: 0.75, isHard: false },
    { year: 2024, period: '2023/24', value: 0.78, display: '£780m', isHard: true, source: sources.lga },
  ],
}

/* ─────────────── ACT 4 — Prevention link / LHA affordability (A5) ──────────── */

export const lhaFreezeFigures: Figure[] = [
  {
    id: 'lha-decoupled',
    value: 2012,
    display: '2012',
    label: 'the year LHA was decoupled from actual rents',
    source: sources.resolution,
    asOf: 'Nov 2025',
  },
  {
    id: 'lha-frozen-count',
    value: 8,
    display: '8 times',
    label: 'LHA has been frozen since 2012 — re-pegged to the 30th percentile only twice (2020, 2024)',
    source: sources.resolution,
    asOf: 'Nov 2025',
  },
  {
    id: 'lha-2m',
    value: 2000000,
    display: '~2 million',
    label: 'low-income families affected by the gap between LHA and rents',
    source: sources.resolution,
    asOf: '2025',
  },
]

/**
 * Affordability gap — LHA shortfall against the 30th-percentile rent, as a
 * percentage. The metric the Resolution Foundation reports from 2025 onward.
 * 2026 and 2029-30 are forecasts (`isProjection`).
 */
export const affordabilitySeries: SeriesPoint[] = [
  { year: 2025, period: '2025', value: 14, display: '14%', isHard: true, isProjection: false, source: sources.resolution, note: '~£104/mo below 30th-pct rent (2-bed)' },
  { year: 2026, period: '2026', value: 17, display: '~17%', isHard: false, isProjection: true, source: sources.resolution, note: 'A record — ~£120/mo (2-bed)' },
  { year: 2030, period: '2029-30', value: 25, display: '~25%', isHard: false, isProjection: true, source: sources.resolution, note: '~£180/mo (2-bed)' },
]

/**
 * Earlier affordability readings used a different basis (£ per week shortfall),
 * so they are shown as context, not plotted on the percentage axis.
 */
export const affordabilityHistorical: Figure[] = [
  {
    id: 'gap-2016',
    value: 12,
    display: '£12/wk',
    label: 'shortfall between LHA and the 30th-percentile rent, April 2016',
    source: sources.resolution,
    asOf: 'Apr 2016',
  },
  {
    id: 'gap-2020',
    value: 28,
    display: '£27–30/wk',
    label: 'shortfall just before the April 2020 re-peg',
    source: sources.resolution,
    asOf: 'Apr 2020',
  },
]

/** The LHA freeze chronology — drives the policy-timeline strip behind Act 4. */
export const lhaTimeline: { year: number; label: string; kind: 'decouple' | 'freeze' | 'repeg' }[] = [
  { year: 2012, label: 'LHA decoupled from rents', kind: 'decouple' },
  { year: 2020, label: 'Re-pegged to 30th percentile', kind: 'repeg' },
  { year: 2021, label: 'Frozen', kind: 'freeze' },
  { year: 2024, label: 'Briefly re-pegged (April)', kind: 'repeg' },
  { year: 2025, label: 'Re-frozen (April)', kind: 'freeze' },
  { year: 2030, label: 'Forecast: frozen to 2029-30', kind: 'freeze' },
]

/** Reform asks for Act 4 — all attributed, none adopted. */
export const preventionAsks: Figure[] = [
  {
    id: 'coalition-40',
    value: 40,
    display: '40 organisations',
    label: 'a coalition calling to restore LHA to at least the 30th percentile from 2026/27 and hold it there',
    source: sources.jointLetter,
    asOf: 'Sep 2025',
  },
  {
    id: 'jrf-700',
    value: 700,
    display: '~£700/yr',
    label: 'how much worse off JRF estimates private renters on housing benefit would be if the freeze holds across this parliament',
    source: sources.jrf,
    asOf: 'Oct 2024',
    note: 'JRF estimates 50,000 people pulled into poverty.',
  },
]

/* ───────────────────────── ACT 5 — Live fight (A6) ─────────────────────────── */

/** The £633m prevention grant and how much of it temporary accommodation eats. */
export const preventionGrant = {
  total: { value: 633, display: '£633m', label: 'homelessness prevention grant' },
  absorbedByTA: {
    value: 322,
    display: '£322m',
    pct: 51,
    label: 'absorbed by temporary accommodation (51%)',
    source: sources.hansardFunding,
  },
  remaining: {
    value: 310,
    display: '~£310m',
    label: 'left for homelessness support',
    source: sources.hansardFunding,
  },
  asOf: '2 Dec 2025',
} as const

export const liveFightFigures: Figure[] = [
  {
    id: 'grant-split',
    value: 51,
    display: '51%',
    label: 'of the £633m prevention grant absorbed by temporary accommodation (£322m), leaving ~£310m for support',
    source: sources.hansardFunding,
    asOf: '2 Dec 2025',
  },
  {
    id: 'funding-1bn',
    value: 1,
    display: '£1bn',
    label: 'homelessness funding in 2025-26; continuation would have meant £3bn over 2026-29',
    source: sources.hansardFunding,
    asOf: '2 Dec 2025',
    note: 'The provisional allocation falls short — questioned in the House as a real-terms cut.',
  },
  {
    id: 'national-plan',
    value: 2025,
    display: 'Dec 2025',
    label: 'National Homelessness Strategy signals a prevention "shift" — but holds nothing for private renters struggling with rent, and LHA stays frozen',
    source: sources.commonsTA,
    asOf: 'Dec 2025',
  },
]
