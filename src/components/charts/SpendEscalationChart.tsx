import { scaleBand, scaleLinear } from 'd3-scale'
import { spendSeries, spendSplit2425 } from '@/data/dataset'
import { clamp, staggerDelay } from './chartUtils'

/**
 * Gross TA spend by year (£bn), England. Recent years are sourced outturns;
 * 2009/10 and 2018/19 are approximate (lighter, dashed). The final 2024/25 bar is
 * split: the solid lower block is the ~£1.85bn that went on the worst-value end —
 * emergency B&Bs/hostels and nightly-paid rooms.
 */
export function SpendEscalationChart({ width, inView }: { width: number; inView: boolean }) {
  const height = clamp(width * 0.6, 300, 420)
  const margin = { top: 34, right: 18, bottom: 44, left: 44 }
  const innerW = width - margin.left - margin.right
  const innerH = height - margin.top - margin.bottom

  const x = scaleBand<string>()
    .domain(spendSeries.map((d) => d.period))
    .range([margin.left, margin.left + innerW])
    .padding(0.34)
  const y = scaleLinear().domain([0, 3]).range([margin.top + innerH, margin.top])
  const bw = x.bandwidth()

  const worst = spendSplit2425.worstValue.value // 1.85

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label="Bar chart of gross temporary-accommodation spend in England by year: 2009/10 about £0.15bn, 2018/19 about £1.1bn, 2022/23 £1.74bn, 2023/24 about £2.3bn, 2024/25 £2.84bn. In 2024/25 roughly £1.9bn of the total went on the worst-value accommodation: emergency B&Bs, hostels and nightly-paid rooms."
      className="max-w-full"
    >
      <defs>
        <pattern id="approx-hatch" width="5" height="5" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="5" height="5" fill="var(--color-spend)" fillOpacity={0.1} />
          <line x1={0} y1={0} x2={0} y2={5} stroke="var(--color-spend)" strokeWidth={1.4} strokeOpacity={0.4} />
        </pattern>
      </defs>

      {/* Y gridlines + labels */}
      {[0, 1, 2, 3].map((t) => (
        <g key={t}>
          <line x1={margin.left} x2={margin.left + innerW} y1={y(t)} y2={y(t)} stroke="var(--color-line)" strokeWidth={1} />
          <text x={margin.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-faint text-[11px] tnum">{t === 0 ? '£0' : `£${t}bn`}</text>
        </g>
      ))}

      {/* Bars */}
      {spendSeries.map((d, i) => {
        const bx = x(d.period) ?? 0
        const isFinal = d.year === 2025
        const approx = d.isHard === false
        return (
          <g key={d.period} className="grow-in" style={{ transitionDelay: staggerDelay(inView, i, 90, 150) }}>
            {isFinal ? (
              <>
                {/* worst-value lower block (solid) */}
                <rect x={bx} y={y(worst)} width={bw} height={y(0) - y(worst)} fill="var(--color-spend)" />
                {/* remainder (tint) */}
                <rect x={bx} y={y(d.value)} width={bw} height={y(worst) - y(d.value)} fill="var(--color-spend)" fillOpacity={0.28} />
              </>
            ) : (
              <rect
                x={bx}
                y={y(d.value)}
                width={bw}
                height={y(0) - y(d.value)}
                fill={approx ? 'url(#approx-hatch)' : 'var(--color-spend)'}
                stroke={approx ? 'var(--color-spend)' : 'none'}
                strokeOpacity={approx ? 0.4 : 0}
                strokeDasharray={approx ? '3 3' : undefined}
              />
            )}
            {/* value label */}
            <text x={bx + bw / 2} y={y(d.value) - 7} textAnchor="middle" className="fill-ink text-[12px] font-semibold tnum">
              {d.display}
            </text>
            {/* period label */}
            <text x={bx + bw / 2} y={y(0) + 18} textAnchor="middle" className="fill-muted text-[11px] tnum">
              {d.period}
            </text>
          </g>
        )
      })}

      {/* Worst-value annotation with leader line to the final bar's lower block */}
      {(() => {
        const finalX = (x('2024/25') ?? 0) + bw / 2
        const segMidY = (y(0) + y(worst)) / 2
        const compact = width < 520
        const labelX = compact ? margin.left + 2 : (x('2018/19') ?? margin.left)
        const labelY = compact ? y(2.92) : y(2.62)
        return (
          <g className="grow-in" style={{ transitionDelay: inView ? '900ms' : undefined }}>
            <path
              d={`M ${labelX + (compact ? 70 : 96)} ${labelY + 6} C ${finalX - 40} ${labelY + 20}, ${finalX - bw / 2 - 6} ${segMidY}, ${(x('2024/25') ?? 0) - 2} ${segMidY}`}
              fill="none" stroke="var(--color-ink-soft)" strokeWidth={1} strokeDasharray="2 3"
            />
            <text x={labelX} y={labelY} className="chart-halo fill-ink text-[12px] font-semibold tnum">~£1.9bn of {compact ? '£2.84bn' : 'the £2.84bn'}</text>
            <text x={labelX} y={labelY + 15} className="chart-halo fill-ink-soft text-[11px]">{compact ? 'on the worst-value end' : 'on B&Bs, hostels & nightly-paid rooms'}</text>
            {!compact && <text x={labelX} y={labelY + 29} className="chart-halo fill-muted text-[10px]">— the worst-value, worst-outcome end</text>}
          </g>
        )
      })()}
    </svg>
  )
}
