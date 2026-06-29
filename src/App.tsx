import { DataAsOfBanner } from './components/DataAsOfBanner'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Act1Human } from './components/acts/Act1Human'
import { Act2Money } from './components/acts/Act2Money'
import { Act3Mechanism } from './components/acts/Act3Mechanism'
import { Act4Prevention } from './components/acts/Act4Prevention'
import { Act5LiveFight } from './components/acts/Act5LiveFight'
import { Footer } from './components/Footer'

/**
 * "The £2.8 Billion Trap" — a single scroll-driven explanatory data piece.
 * Five acts, four charts, every figure sourced. Neutral throughout: it explains
 * a mechanism; it does not campaign.
 */
export default function App() {
  return (
    <>
      <a
        href="#human"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-invert"
      >
        Skip to the story
      </a>

      <DataAsOfBanner />
      <Header />
      <main>
        <Hero />
        <Act1Human />
        <Act2Money />
        <Act3Mechanism />
        <Act4Prevention />
        <Act5LiveFight />
      </main>
      <Footer />
    </>
  )
}
