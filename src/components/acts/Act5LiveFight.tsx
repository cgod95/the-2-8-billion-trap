import { Act } from '../Act'
import { Figure } from '../Figure'
import { Reveal } from '../Reveal'
import { PreventionGrantBar } from '../charts/PreventionGrantBar'
import { liveFightFigures } from '@/data/dataset'

export function Act5LiveFight() {
  return (
    <Act
      id="fight"
      number={5}
      kicker="Live fight"
      title="The grant meant for prevention, eaten by the crisis it was meant to prevent"
      standfirst={
        <>
          The policy is live and contested. In the Commons in December 2025, the numbers showed the
          prevention budget being consumed by the very temporary-accommodation costs the frozen
          subsidy creates — while the funding settlement was questioned as a real-terms cut.
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
        <Reveal>
          <PreventionGrantBar />
        </Reveal>

        <Reveal delay={80} className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-1">
          {liveFightFigures.map((f) => (
            <Figure key={f.id} figure={f} />
          ))}
        </Reveal>
      </div>

      {/* Neutral close — restating only what the figures have proven. */}
      <Reveal className="mt-16 border-t border-line pt-12">
        <div className="mx-auto max-w-2xl">
          <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
            England is not short of money for homelessness. It spends a record £2.84bn a year — but a
            subsidy frozen at 2011 rates channels that money to the most expensive, worst-outcome
            accommodation, and the same frozen-rate logic, applied upstream, keeps the queue growing.
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Every figure on this page restates a published finding from a named source. The reform asks
            — to unfreeze the subsidy and Local Housing Allowance — belong to the bodies that made them,
            and are presented as theirs. The mechanism does not require a position to be visible.
          </p>
        </div>
      </Reveal>
    </Act>
  )
}
