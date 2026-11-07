import { Link } from 'react-router-dom'
import FitLine from '../components/FitLine'
import SeatList from '../components/SeatList'
import { clearRegistrations, removeRegistration, useRegistrations } from '../lib/registrations'

export default function MySeats() {
  const registrations = useRegistrations()

  return (
    <section className="seats">
      <div className="container seats__grid">
        <div className="seats__head">
          <h1 className="fit-wrap">
            <FitLine max={130}>My seats</FitLine>
          </h1>
          <p className="label">
            Held in this browser only. Clearing your browsing data clears this list.
          </p>
        </div>

        <div className="seats__body">
          {registrations.length > 0 ? (
            <>
              <SeatList items={registrations} onRemove={removeRegistration} />
              <p className="seats__clear">
                <button type="button" className="link" onClick={clearRegistrations}>
                  Cancel every seat
                </button>
              </p>
            </>
          ) : (
            <div className="empty">
              <p>No seats held yet.</p>
              <p className="label">
                Every registration you make on this device is listed here with its reference.
              </p>
              <Link className="btn btn--frame" to="/#bill">
                Browse the bill
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
