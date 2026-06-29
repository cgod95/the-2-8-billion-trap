import { childrenInTA } from '@/data/dataset'
import { clamp } from './chartUtils'

const PER_DOT = 250
const LONDON_CHILDREN = 85000

/**
 * The human unit. Each mark is 250 children in temporary accommodation; the grid
 * totals the 165,510 recorded in England on 31 Dec 2024. The rust marks are the
 * ~85,000 in London — about half — which makes the "one homeless child per London
 * classroom" framing legible without a word of editorialising.
 */
export function ChildrenGrid({ width, inView }: { width: number; inView: boolean }) {
  const pad = 2
  const cols = clamp(Math.floor((width - pad * 2) / 12), 30, 90)
  const cell = (width - pad * 2) / cols
  const dot = Math.min(cell * 0.66, 8)

  const total = Math.round(childrenInTA.value / PER_DOT) // 662
  const londonDots = Math.round(LONDON_CHILDREN / PER_DOT) // 340
  const rows = Math.ceil(total / cols)
  const gridH = rows * cell
  const legendH = 30
  const height = gridH + legendH + pad * 2

  const dots = Array.from({ length: total }, (_, i) => i)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label="A grid of 662 marks, each representing 250 children. Together they stand for the 165,510 children in temporary accommodation in England on 31 December 2024 — an eighth consecutive record. About 340 of the marks, roughly half, are highlighted to show the around 85,000 children in temporary accommodation in London."
      className="max-w-full"
    >
      {dots.map((i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const cx = pad + col * cell + cell / 2
        const cy = pad + row * cell + cell / 2
        const isLondon = i < londonDots
        return (
          <rect
            key={i}
            x={cx - dot / 2}
            y={cy - dot / 2}
            width={dot}
            height={dot}
            rx={1.5}
            fill={isLondon ? 'var(--color-spend)' : 'var(--color-reclaim)'}
            fillOpacity={isLondon ? 0.92 : 0.5}
            className="grow-in"
            style={{ transitionDelay: inView ? `${Math.min(row * 28, 700)}ms` : undefined }}
          />
        )
      })}

      {/* Legend */}
      <g transform={`translate(${pad}, ${gridH + pad + 20})`} className="text-[11px]">
        <rect x={0} y={-9} width={10} height={10} rx={1.5} fill="var(--color-spend)" fillOpacity={0.92} />
        <text x={16} y={0} className="fill-ink-soft">London · ~85,000 children</text>
        <g transform={`translate(${clamp(width * 0.42, 170, 260)}, 0)`}>
          <rect x={0} y={-9} width={10} height={10} rx={1.5} fill="var(--color-reclaim)" fillOpacity={0.5} />
          <text x={16} y={0} className="fill-ink-soft">Rest of England</text>
        </g>
      </g>
    </svg>
  )
}
