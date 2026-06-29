import { scaleLinear } from 'd3-scale'
import { line, curveMonotoneX } from 'd3-shape'
import { affordabilitySeries } from '@/data/dataset'
import { clamp } from './chartUtils'

/**
 * The affordability gap: LHA's shortfall against the 30th-percentile rent, as a
 * percentage, rising to a record. 2025 is an outturn; 2026 and 2029-30 are
 * forecasts, drawn dashed inside a shaded forecast band. Beneath runs the freeze
 * chronology — the long policy cause behind the rising gap above it.
 */
export function AffordabilityGapChart({ width, inView }: { width: number; inView: boolean }) {
  const height = clamp(width * 0.62, 330, 450)
  const compact = width < 560
  const margin = { top: 30, right: compact ? 64 : 118, bottom: 52, left: 42 }

  const xAxisY = height - margin.bottom
  const railH = 22
  const railY = xAxisY - railH - 12
  const gapBottom = railY - 16
  const gapTop = margin.top

  const x = scaleLinear().domain([2012, 2030]).range([margin.left, width - margin.right])
  const yPct = scaleLinear().domain([0, 28]).range([gapBottom, gapTop])

  const pts = affordabilitySeries.map((d) => ({ year: d.year, value: d.value }))
  const lineGen = line<{ year: number; value: number }>().x((d) => x(d.year)).y((d) => yPct(d.value)).curve(curveMonotoneX)
  const gapPath = lineGen(pts) ?? ''

  const xTicks = [2012, 2016, 2020, 2024, 2028]
  const forecastX0 = x(2025)

  // Freeze chronology: bands between resets, plus the two re-peg ticks.
  const freezeBands: [number, number, boolean][] = [
    [2012, 2020, false],
    [2020, 2024, false],
    [2024, 2030, true], // forecast tail (re-frozen 2025, frozen to 2029-30)
  ]
  const repegs: [number, string][] = [
    [2020, 'Re-pegged'],
    [2024, 'Re-pegged (Apr)'],
  ]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label="A chart showing Local Housing Allowance's shortfall against the 30th-percentile rent rising from 14 percent in 2025 to a forecast 17 percent in 2026 and around 25 percent by 2029-30 — about £180 a month for a two-bed. Below runs the freeze timeline: LHA decoupled from rents in 2012 and has mostly been frozen since, re-pegged only in 2020 and briefly in April 2024, with forecasts assuming it stays frozen to 2029-30."
      className="max-w-full"
    >
      <defs>
        <pattern id="freeze-forecast" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="var(--color-forecast)" fillOpacity={0.18} />
          <line x1={0} y1={0} x2={0} y2={6} stroke="var(--color-forecast)" strokeWidth={1.4} strokeOpacity={0.5} />
        </pattern>
      </defs>

      {/* Forecast band behind the gap line */}
      <rect x={forecastX0} y={gapTop} width={width - margin.right - forecastX0} height={gapBottom - gapTop}
        fill="var(--color-forecast)" fillOpacity={0.08} className="grow-in"
        style={{ transitionDelay: inView ? '300ms' : undefined }} />
      <line x1={forecastX0} x2={forecastX0} y1={gapTop} y2={gapBottom} stroke="var(--color-forecast)" strokeWidth={1} strokeDasharray="3 3" />
      <text x={forecastX0 + 5} y={gapTop + 11} className="chart-halo fill-muted text-[10px]">Forecast →</text>

      {/* % gridlines */}
      {[0, 10, 20].map((t) => (
        <g key={t}>
          <line x1={margin.left} x2={width - margin.right} y1={yPct(t)} y2={yPct(t)} stroke="var(--color-line)" strokeWidth={1} />
          <text x={margin.left - 7} y={yPct(t)} dy="0.32em" textAnchor="end" className="fill-faint text-[11px] tnum">{t}%</text>
        </g>
      ))}

      {/* Gap line (mostly forecast → dashed) */}
      <path d={gapPath} fill="none" stroke="var(--color-accent)" strokeWidth={2.6} strokeDasharray="6 4" pathLength={1} className="draw-line" />

      {/* Gap markers + labels */}
      {affordabilitySeries.map((d, i) => (
        <g key={d.year} className="grow-in" style={{ transitionDelay: inView ? `${900 + i * 180}ms` : undefined }}>
          <circle cx={x(d.year)} cy={yPct(d.value)} r={d.isProjection ? 4 : 5}
            fill={d.isProjection ? 'var(--color-paper)' : 'var(--color-accent)'}
            stroke="var(--color-accent)" strokeWidth={2} />
          <text x={x(d.year)} y={yPct(d.value) - 11} textAnchor="middle" className="chart-halo fill-ink text-[12px] font-semibold tnum">{d.display}</text>
        </g>
      ))}
      {/* Endpoint £/mo annotations (sourced) */}
      <text x={x(2030) + 7} y={yPct(25) + 1} className="chart-halo fill-accent text-[11px] font-semibold tnum grow-in"
        style={{ transitionDelay: inView ? '1300ms' : undefined }}>~£180/mo</text>
      <text x={x(2030) + 7} y={yPct(25) + 14} className="chart-halo fill-muted text-[10px] grow-in"
        style={{ transitionDelay: inView ? '1300ms' : undefined }}>2-bed, 2029-30</text>
      <text x={x(2025) - 4} y={yPct(14) + 22} textAnchor="middle" className="chart-halo fill-muted text-[10px] tnum grow-in"
        style={{ transitionDelay: inView ? '1100ms' : undefined }}>~£104/mo</text>

      {/* Freeze chronology rail */}
      <text x={margin.left} y={railY - 5} className="fill-muted text-[10px] font-medium uppercase tracking-wide">LHA freeze chronology</text>
      {freezeBands.map(([a, b, forecast], i) => (
        <rect key={i} x={x(a)} y={railY} width={x(b) - x(a)} height={railH}
          fill={forecast ? 'url(#freeze-forecast)' : 'var(--color-reclaim)'} fillOpacity={forecast ? 1 : 0.16}
          stroke="var(--color-line-strong)" strokeWidth={0.75} />
      ))}
      {/* "Decoupled 2012" marker at left edge of the rail */}
      <text x={x(2012) + 4} y={railY + railH / 2} dy="0.32em" className="chart-halo fill-ink-soft text-[10px]">Decoupled from rents, 2012</text>
      {repegs.map(([yr, label]) => (
        <g key={yr}>
          <line x1={x(yr)} x2={x(yr)} y1={railY - 3} y2={railY + railH + 3} stroke="var(--color-tier-analysis)" strokeWidth={1.6} />
          {!compact && (
            <text x={x(yr)} y={railY + railH + 13} textAnchor="middle" className="fill-tier-analysis text-[9px]">{label}</text>
          )}
        </g>
      ))}

      {/* X axis */}
      <line x1={margin.left} x2={width - margin.right} y1={xAxisY} y2={xAxisY} stroke="var(--color-line-strong)" strokeWidth={1} />
      {xTicks.map((t) => (
        <text key={t} x={x(t)} y={xAxisY + 16} textAnchor="middle" className="fill-muted text-[11px] tnum">{t}</text>
      ))}
    </svg>
  )
}
