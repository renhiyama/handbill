import { bySlug } from '../data/events'
import { formatBookedOn, formatWhen } from '../lib/format'

export default function SeatList({ items, onRemove }) {
  return (
    <ul className="seat-list">
      {items.map((item) => {
        const event = bySlug(item.eventSlug)
        return (
          <li className="seat-row" key={item.reference}>
            <div>
              <p className="seat-row__ref">{item.reference}</p>
              <p className="seat-row__title">{event ? event.title : 'A bill that is no longer listed'}</p>
              <p className="seat-row__meta label">
                {event ? `${formatWhen(event.startsAt)} at ${event.venue}, ${event.area}. ` : ''}
                {item.seats === 1 ? 'One seat' : `${item.seats} seats`} under {item.name}, booked{' '}
                {formatBookedOn(item.bookedAt)}.
              </p>
            </div>
            <button
              type="button"
              className="seat-row__remove"
              onClick={() => onRemove(item.reference)}
              aria-label={`Cancel seat ${item.reference} for ${event ? event.title : 'this event'}`}
            >
              Cancel seat
            </button>
          </li>
        )
      })}
    </ul>
  )
}
