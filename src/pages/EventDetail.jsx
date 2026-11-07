import { Link, useParams } from 'react-router-dom'
import Countdown from '../components/Countdown'
import FitLine from '../components/FitLine'
import Photo from '../components/Photo'
import RegisterForm from '../components/RegisterForm'
import { bySlug } from '../data/events'
import { CARD_DIMENSIONS, cardSrc } from '../lib/assets'
import { formatDate, formatPrice, formatTime } from '../lib/format'

export default function EventDetail() {
  const { slug } = useParams()
  const event = bySlug(slug)

  if (!event) {
    return (
      <section className="blank container">
        <h1 className="fit-wrap">
          <FitLine max={120}>Nothing on this bill</FitLine>
        </h1>
        <p className="lead">That night has been taken down, or the address is wrong.</p>
        <Link className="btn" to="/">
          Back to the bill
        </Link>
      </section>
    )
  }

  const [width, height] = CARD_DIMENSIONS[event.image] ?? [1280, 900]

  return (
    <article className="detail">
      <div className="container">
        <Link className="detail__back" to="/#bill">
          All bills
        </Link>

        <header className="detail__head">
          <h1 className="detail__title fit-wrap">
            <FitLine max={150}>{event.title}</FitLine>
          </h1>
          <p className="detail__when accent">
            {formatDate(event.startsAt)}, doors {event.doors}
          </p>
          <p className="lead">{event.summary}</p>
        </header>

        <div className="detail__grid">
          <div className="detail__body">
            <div className="frame frame--photo">
              <div className="plate detail__plate">
                <Photo
                  src={cardSrc(event.image, 1280)}
                  srcSet={`${cardSrc(event.image, 640)} 640w, ${cardSrc(event.image, 1280)} 1280w`}
                  sizes="(max-width: 960px) 100vw, 55vw"
                  width={width}
                  height={height}
                  alt={event.title}
                  focus={event.focus}
                  priority
                />
              </div>
            </div>

            <section>
              <h2 className="subhead">The night</h2>
              <div className="prose">
                {event.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="subhead">On the night</h2>
              <ul className="run">
                {event.lineUp.map(([time, name, note]) => (
                  <li className="run__row" key={`${time}-${name}`}>
                    <span className="run__time">{time}</span>
                    <span>
                      <span className="run__name">{name}</span>
                      <br />
                      <span className="run__note">{note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="subhead">Getting there</h2>
              <dl className="particulars">
                <div>
                  <dt>Date</dt>
                  <dd>{formatDate(event.startsAt)}</dd>
                </div>
                <div>
                  <dt>Doors</dt>
                  <dd>
                    {event.doors}, ends {formatTime(event.endsAt)}
                  </dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>
                    {event.venue}, {event.area}
                  </dd>
                </div>
                <div>
                  <dt>Address</dt>
                  <dd>{event.address}</dd>
                </div>
                <div>
                  <dt>Price</dt>
                  <dd>{formatPrice(event.price)} a seat, paid at the door</dd>
                </div>
              </dl>
              <p className="prose mt-md">
                {event.bring}
              </p>
            </section>
          </div>

          <aside className="detail__aside">
            <div className="panel">
              <div className="panel__head">
                <h2 className="panel__title">Hold a seat</h2>
                <p className="panel__price">{formatPrice(event.price)}</p>
              </div>

              <div className="band__clock clock--inset">
                <p className="label">Doors open in</p>
                <Countdown iso={event.startsAt} />
              </div>

              <RegisterForm key={event.slug} event={event} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
