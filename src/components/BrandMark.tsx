/**
 * The piece's mark: the widening wedge. Two lines leave a shared origin — real
 * cost climbing away from a frozen, near-flat subsidy — and the gap between them
 * is shaded. It is the central chart compressed into a glyph, and it runs through
 * the favicon and footer. Theme-aware via tokens.
 */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6 16 L27 7.5" stroke="var(--color-spend)" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M6 16 L27 17.5" stroke="var(--color-reclaim)" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M27 7.5 L27 17.5 L6 16 Z" fill="var(--color-spend)" fillOpacity="0.13" />
      <circle cx="6" cy="16" r="2.6" fill="var(--color-ink)" />
    </svg>
  )
}
