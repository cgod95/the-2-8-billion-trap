import { useState, type ReactNode } from 'react'
import { useMeasure, useInView } from '@/lib/hooks'
import { downloadCsv, slugify } from '@/lib/csv'

export interface DataTable {
  caption: string
  head: string[]
  rows: (string | number)[][]
}

interface ChartFrameProps {
  /** The narrative title — lead with the finding, as an active sentence. This is
   *  the boldest text in the card; it is what the reader will remember. */
  title: string
  /** The descriptive line: what is plotted, units, scope. Quieter than the title. */
  subtitle?: ReactNode
  /** Chart body as a render prop — receives the measured width and an in-view
   *  flag (true once scrolled into view) so the chart can size and animate. */
  children: (ctx: { width: number; inView: boolean }) => ReactNode
  /** Source line(s) — typically one or more <SourceTag>. */
  sources: ReactNode
  /** Methodology / disclosure note shown as fine print. */
  note?: ReactNode
  /** A text-equivalent data table — for keyboard & screen-reader users, for
   *  anyone who wants the raw numbers, and for the CSV download. */
  table?: DataTable
  className?: string
}

/**
 * The shared shell for every chart: a titled, sourced card that owns the
 * responsive measurement and the in-view trigger, and makes the chart
 * self-contained and reusable — a text-equivalent data table and a CSV download,
 * the Our World in Data standard. Charts render their own SVG (with role="img"
 * and a full aria-label) inside the render-prop body.
 */
export function ChartFrame({ title, subtitle, children, sources, note, table, className = '' }: ChartFrameProps) {
  const { ref, width } = useMeasure<HTMLDivElement>()
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>()
  const [showData, setShowData] = useState(false)

  return (
    <figure className={`overflow-hidden rounded-xl border border-line bg-surface ${className}`} ref={inViewRef}>
      <figcaption className="border-b border-line px-5 py-4 sm:px-7">
        <h3 className="font-display text-xl font-semibold leading-snug text-ink">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </figcaption>

      <div ref={ref} className={`px-2 py-5 sm:px-5 ${inView ? 'is-drawn' : ''}`}>
        {width > 0 && children({ width, inView })}
      </div>

      <div className="space-y-3 border-t border-line px-5 py-4 sm:px-7">
        {note && <p className="text-xs leading-relaxed text-muted">{note}</p>}
        <div className="space-y-1.5">{sources}</div>

        {table && (
          <div className="text-xs">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <button
                type="button"
                onClick={() => setShowData((v) => !v)}
                aria-expanded={showData}
                className="font-medium text-ink-soft underline-offset-2 hover:underline"
              >
                {showData ? 'Hide the data' : 'Show the data'}
              </button>
              <button
                type="button"
                onClick={() => downloadCsv(`trap-${slugify(title)}`, table.head, table.rows)}
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                Download CSV
              </button>
            </div>

            {showData && (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-left tnum">
                  <caption className="sr-only">{table.caption}</caption>
                  <thead>
                    <tr className="border-b border-line-strong">
                      {table.head.map((h) => (
                        <th key={h} scope="col" className="px-2 py-1.5 font-medium text-ink-soft">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr key={i} className="border-b border-line last:border-0">
                        {row.map((cell, j) => (
                          <td key={j} className="px-2 py-1.5 text-ink-soft">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </figure>
  )
}
