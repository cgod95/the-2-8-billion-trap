import { useEffect, useRef, useState } from 'react'
import { DATA } from '@/data/dataset'

/**
 * The standfirst, with a hero rendering of the central motif: real cost climbing
 * away from a frozen subsidy, the wedge between them shaded. It draws itself in
 * on load (static under reduced motion) and previews the chart at the heart of
 * the piece.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [drawn, setDrawn] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">
          <span>A data investigation</span>
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          <span>England · temporary accommodation</span>
        </p>

        <h1 className="font-display mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-7xl">
          The <span className="text-accent tnum">£2.8&nbsp;billion</span> trap
        </h1>

        <p className="mt-7 max-w-2xl text-xl leading-relaxed text-ink-soft">
          England spends record, fast-rising sums housing homeless families in the <em>worst</em> kind
          of accommodation — emergency B&amp;Bs and nightly-paid rooms — partly because a subsidy frozen
          at 2011 levels makes prevention all but impossible.
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          The money exists. It flows to the most expensive, worst-outcome end. This is the mechanism,
          in five charts — every figure sourced, nothing campaigned.
        </p>

        {/* Hero motif: the widening wedge */}
        <div ref={ref} className={`mt-12 ${drawn ? 'is-drawn' : ''}`}>
          <HeroWedge />
        </div>

        <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span>Data as of {DATA.asOf}</span>
          <span className="h-1 w-1 rounded-full bg-line-strong" aria-hidden="true" />
          <span>5 charts</span>
          <span className="h-1 w-1 rounded-full bg-line-strong" aria-hidden="true" />
          <span>~8 min read</span>
        </p>

        <a href="#human" className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent">
          Start with the human scale
          <span className="transition-transform group-hover:translate-y-0.5" aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}

/** A larger, self-contained version of the brand wedge for the hero. */
function HeroWedge() {
  const w = 880
  const h = 260
  // origin → two divergent endpoints
  const ox = 64
  const oy = 150
  const spendEnd = { x: 600, y: 46 }
  const reclaimEnd = { x: 600, y: 132 }
  const spendPath = `M ${ox} ${oy} C 260 140, 430 88, ${spendEnd.x} ${spendEnd.y}`
  const reclaimPath = `M ${ox} ${oy} C 260 152, 430 142, ${reclaimEnd.x} ${reclaimEnd.y}`
  const wedge = `${spendPath} L ${reclaimEnd.x} ${reclaimEnd.y} C 430 142, 260 152, ${ox} ${oy} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-3xl" role="img"
      aria-label="An illustration of the central mechanism: from a shared origin, the line for real cost rises steeply while the line for the frozen subsidy stays low, opening a widening shaded gap between them.">
      <path d={wedge} fill="var(--color-spend)" fillOpacity={0.1} className="grow-in" style={{ transitionDelay: '700ms' }} />
      <path d={reclaimPath} fill="none" stroke="var(--color-reclaim)" strokeWidth={2.4} pathLength={1} className="draw-line" />
      <path d={spendPath} fill="none" stroke="var(--color-spend)" strokeWidth={3} pathLength={1} className="draw-line" />
      <circle cx={ox} cy={oy} r={4} fill="var(--color-ink)" />
      <circle cx={spendEnd.x} cy={spendEnd.y} r={4.5} fill="var(--color-spend)" />
      <circle cx={reclaimEnd.x} cy={reclaimEnd.y} r={4.5} fill="var(--color-reclaim)" />
      <text x={spendEnd.x + 12} y={spendEnd.y + 4} className="fill-spend text-[13px] font-semibold">Real cost of housing families</text>
      <text x={reclaimEnd.x + 12} y={reclaimEnd.y + 4} className="fill-reclaim text-[13px] font-semibold">Subsidy, frozen at 2011</text>
      <text x={340} y={112} textAnchor="middle" className="chart-halo-paper fill-ink-soft text-[12px] font-medium">the gap councils must cover</text>
    </svg>
  )
}
