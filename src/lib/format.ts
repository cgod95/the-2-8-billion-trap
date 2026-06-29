/** Formatting helpers for axis ticks and labels. Display strings on figures are
 *  always preferred over these — these only fill axes and generated labels. */

/** £bn with one decimal where needed, e.g. 2.84 → "£2.84bn", 1 → "£1bn". */
export function poundsBn(value: number): string {
  const rounded = Math.round(value * 100) / 100
  return `£${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(rounded * 10 % 1 === 0 ? 1 : 2)}bn`
}

/** Whole-thousands with separators, e.g. 165510 → "165,510". */
export function thousands(value: number): string {
  return value.toLocaleString('en-GB')
}

/** Percent, e.g. 14 → "14%". */
export function percent(value: number): string {
  return `${value}%`
}
