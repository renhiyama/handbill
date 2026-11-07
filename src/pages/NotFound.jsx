import { Link } from 'react-router-dom'
import FitLine from '../components/FitLine'

export default function NotFound() {
  return (
    <section className="blank container">
      <h1 className="fit-wrap">
        <FitLine max={120}>Nothing on this bill</FitLine>
      </h1>
      <p className="lead">That page has been taken down, or the address is wrong.</p>
      <Link className="btn" to="/">
        Back to the bill
      </Link>
    </section>
  )
}
