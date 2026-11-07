import { Link, NavLink } from 'react-router-dom'
import useTheme from '../hooks/useTheme'
import { useRegistrations } from '../lib/registrations'
import { MoonIcon, SunIcon } from './Icons'

export default function Masthead() {
  const { theme, toggle } = useTheme()
  const seats = useRegistrations()

  return (
    <header className="masthead">
      <div className="container masthead__inner">
        <nav className="masthead__side" aria-label="Main">
          <NavLink className="masthead__link" to="/#bill">
            The bill
          </NavLink>
          <NavLink className="masthead__link" to="/seats">
            My seats
            {seats.length > 0 && (
              <span className="masthead__count num" aria-label={`${seats.length} held`}>
                {seats.length}
              </span>
            )}
          </NavLink>
        </nav>

        <Link className="wordmark" to="/" aria-label="Handbill, home">
          Handbill
        </Link>

        <div className="masthead__side masthead__side--end">
          <button
            type="button"
            className="icon-btn"
            onClick={toggle}
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Switch to the light bill' : 'Switch to the inked bill'}
            title={theme === 'dark' ? 'Light bill' : 'Inked bill'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}
