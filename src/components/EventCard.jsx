import { Link } from 'react-router-dom'
import { CARD_DIMENSIONS, cardSrc } from '../lib/assets'
import { formatDay, formatMonth, formatPrice, formatWeekday } from '../lib/format'
import Photo from './Photo'

export default function EventCard({ event }) {
  const [width, height] = CARD_DIMENSIONS[event.image] ?? [1280, 900]

  return (
    <li>
      <Link className="card card__link" to={`/event/${event.slug}`}>
        <div className="plate card__plate">
          <Photo
            src={cardSrc(event.image, 1280)}
            srcSet={`${cardSrc(event.image, 640)} 640w, ${cardSrc(event.image, 1280)} 1280w`}
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 30vw"
            width={width}
            height={height}
            alt={event.title}
            focus={event.focus}
          />
        </div>

        <div className="card__head">
          <span className="card__date display-2">
            {formatWeekday(event.startsAt)} {formatDay(event.startsAt)} {formatMonth(event.startsAt)}
          </span>
          <span className="card__price">{formatPrice(event.price)}</span>
        </div>

        <h3 className="card__title">{event.title}</h3>

        <p className="card__venue label">
          {event.venue}, {event.area}
        </p>

        <p className="card__summary">{event.summary}</p>

        <p className="card__cat">{event.category}</p>
      </Link>
    </li>
  )
}
