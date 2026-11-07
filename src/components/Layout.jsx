import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Masthead from './Masthead'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1))
      if (target) {
        target.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <div className="sheet">
      <a className="skip" href="#main">
        Skip to the bill
      </a>
      <Masthead />
      <main id="main" className="view" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
