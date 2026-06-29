import { Act } from '../Act'
import { Figure } from '../Figure'
import { Reveal } from '../Reveal'
import { ChartFrame } from '../ChartFrame'
import { SourceTag } from '../SourceTag'
import { AttributionCard } from '../AttributionCard'
import { AffordabilityGapChart } from '../charts/AffordabilityGapChart'
import { lhaFreezeFigures, affordabilitySeries, affordabilityHistorical, preventionAsks } from '@/data/dataset'
import { sources } from '@/data/sources'

export function Act4Prevention() {
  return (
    <Act
      id="prevention"
      number={4}
      kicker="Prevention"
      title="The same frozen-rate logic, one step upstream"
      standfirst={
        <>
          A near-identical mechanism drives homelessness in the first place. Local Housing Allowance —
          the housing benefit for private renters — was decoupled from rents in 2012 and has mostly
          been frozen since, so the gap between benefit and rent widens toward a record.
        </>
      }
    >
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
        {lhaFreezeFigures.map((f, i) => (
          <Reveal key={f.id} delay={i * 60}>
            <Figure figure={f} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <ChartFrame
          title="Housing benefit is falling further behind rents — and the forecast is a record"
          subtitle="LHA shortfall against the 30th-percentile rent (%). 2026 and 2029-30 are forecasts (dashed, shaded)."
          sources={
            <>
              <SourceTag source={sources.resolution} asOf="Oct 2025" isProjection />
              <SourceTag source={sources.commonsLHA} asOf="2025" compact />
            </>
          }
          note="The percentage gap is the metric the Resolution Foundation reports from 2025; 2026 (~17%) and 2029-30 (~25%, ~£180/mo for a 2-bed) are forecasts. Earlier readings used a £-per-week basis and so are shown separately below, not plotted on this axis. The rail beneath tracks the freeze: re-pegged to the 30th percentile only in 2020 and briefly in April 2024."
          table={{
            caption: 'Affordability gap between LHA and the 30th-percentile rent',
            head: ['Year', 'Gap', 'Basis'],
            rows: [
              ...affordabilitySeries.map((d) => [d.period, d.display ?? '', d.isProjection ? 'Forecast' : 'Outturn'] as (string | number)[]),
              ['April 2016', '£12/wk', 'Earlier (£/week basis)'],
              ['April 2020', '£27–30/wk', 'Earlier (£/week basis)'],
            ],
          }}
        >
          {({ width, inView }) => <AffordabilityGapChart width={width} inView={inView} />}
        </ChartFrame>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Earlier readings (£/week basis)</h3>
          <p className="mt-2 max-w-md text-sm text-ink-soft">
            Before the percentage framing, the same gap was reported as a weekly cash shortfall — already
            widening sharply by the 2020 re-peg.
          </p>
          <div className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {affordabilityHistorical.map((f) => (
              <Figure key={f.id} figure={f} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={80} className="space-y-5">
          {preventionAsks.map((f) => (
            <AttributionCard key={f.id} figure={f} />
          ))}
        </Reveal>
      </div>
    </Act>
  )
}
