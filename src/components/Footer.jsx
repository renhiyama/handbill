import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="colophon">
      <div className="container">
        <div className="colophon__grid">
          <div className="colophon__mark">
            <p className="wordmark wordmark--big">Handbill</p>
            <p className="label colophon__line">
              Gigs, workshops, talks and markets in Bhubaneswar.
            </p>
          </div>

          <nav className="colophon__links" aria-label="Footer">
            <Link className="masthead__link" to="/#bill">
              The bill
            </Link>
            <Link className="masthead__link" to="/seats">
              My seats
            </Link>
            <Link className="masthead__link" to="/event/night-shift">
              Next night
            </Link>
          </nav>

          <div className="colophon__meta">
            <p>Seats live in this browser.</p>
            <p>Built for the K Explore task.</p>
          </div>
        </div>

        <div className="rule-hair credits-block">
          <p className="credits">
            Photographs are free-licence images from Wikimedia Commons.{' '}
            <Link to="/credits">Photo credits</Link>.
          </p>
        </div>
      </div>
    </footer>
  )
}
