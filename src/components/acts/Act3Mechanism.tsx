import { Act } from '../Act'
import { Figure } from '../Figure'
import { Reveal } from '../Reveal'
import { ChartFrame } from '../ChartFrame'
import { SourceTag } from '../SourceTag'
import { AttributionCard } from '../AttributionCard'
import { SubsidyGapChart } from '../charts/SubsidyGapChart'
import { subsidyFigures, subsidyAsk } from '@/data/dataset'
import { sources } from '@/data/sources'

const STEPS: { title: string; body: string }[] = [
  { title: 'A council places a family', body: 'When a household is owed a homelessness duty, the council places it in temporary accommodation and pays the nightly cost up front.' },
  { title: 'It reclaims the cost', body: 'The council recovers most of that cost through housing-benefit subsidy, reimbursed by central government (DWP).' },
  { title: 'But the subsidy is capped at 2011', body: 'The reclaimable amount is capped at 90% of the January 2011 Local Housing Allowance rate — a figure frozen for over a decade while rents and placement costs climbed.' },
  { title: 'A gap opens every year', body: 'As real costs rise and the cap holds, the council cannot recover the difference. In 2023/24 that single-year shortfall was £266m.' },
  { title: 'It compounds', body: 'Over five years, more than £700m has been unrecoverable — money councils must cover from their own budgets, squeezing every other service.' },
]

export function Act3Mechanism() {
  return (
    <Act
      id="mechanism"
      number={3}
      kicker="The mechanism"
      title="A subsidy frozen at January 2011 — the engine of the whole problem"
      standfirst={
        <>
          This is the intellectual core. The cost of temporary accommodation is reimbursed against a
          rate that has not moved since 2011, so the more councils spend, the more they cannot
          reclaim. The gap is not an accident; it is built into the formula.
        </>
      }
    >
      {/* The anatomy, step by step */}
      <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 70} className="bg-surface p-5">
            <span className="font-display text-2xl font-semibold text-accent tnum">{i + 1}</span>
            <h3 className="mt-2 text-sm font-semibold text-ink">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.body}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-12">
        <ChartFrame
          title="What councils can reclaim has barely moved since 2011 — what they spend hasn't"
          subtitle="TA housing-benefit spend vs the reclaimable subsidy, England (£bn), 2011 → 2023/24. The shaded wedge is what councils cannot reclaim."
          sources={<SourceTag source={sources.lga} asOf="2023/24 · Nov 2025" />}
          note="The 2011 peg, the £266m single-year gap and the >£700m five-year total are sourced (LGA). Only the 2023/24 endpoints — £1.05bn spent, £780m reclaimed — are sourced outturns, shown as solid dots. The connecting trajectory illustrates the frozen-peg mechanism; it is not a year-by-year dataset. The reclaimable line rises only with caseload, far slower than real costs."
          table={{
            caption: 'TA housing-benefit subsidy gap, England, 2023/24 (sourced outturn)',
            head: ['Measure', '2023/24'],
            rows: [
              ['TA housing-benefit spend', '£1.05bn'],
              ['Reclaimed from DWP', '£780m'],
              ['Single-year subsidy gap', '£266m'],
              ['Unrecoverable over five years', '>£700m'],
              ['Subsidy peg', '90% of Jan-2011 LHA (frozen)'],
            ],
          }}
        >
          {({ width, inView }) => <SubsidyGapChart width={width} inView={inView} />}
        </ChartFrame>
      </Reveal>

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {subsidyFigures.map((f, i) => (
          <Reveal key={f.id} delay={i * 50}>
            <Figure figure={f} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 max-w-2xl">
        <AttributionCard figure={subsidyAsk} />
      </Reveal>
    </Act>
  )
}
