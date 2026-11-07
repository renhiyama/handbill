import { useEffect, useState } from 'react'

const STORAGE_KEY = 'handbill.theme'

/**
 * The colourway: `bill` (buff stock) or `inked` (dark stock). The choice lives
 * in localStorage and follows the operating system until someone picks a side.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* private mode: the page still switches for this visit */
    }
  }, [theme])

  const toggle = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  return { theme, toggle }
}
