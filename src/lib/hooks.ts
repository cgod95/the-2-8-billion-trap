import { useEffect, useRef, useState } from 'react'

/**
 * Observe an element's width so SVG charts can be fully responsive without a
 * fixed pixel width. Returns a ref to attach and the measured width (0 until
 * first measure). Height is derived from an aspect ratio by the caller.
 */
export function useMeasure<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0
      setWidth(w)
    })
    ro.observe(el)
    setWidth(el.getBoundingClientRect().width)
    return () => ro.disconnect()
  }, [])

  return { ref, width }
}

/**
 * Fire once when an element scrolls into view. Used to trigger chart draw-in
 * animations (the `.is-drawn` class). Degrades gracefully: if motion is reduced,
 * the CSS shows everything immediately regardless of this flag.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { rootMargin: '0px 0px -15% 0px', threshold: 0.2 },
) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, options)
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ref, inView }
}
