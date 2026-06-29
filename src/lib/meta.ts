import type { SourceTier } from '@/data/types'

/**
 * Static class-name lookups for the four source tiers.
 *
 * Written as literal strings (never interpolated) so Tailwind's scanner can see
 * them and generate the utilities. Colours come from the `@theme` tokens in
 * index.css. The whole point of the tier system is the editorial rule: the
 * reader must be able to tell official statistics from advocacy analysis.
 */
export interface TierMeta {
  label: string
  description: string
  dot: string
  chip: string
  text: string
}

export const tierMeta: Record<SourceTier, TierMeta> = {
  official: {
    label: 'Official statistics',
    description: 'Government statistics or impartial parliamentary research',
    dot: 'bg-tier-official',
    chip: 'bg-tier-official/10 text-tier-official border-tier-official/25',
    text: 'text-tier-official',
  },
  parliament: {
    label: 'Parliamentary record',
    description: 'Hansard — a named member on the record in a debate',
    dot: 'bg-tier-parliament',
    chip: 'bg-tier-parliament/10 text-tier-parliament border-tier-parliament/25',
    text: 'text-tier-parliament',
  },
  analysis: {
    label: 'Independent analysis',
    description: 'Independent research / think-tank analysis',
    dot: 'bg-tier-analysis',
    chip: 'bg-tier-analysis/10 text-tier-analysis border-tier-analysis/25',
    text: 'text-tier-analysis',
  },
  advocacy: {
    label: 'Advocacy analysis',
    description: 'A sector or campaign body with a stated position (asks are attributed)',
    dot: 'bg-tier-advocacy',
    chip: 'bg-tier-advocacy/10 text-tier-advocacy border-tier-advocacy/30',
    text: 'text-tier-advocacy',
  },
}

export const tierOrder: SourceTier[] = ['official', 'parliament', 'analysis', 'advocacy']
