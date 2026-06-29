import { Act } from '../Act'
import { Figure } from '../Figure'
import { Reveal } from '../Reveal'
import { ChartFrame } from '../ChartFrame'
import { SourceTag } from '../SourceTag'
import { ChildrenGrid } from '../charts/ChildrenGrid'
import { childrenInTA, humanScaleFigures } from '@/data/dataset'
import { sources } from '@/data/sources'

export function Act1Human() {
  return (
    <Act
      id="human"
      number={1}
      kicker="Human scale"
      title="A record number of children, counted on a single night"
      standfirst={
        <>
          Temporary accommodation is counted as a snapshot, not a running total — these are the
          children in it on one date. The figure has set a record eight quarters in a row.
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
        <Reveal>
          <Figure figure={childrenInTA} size="hero" />
        </Reveal>

        <Reveal delay={80}>
          <ChartFrame
            title="A record 165,510 children — and about half are in London"
            subtitle="Each mark = 250 children in temporary accommodation, England, 31 Dec 2024"
            sources={
              <>
                <SourceTag source={sources.shelterChildren} asOf="31 Dec 2024" />
                <SourceTag source={sources.londonCouncils} asOf="2025" compact />
              </>
            }
            note="The rust marks are the ~85,000 children in temporary accommodation in London (London Councils, 2025) — about one homeless child for every London classroom. The England total is the 31 Dec 2024 count; the London figure is a separate, slightly later estimate."
            table={{
              caption: 'Children and households in temporary accommodation, England, point-in-time counts',
              head: ['Date', 'Children in TA', 'Households in TA'],
              rows: [
                ['Q2 2010', '—', '51,310'],
                ['30 Jun 2022', '120,710', '~99,000'],
                ['30 Sep 2023', '142,490', '109,000'],
                ['31 Dec 2024', '165,510 (record)', '127,890 (record)'],
                ['Jun 2025', '172,420', '—'],
              ],
            }}
          >
            {({ width, inView }) => <ChildrenGrid width={width} inView={inView} />}
          </ChartFrame>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {humanScaleFigures.map((f, i) => (
          <Reveal key={f.id} delay={i * 60}>
            <Figure figure={f} />
          </Reveal>
        ))}
      </div>
    </Act>
  )
}
