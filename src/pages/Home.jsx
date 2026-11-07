import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Countdown from '../components/Countdown'
import EventCard from '../components/EventCard'
import FitLine from '../components/FitLine'
import Photo from '../components/Photo'
import SeatList from '../components/SeatList'
import { SearchIcon } from '../components/Icons'
import { CATEGORIES, EVENTS, nextEvent } from '../data/events'
import { heroSrc } from '../lib/assets'
import { formatPrice, formatWhen } from '../lib/format'
import { removeRegistration, useRegistrations } from '../lib/registrations'

const QUESTIONS = [
  ['Do I pay here?', 'No. The venue takes the money at the door.'],
  ['Where does my seat go?', 'Into local storage. Clearing your browsing data clears your seats.'],
  ['What if I miss it?', 'Cancel from My seats. The seat returns to the bill.'],
]

export default function Home() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const category = params.get('cat') ?? 'All'
  const registrations = useRegistrations()
  const feature = nextEvent()

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return EVENTS.filter((event) => {
      const inCategory = category === 'All' || event.category === category
      const haystack = `${event.title} ${event.venue} ${event.area} ${event.category} ${event.summary}`.toLowerCase()
      return inCategory && (!needle || haystack.includes(needle))
    })
  }, [category, query])

  const update = (patch) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([key, value]) => {
      if (value) next.set(key, value)
      else next.delete(key)
    })
    setParams(next, { replace: true })
  }

  const filtered = category !== 'All' || query.trim() !== ''

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__text">
              <h1 className="hero__title">
                <FitLine max={330}>Every night</FitLine>
                <FitLine max={330}>is on the bill</FitLine>
              </h1>

              <p className="hero__lead lead">
                Gigs, workshops, talks and markets in Bhubaneswar. Book a seat.
              </p>

              <div className="hero__actions">
                <Link className="btn" to={`/event/${feature.slug}`}>
                  Hold a seat
                </Link>
                <a className="btn btn--frame" href="#bill">
                  Browse the bill
                </a>
              </div>
            </div>

            <div className="hero__visual">
              <div className="frame frame--photo">
                <div className="plate hero__plate">
                  <Photo
                    src={heroSrc(1920)}
                    srcSet={`${heroSrc(1280)} 1280w, ${heroSrc(1920)} 1920w`}
                    sizes="(max-width: 960px) 100vw, 44vw"
                    width={1920}
                    height={1282}
                    alt="Stage lights fanning out over a crowd at an outdoor night set"
                    focus="50% 45%"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bill" id="bill">
        <div className="container">
          <div className="bill__head">
            <h2 className="bill__title">What is on the bill</h2>

            <div className="bill__search">
              <div className="search">
                <label className="visually-hidden" htmlFor="bill-search">
                  Search the bill by event, venue or area
                </label>
                <div className="search__field">
                  <SearchIcon />
                  <input
                    id="bill-search"
                    type="search"
                    value={query}
                    onChange={(changeEvent) => update({ q: changeEvent.target.value })}
                    placeholder="Search by night, venue or area"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="chips" role="group" aria-label="Filter by category">
            <button
              type="button"
              className="chip"
              aria-pressed={category === 'All'}
              onClick={() => update({ cat: '' })}
            >
              All
            </button>
            {CATEGORIES.map((name) => (
              <button
                key={name}
                type="button"
                className="chip"
                aria-pressed={category === name}
                onClick={() => update({ cat: category === name ? '' : name })}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="bill__count">
            <p className="label" role="status">
              {matches.length === 0
                ? 'Nothing on the bill matches'
                : `${matches.length} ${matches.length === 1 ? 'night' : 'nights'} on the bill`}
            </p>
            {filtered && (
              <button type="button" className="link" onClick={() => setParams({}, { replace: true })}>
                Clear the filters
              </button>
            )}
          </div>

          {matches.length > 0 ? (
            <ul className="bill__grid">
              {matches.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </ul>
          ) : (
            <div className="empty">
              <p>No bill matches that search.</p>
              <p className="label">
                Try an area like Patia, or a category like Music. There are eight nights on
                the bill at the moment.
              </p>
              <button type="button" className="btn btn--frame" onClick={() => setParams({}, { replace: true })}>
                Show all eight
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="band">
        <div className="container band__grid">
          <div className="band__text">
            <h2 className="band__title">{feature.title}</h2>
            <p className="band__what">
              {formatWhen(feature.startsAt)} at {feature.venue}, {feature.area}. {feature.summary}
            </p>
            <div className="band__actions">
              <Link className="btn" to={`/event/${feature.slug}`}>
                Hold a seat
              </Link>
              <span className="band__price">{formatPrice(feature.price)}</span>
            </div>
          </div>

          <div className="band__clock">
            <p className="label">Doors open in</p>
            <Countdown iso={feature.startsAt} />
          </div>
        </div>
      </section>

      <section className="seats" id="seats">
        <div className="container seats__grid">
          <div className="seats__head">
            <h2>Your seats</h2>
            <p className="label">
              Registrations made on this device appear here with the reference you show at the
              door.
            </p>
          </div>

          <div className="seats__body">
            {registrations.length > 0 ? (
              <SeatList items={registrations} onRemove={removeRegistration} />
            ) : (
              <div className="empty empty--stub">
                <p>No seats held yet.</p>
                <p className="label">Pick a night above and the reference lands here.</p>
                <a className="btn btn--frame" href="#bill">
                  Browse the bill
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="questions">
        <div className="container questions__grid">
          <div className="questions__head">
            <h2>Before you come</h2>
          </div>

          <div className="questions__list">
            {QUESTIONS.map(([question, answer]) => (
              <details className="faq" key={question}>
                <summary>
                  {question}
                  <span className="faq__mark" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="close">
        <div className="container close__grid">
          <div className="close__head">
            <h2 className="close__date fit-wrap">
              <FitLine max={150}>{formatWhen(feature.startsAt)}</FitLine>
            </h2>
            <p className="close__note">
              {feature.title} at {feature.venue}, {feature.area}. Doors {feature.doors}.
            </p>
          </div>

          <div className="close__action">
            <Link className="btn btn--frame" to={`/event/${feature.slug}`}>
              Hold a seat
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
