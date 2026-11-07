import { useLayoutEffect, useRef } from 'react'

/**
 * Fits each headline line to the width of its column.
 *
 * The CSS font size is the fallback. This adjusts it after the display font
 * loads, so a short line ends up larger than a long one and the block still
 * reads with scripting off.
 */
export default function FitLine({ children, max = 190, min = 22 }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const parent = el.parentElement
    let frame = 0
    let stopped = false

    const fit = () => {
      const available = parent.clientWidth
      if (!available) return
      const size = parseFloat(getComputedStyle(el).fontSize)
      const width = el.getBoundingClientRect().width
      if (!size || !width) return
      // Width scales with font size, so read the line as it stands and scale it
      // to the measure. Setting a probe size first reads back stale in Chrome.
      const natural = (width / size) * 100
      const next = Math.min(max, Math.max(min, (available / natural) * 98))
      el.style.fontSize = `${next.toFixed(2)}px`
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fit)
    }

    // The face swaps in after the first fit without changing the column, so
    // one pass on mount is not enough.
    const fonts = document.fonts
    const waitForFace = () => {
      if (!fonts) {
        schedule()
        return
      }
      const face = getComputedStyle(el).fontFamily.split(',')[0].trim()
      fonts.load(`100px ${face}`).then(
        () => {
          if (!stopped) schedule()
        },
        () => {
          if (!stopped) schedule()
        },
      )
    }

    schedule()
    waitForFace()

    const observer = new ResizeObserver(schedule)
    observer.observe(parent)
    if (fonts) fonts.addEventListener('loadingdone', schedule)

    return () => {
      stopped = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      if (fonts) fonts.removeEventListener('loadingdone', schedule)
    }
  }, [children, max, min])

  return (
    <span ref={ref} className="fit">
      {children}
    </span>
  )
}
