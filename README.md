# The £2.8 Billion Trap

A single-page, scroll-driven data piece explaining England's temporary-accommodation
(TA) crisis — and the frozen 2011 subsidy at the centre of it. It is a portfolio /
credentialing piece in the register of ONS, the FT and Our World in Data: serious,
rigorously sourced, and strictly neutral. **It explains a mechanism; it does not
campaign.** A sister piece to [Factcheque](https://factcheque.com/).

Live (dev): `npm run dev` → http://localhost:5175

---

## The thesis

> England spends record, fast-rising sums housing homeless families in the *worst* kind
> of accommodation — emergency B&Bs and nightly-paid rooms — partly because a subsidy
> frozen at 2011 levels makes prevention all but impossible. The money exists; it flows
> to the most expensive, worst-outcome end.

Everything on the page serves that one sentence, in five scroll acts:

1. **Human scale** — 165,510 children in TA (an eighth consecutive record), made tangible.
2. **The money** — the £2.84bn bill, and the share spent on the worst-value accommodation.
3. **The mechanism** *(intellectual core)* — the subsidy capped at 90% of Jan-2011 LHA, and the gap it opens.
4. **Prevention** — the same frozen-rate logic upstream, via Local Housing Allowance.
5. **Live fight** — the prevention grant eaten by TA, and the funding question, closed neutrally.

## Neutrality rules (non-negotiable)

1. **Every on-screen figure restates a named source's published finding**, linked at the
   point of use via `<SourceTag>`. If a number can't carry its source, it isn't shown.
2. **Reform asks are attributed, never asserted.** "Unfreeze LHA / the subsidy" is always
   rendered as a named body's position (e.g. *"a coalition of 40 organisations has called
   for…"*) in an explicit `<AttributionCard>` — never in the site's own voice.
3. **Official statistics are visually distinguished from advocacy analysis.** Four source
   tiers drive the badge colour: `official` (MHCLG, Commons Library), `parliament`
   (Hansard), `analysis` (IfG, Resolution Foundation), `advocacy` (Shelter, LGA, JRF, CIH,
   London Councils).
4. **Date-stamped.** A site-wide "Data as of…" banner is driven by one `DATA` constant;
   forecasts are labelled as forecasts.
5. **No emotional manipulation.** No stock imagery, restrained throughout. The numbers carry it.

## Tech

- **Vite + React 19 + TypeScript + Tailwind v4** (`@tailwindcss/vite`).
- **D3** (`d3-scale`, `d3-shape`, `d3-array`) for chart maths; React owns the DOM and
  renders the SVG (axes, ticks and annotations are JSX), which keeps charts accessible.
- **Scrollytelling** via the native `IntersectionObserver` (`Reveal`, `useInView`) — no
  scroll library dependency. Charts draw themselves in on entry; all motion respects
  `prefers-reduced-motion`.
- Light/dark via a class on `<html>` over CSS-variable tokens — every component flips
  automatically (no `dark:` utilities).
- No backend. All data lives in typed local modules.

```
src/
  data/
    types.ts        # Figure / SeriesPoint / Source — every value carries its source
    sources.ts      # the source registry; tiers assigned once, here
    dataset.ts      # the verified dataset (Part A), grouped by act + the DATA banner constant
  lib/
    meta.ts         # source-tier → Tailwind class lookups
    hooks.ts        # useMeasure (responsive width) + useInView (chart draw trigger)
    format.ts       # axis/label formatters
  components/
    SourceTag.tsx   # the one component every sourced figure passes through
    Figure.tsx      # a stat block (value + label + SourceTag)
    AttributionCard.tsx  # reform asks, marked "attributed, not endorsed"
    ChartFrame.tsx  # titled, sourced card; owns measurement + the data-table fallback
    Act.tsx, Hero.tsx, Header.tsx, Footer.tsx, DataAsOfBanner.tsx, Reveal.tsx, ThemeToggle.tsx
    charts/         # SubsidyGapChart, SpendEscalationChart, ChildrenGrid,
                    # AffordabilityGapChart, PreventionGrantBar
    acts/           # Act1Human … Act5LiveFight — composition only
```

## Accessibility

- Every chart SVG is `role="img"` with a full-sentence `aria-label`, and every `ChartFrame`
  ships a collapsed **"Show the data"** table — a text equivalent for screen-reader and
  keyboard users (and anyone who wants the raw numbers).
- Skip link, visible focus rings, AA-contrast tokens, a "Data as of" landmark, and active
  section tracking in the nav.
- Projections render as dashed/lighter segments with an explicit on-chart legend; the one
  illustrative trend (the subsidy-gap connector) is disclosed in the chart note.

## Design influences & chart principles

The piece is built to the standard of the best explanatory data journalism in this
genre. The principles below are drawn from how those teams work, and each is applied
(or deliberately declined) here.

- **Lead with the finding, not a label** *(Financial Times / John Burn-Murdoch)*. His
  testing showed minimalist charts perform *worst*: readers prefer and remember charts
  with a narrative title and well-placed annotations. So every chart title is an active
  sentence stating the takeaway (e.g. "What councils can reclaim has barely moved since
  2011 — what they spend hasn't"), with the descriptive "what's plotted, units, scope"
  line demoted to the subtitle.
- **Annotation-led, directly labelled** *(Datawrapper / Lisa Charlotte Muth)*. Lines are
  labelled at their ends in their own colour rather than via a distant legend; units are
  repeated; needless decimals are dropped (`£0`, not `£0bn`); and a theme-aware text halo
  (`.chart-halo`, via `paint-order`) keeps annotations legible where they cross a line or
  shaded area. Two type levels only: a bold title, quieter everything-else.
- **Self-contained and reusable** *(Our World in Data)*. Every chart carries its title,
  source and a **download** — a text-equivalent data table *and* a one-click CSV of the
  exact figures. Transparency is the point, not a footnote.
- **Restraint over spectacle** *(NYT Upshot, Reuters, The Pudding)*. Tone matches subject.
  This is a homelessness and public-finance story, so it stays static, dignified and
  annotation-driven rather than reaching for hover-scrubbing or animation for its own sake
  — a deliberate choice, not a limitation. Charts draw in once on entry and then sit still.

What was **declined**: heavy interactivity (hover tooltips, scrubbing). The strongest work
in this register (FT static explainers, OWID) shows it is optional; static-but-richly-
annotated is also accessible by default and pairs with the CSV/table for anyone who wants
the exact numbers.

Sources: [GIJN on Burn-Murdoch](https://gijn.org/stories/data-visualization-storytelling-tips-john-burn-murdoch/) ·
[Datawrapper: text in data viz](https://www.datawrapper.de/blog/text-in-data-visualizations) ·
[Our World in Data: redesign](https://ourworldindata.org/redesigning-our-interactive-data-visualizations).

## A note on the subsidy-gap chart (honesty)

The centrepiece (Act 3) shows two diverging lines from 2011. The published data gives a
single hard year for both: **2023/24 — £1.05bn spent vs £780m reclaimed, a £266m gap**
(LGA). Those endpoints are the only sourced outturns and are drawn as solid dots; the
connecting trajectory is **illustrative of the frozen-peg mechanism, not a year-by-year
dataset**, and says so in the chart note. The annotated figures (£266m, >£700m, the 2011
peg) are all sourced. If exact intermediate years are later pulled from the MHCLG RO
tables, replace the `isHard: false` points in `subsidyGapSeries` and delete the disclaimer.

---

## Data provenance & sources

Data is England, **FY2024/25** (published Sep–Dec 2025) plus time series back to 2009/10.
The single source of truth is `src/data/dataset.ts`; the `DATA` constant drives the
"Data as of" banner. Full source list, by tier:

**Official statistics / impartial parliamentary research**
- Commons Library CBP-10421 (TA) — https://commonslibrary.parliament.uk/research-briefings/cbp-10421/
- Commons Library SN04957 (LHA) — https://commonslibrary.parliament.uk/research-briefings/sn04957/
- MHCLG revenue expenditure (raw spend tables) — https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing
- MHCLG statutory homelessness live tables (TA1) — https://www.gov.uk/government/statistical-data-sets/live-tables-on-homelessness

**Parliamentary record**
- Hansard, Homelessness Funding debate, 2 Dec 2025 — https://hansard.parliament.uk/commons/2025-12-02/debates/6FE137BA-4830-4279-80DE-49AAFFB494FE/HomelessnessFunding

**Independent analysis**
- Institute for Government, Performance Tracker 2025 — https://www.instituteforgovernment.org.uk/publication/performance-tracker-2025/local-services/homelessness
- Resolution Foundation (affordability gap) — https://www.resolutionfoundation.org/press-releases/affordability-gap-between-local-housing-allowance-and-local-rents-set-to-reach-record-level-next-year/

**Advocacy analysis (positions are attributed, never adopted)**
- Shelter, £2.8bn release — https://england.shelter.org.uk/media/press_release/bill_for_homeless_accommodation_soars_by_25_hitting_28_bn_
- Shelter, children-in-TA record — https://england.shelter.org.uk/media/press_release/eighth_record_in_a_row_of_children_in_temporary_accommodation_as_one_in_three_homeless_households_placed_out_of_area_
- CIH response — https://www.cih.org/news/cih-responds-to-the-latest-local-authority-expenditure-statistics-on-homelessness-and-temporary-accommodation/
- LGA, TA funding black hole — https://www.local.gov.uk/about/news/new-lga-analysis-ps3bn-temporary-accommodation-funding-black-hole
- JRF, stop the freeze — https://www.jrf.org.uk/housing/stop-the-freeze-permanently-re-link-housing-benefits-to-private-rents
- London Councils — https://www.londoncouncils.gov.uk/

### Verification log (last checked: June 2026)

All headline figures re-checked against sources. Confirmed exactly unless noted:

| Figure | Status |
|---|---|
| £2.84bn gross / £1.43bn net 2024/25; +25% YoY | ✅ confirmed (Commons Library / MHCLG via Inside Housing, LGC) |
| £844m B&Bs/hostels (32%); nightly-paid +79%; +118%/5yr | ✅ confirmed (Shelter) |
| Nightly-paid spend | 🔁 refined to **£1.08bn** (Shelter's precise £1.078bn; Part A had ">£1bn"). Worst-value split updated to ~£1.9bn. |
| Subsidy: £1.05bn spend, £780m reimbursed, £266m gap, 90% of Jan-2011 LHA, >£700m/5yr | ✅ confirmed exactly (LGA) |
| Affordability gap: 14% → 17% → 25%; £104/£180/mo; ~2m families; frozen since Apr 2024 | ✅ confirmed (Resolution Foundation); added 2026 ≈ £120/mo |

Notes for next refresh:
- The Resolution Foundation's Oct 2025 release cites **~132,000 households in TA** (a later
  record) vs the **127,890** point-in-time count for 31 Dec 2024 used here — a date
  difference, not a discrepancy. Update `householdsSeries` when the next MHCLG TA1 release lands.
- `commonslibrary.parliament.uk` and `local.gov.uk` block automated fetchers (HTTP 403);
  verify those two by hand in a browser.
- Changed values are flagged in `dataset.ts` with `// REVIEW:` comments.

## Refreshing the data (when MHCLG publishes the next outturn)

1. Pull the new gross/net TA spend from the **MHCLG revenue expenditure** tables and the new
   TA1 household/children counts from the **homelessness live tables**.
2. Update the relevant records in `src/data/dataset.ts`. Each figure already carries its
   `source`, `asOf` and (where relevant) `isProjection` — keep those accurate.
3. Bump `DATA.asOf`, `DATA.published` and `DATA.verified` (and `DATA.status` if the policy
   position has moved). The banner and footer update automatically.
4. Re-fetch every URL above, confirm each figure, and mark anything that changed with a
   `// REVIEW:` comment.
5. Re-label any value that has shifted from forecast to outturn (set `isProjection: false`).

## Scripts

```bash
npm run dev        # start the dev server (port 5175)
npm run build      # tsc --noEmit && vite build
npm run preview    # preview the production build
npm run typecheck  # tsc --noEmit
```

## Deployment

Static SPA, portable `base: './'`. `netlify.toml` is included (`npm run build` → `dist`).
Deploys as-is to Netlify, Vercel, GitHub Pages or any static host.

---

*A neutral, public-record data piece. Not affiliated with any organisation cited.*
