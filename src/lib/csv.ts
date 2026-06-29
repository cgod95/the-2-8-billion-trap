/**
 * CSV export for charts. Every chart can hand the reader the exact numbers behind
 * it — the Our World in Data standard: a chart should be self-contained and
 * reusable, not just looked at. Pairs with the on-screen data table.
 */

function escapeCell(value: string | number): string {
  const s = String(value)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function toCsv(head: string[], rows: (string | number)[][]): string {
  return [head, ...rows].map((row) => row.map(escapeCell).join(',')).join('\n')
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}

/** Trigger a client-side download of the given table as a CSV file. */
export function downloadCsv(filename: string, head: string[], rows: (string | number)[][]): void {
  const blob = new Blob([toCsv(head, rows)], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
