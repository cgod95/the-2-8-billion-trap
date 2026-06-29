import { useEffect, useState } from 'react'
import { BrandMark } from './BrandMark'
import { ThemeToggle } from './ThemeToggle'

const SECTIONS = [
  { id: 'human', label: 'Human scale' },
  { id: 'money', label: 'The money' },
  { id: 'mechanism', label: 'The mechanism' },
  { id: 'prevention', label: 'Prevention' },
  { id: 'fight', label: 'Live fight' },
] as const

/** Track which act is currently in view, to highlight it in the nav. */
function useActiveSection(): string {
  const [active, setActive] = useState<string>('human')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

/** Sticky top bar: the mark, the act nav with an active-section highlight, and
 *  the theme toggle. Collapses to mark + toggle on small screens. */
export function Header() {
  const active = useActiveSection()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <BrandMark className="h-6 w-6" />
          <span className="font-display text-sm font-semibold tracking-tight text-ink">
            The <span className="tnum">£2.8</span> Billion Trap
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active === s.id ? 'bg-accent-soft text-accent-ink' : 'text-muted hover:text-ink'
              }`}
            >
              <span className="tnum text-faint">{i + 1}</span> <span className="ml-1">{s.label}</span>
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  )
}
