/** Shared chart helpers — margins, clamping, and the in-view stagger delay. */

export interface Margin {
  top: number
  right: number
  bottom: number
  left: number
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * A transition delay (ms) for staggered `.grow-in` elements, only applied once
 * the chart is in view. Returns undefined when not in view so nothing animates
 * prematurely.
 */
export function staggerDelay(inView: boolean, index: number, step = 60, base = 200): string | undefined {
  if (!inView) return undefined
  return `${base + index * step}ms`
}
