import { Link } from 'react-router-dom'
import FitLine from '../components/FitLine'
import { CREDITS } from '../lib/assets'

export default function Credits() {
  return (
    <section className="credits-page">
      <div className="container">
        <h1 className="fit-wrap">
          <FitLine max={130}>Photographs</FitLine>
        </h1>

        <p className="lead credits-page__lead">
          Free-licence photographs from Wikimedia Commons. Each name links to its file page.
        </p>

        <ul className="credit-list">
          {CREDITS.map((credit) => (
            <li className="credit-row" key={credit.href}>
              <a href={credit.href} target="_blank" rel="noreferrer noopener">
                {credit.label}
              </a>
              <span className="label">{credit.licence}</span>
            </li>
          ))}
        </ul>

        <p className="credits-page__back">
          <Link className="btn btn--frame" to="/">
            Back to the bill
          </Link>
        </p>
      </div>
    </section>
  )
}
