import { scaleLinear } from 'd3-scale'
import { line, area, curveMonotoneX } from 'd3-shape'
import { subsidyGapSeries } from '@/data/dataset'
import { clamp } from './chartUtils'

/**
 * The centrepiece. Two diverging lines from 2011: what councils actually spend on
 * TA housing benefit (rising) against the reclaimable subsidy, capped at 90% of
 * Jan-2011 LHA and frozen (near-flat). The shaded wedge between them is the cost
 * councils must cover from their own budgets — annotated at the one sourced year
 * (£266m, 2023/24) and across five years (>£700m).
 *
 * Only the 2023/24 endpoints are sourced outturns (shown as solid dots); the
 * connecting trajectory is illustrative of the mechanism, disclosed in the note
 * under the chart.
 */
export function SubsidyGapChart({ width, inView }: { width: number; inView: boolean }) {
  const height = clamp(width * 0.6, 320, 460)
  const compact = width < 560
  const margin = { top: 28, right: compact ? 82 : 132, bottom: 40, left: 48 }

  const innerW = width - margin.left - margin.right
  const innerH = height - margin.top - margin.bottom

  const x = scaleLinear().domain([2011, 2024]).range([margin.left, margin.left + innerW])
  const y = scaleLinear().domain([0, 1.2]).range([margin.top + innerH, margin.top])

  const { spend, reclaim } = subsidyGapSeries
  const combined = spend.map((s, i) => ({ year: s.year, spend: s.value, reclaim: reclaim[i].value }))

  const lineGen = line<{ year: number; value: number }>()
    .x((d) => x(d.year))
    .y((d) => y(d.value))
    .curve(curveMonotoneX)

  const areaGen = area<{ year: number; spend: number; reclaim: number }>()
    .x((d) => x(d.year))
    .y0((d) => y(d.reclaim))
    .y1((d) => y(d.spend))
    .curve(curveMonotoneX)

  const spendPath = lineGen(spend.map((d) => ({ year: d.year, value: d.value }))) ?? ''
  const reclaimPath = lineGen(reclaim.map((d) => ({ year: d.year, value: d.value }))) ?? ''
  const gapPath = areaGen(combined) ?? ''

  const endSpend = spend[spend.length - 1]
  const endReclaim = reclaim[reclaim.length - 1]
  const xEnd = x(endSpend.year)
  const ySpendEnd = y(endSpend.value)
  const yReclaimEnd = y(endReclaim.value)

  const yTicks = [0, 0.25, 0.5, 0.75, 1.0]
  const xTicks = [2011, 2015, 2019, 2024]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label="Line chart, 2011 to 2023/24. Councils' temporary-accommodation housing-benefit spend rises to £1.05bn while the reclaimable subsidy, capped at 90 percent of January 2011 Local Housing Allowance rates, stays far lower at £780m. The widening gap reached £266m in 2023/24 and exceeded £700m over five years."
      className="max-w-full"
    >
      {/* Y gridlines + labels */}
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={margin.left} x2={margin.left + innerW} y1={y(t)} y2={y(t)} stroke="var(--color-line)" strokeWidth={1} />
          {t % 0.5 === 0 && (
            <text x={margin.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-faint text-[11px] tnum">
              {t === 0 ? '£0' : `£${t}bn`}
            </text>
          )}
        </g>
      ))}

      {/* X axis */}
      <line x1={margin.left} x2={margin.left + innerW} y1={y(0)} y2={y(0)} stroke="var(--color-line-strong)" strokeWidth={1} />
      {xTicks.map((t) => (
        <text key={t} x={x(t)} y={y(0) + 18} textAnchor="middle" className="fill-muted text-[11px] tnum">
          {t === 2024 ? '2023/24' : t}
        </text>
      ))}

      {/* The gap wedge */}
      <path d={gapPath} fill="var(--color-spend)" fillOpacity={0.12} className="grow-in"
        style={{ transitionDelay: inView ? '600ms' : undefined }} />

      {/* The two lines */}
      <path d={reclaimPath} fill="none" stroke="var(--color-reclaim)" strokeWidth={2.4} pathLength={1} className="draw-line" />
      <path d={spendPath} fill="none" stroke="var(--color-spend)" strokeWidth={2.8} pathLength={1} className="draw-line" />

      {/* £266m gap bracket at the sourced year */}
      <g className="grow-in" style={{ transitionDelay: inView ? '1300ms' : undefined }}>
        <line x1={xEnd} x2={xEnd} y1={ySpendEnd} y2={yReclaimEnd} stroke="var(--color-ink-soft)" strokeWidth={1} strokeDasharray="3 3" />
        <line x1={xEnd - 4} x2={xEnd + 4} y1={ySpendEnd} y2={ySpendEnd} stroke="var(--color-ink-soft)" strokeWidth={1} />
        <line x1={xEnd - 4} x2={xEnd + 4} y1={yReclaimEnd} y2={yReclaimEnd} stroke="var(--color-ink-soft)" strokeWidth={1} />
      </g>

      {/* Endpoint dots (sourced outturns) */}
      <g className="grow-in" style={{ transitionDelay: inView ? '1300ms' : undefined }}>
        <circle cx={xEnd} cy={ySpendEnd} r={4.5} fill="var(--color-spend)" stroke="var(--color-surface)" strokeWidth={1.5} />
        <circle cx={xEnd} cy={yReclaimEnd} r={4.5} fill="var(--color-reclaim)" stroke="var(--color-surface)" strokeWidth={1.5} />
      </g>

      {/* Endpoint labels */}
      <g className="grow-in" style={{ transitionDelay: inView ? '1450ms' : undefined }}>
        <text x={xEnd + 8} y={ySpendEnd - 2} className={`fill-spend font-semibold tnum ${compact ? 'text-[11px]' : 'text-[12px]'}`}>£1.05bn</text>
        <text x={xEnd + 8} y={ySpendEnd + 11} className="fill-muted text-[9px]">{compact ? 'spent' : 'spent on TA HB'}</text>
        <text x={xEnd + 8} y={yReclaimEnd - 2} className={`fill-reclaim font-semibold tnum ${compact ? 'text-[11px]' : 'text-[12px]'}`}>£780m</text>
        <text x={xEnd + 8} y={yReclaimEnd + 11} className="fill-muted text-[9px]">reclaimed</text>
        {/* Gap callout, mid-bracket */}
        <text x={xEnd + 8} y={(ySpendEnd + yReclaimEnd) / 2 - 1} className={`fill-ink font-bold tnum ${compact ? 'text-[12px]' : 'text-[13px]'}`}>£266m</text>
        <text x={xEnd + 8} y={(ySpendEnd + yReclaimEnd) / 2 + 11} className="fill-ink-soft text-[9px]">{compact ? 'gap' : 'gap, 2023/24'}</text>
      </g>

      {/* Five-year unrecoverable callout, in clear space above the wedge */}
      <text x={x(2018.6)} y={y(1.02)} textAnchor="middle" className="chart-halo fill-ink-soft text-[11px] font-medium grow-in"
        style={{ transitionDelay: inView ? '900ms' : undefined }}>
        &gt;£700m unrecoverable
      </text>
      <text x={x(2018.6)} y={y(1.02) + 13} textAnchor="middle" className="chart-halo fill-muted text-[10px] grow-in"
        style={{ transitionDelay: inView ? '900ms' : undefined }}>
        over five years
      </text>

      {/* Legend */}
      <g transform={`translate(${margin.left}, ${margin.top - 6})`} className="text-[11px]">
        <g>
          <line x1={0} x2={16} y1={0} y2={0} stroke="var(--color-spend)" strokeWidth={2.8} />
          <text x={21} y={0} dy="0.32em" className="fill-ink-soft">What councils spend</text>
        </g>
        <g transform={`translate(${compact ? 0 : 168}, ${compact ? 15 : 0})`}>
          <line x1={0} x2={16} y1={0} y2={0} stroke="var(--color-reclaim)" strokeWidth={2.4} />
          <text x={21} y={0} dy="0.32em" className="fill-ink-soft">Reclaimable (frozen 2011 peg)</text>
        </g>
      </g>
    </svg>
  )
}
