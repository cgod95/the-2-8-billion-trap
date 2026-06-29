import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface ActProps {
  /** Anchor id for the progress rail, e.g. "money". */
  id: string
  /** Act number, 1–5. */
  number: number
  /** Short kicker above the title, e.g. "The mechanism". */
  kicker: string
  /** The act's headline. */
  title: string
  /** Neutral standfirst — one or two sentences setting up the act. */
  standfirst: ReactNode
  children: ReactNode
}

/**
 * One scroll act. A consistent header (act number · kicker · serif title ·
 * standfirst) followed by the act's content. Sections carry an id so the sticky
 * progress rail can track and jump between them.
 */
export function Act({ id, number, kicker, title, standfirst, children }: ActProps) {
  return (
    <section id={id} className="anchor-offset border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">
            <span className="tnum text-accent">{String(number).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span>{kicker}</span>
          </div>
          <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl">
            {title}
          </h2>
          <div className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{standfirst}</div>
        </Reveal>

        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
