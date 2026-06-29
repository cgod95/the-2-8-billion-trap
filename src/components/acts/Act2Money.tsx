import { Act } from '../Act'
import { Figure } from '../Figure'
import { Reveal } from '../Reveal'
import { ChartFrame } from '../ChartFrame'
import { SourceTag } from '../SourceTag'
import { SpendEscalationChart } from '../charts/SpendEscalationChart'
import { headlineSpend, spendSeries } from '@/data/dataset'
import { sources } from '@/data/sources'

export function Act2Money() {
  const [hero, ...rest] = headlineSpend

  return (
    <Act
      id="money"
      number={2}
      kicker="The money"
      title="A £2.84bn bill, rising faster than almost any line in local government"
      standfirst={
        <>
          The gross cost of housing homeless households in England reached a record in 2024/25 — and
          the steepest rises are at the most expensive, lowest-quality end.
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-start">
        <Reveal>
          <Figure figure={hero} size="hero" />
          <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {rest.map((f, i) => (
              <Reveal key={f.id} delay={i * 50}>
                <Figure figure={f} />
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ChartFrame
            title="The bill has nearly tripled since 2018/19 — and the worst-value share keeps growing"
            subtitle="Gross temporary-accommodation spend, England (£bn). The 2024/25 bar is split by accommodation type."
            sources={
              <>
                <SourceTag source={sources.commonsTA} asOf="FY2024/25" />
                <SourceTag source={sources.mhclgRO} asOf="2022/23" compact />
                <SourceTag source={sources.ifg} asOf="2009/10 base" compact />
              </>
            }
            note="2022/23–2024/25 are sourced outturns. 2009/10 and 2018/19 are approximate (hatched, dashed): the 2009/10 base anchors the IfG estimate of a more-than-19× real-terms rise to 2024/25. The split on the 2024/25 bar — ~£1.9bn — sums emergency B&Bs/hostels (£844m) and nightly-paid rooms (£1.08bn) (Shelter / CIH)."
            table={{
              caption: 'Gross temporary-accommodation spend, England, by year',
              head: ['Year', 'Gross TA spend', 'Basis'],
              rows: spendSeries.map((d) => [d.period, d.display ?? '', d.isHard ? 'Outturn' : 'Approximate']),
            }}
          >
            {({ width, inView }) => <SpendEscalationChart width={width} inView={inView} />}
          </ChartFrame>
        </Reveal>
      </div>
    </Act>
  )
}
