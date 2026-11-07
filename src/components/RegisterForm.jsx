import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EVENTS, bySlug } from '../data/events'
import { formatPrice, formatWhen, makeReference } from '../lib/format'
import { addRegistration } from '../lib/registrations'
import { CheckIcon } from './Icons'

const EMPTY = { event: '', name: '', email: '', phone: '', seats: '2' }

function validate(values) {
  const errors = {}

  const name = values.name.trim()
  if (!name) errors.name = 'Enter the name that goes on the door list.'
  else if (!/[a-z]/i.test(name)) errors.name = 'A name needs at least one letter.'
  else if (name.length < 2) errors.name = 'Use at least two letters.'
  else if (name.length > 60) errors.name = 'Keep the name under 60 characters.'

  const email = values.email.trim()
  if (!email) errors.email = 'Enter an email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
    errors.email = 'That address is missing an @ or a domain, like meera@example.com.'
  }

  const digits = values.phone.replace(/\D/g, '')
  const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits
  if (!values.phone.trim()) errors.phone = 'Enter a number we can reach on the night.'
  else if (!/^[6-9]\d{9}$/.test(local)) errors.phone = 'A mobile number is ten digits, starting 6 to 9.'

  if (!bySlug(values.event)) errors.event = 'Choose one of the events on the bill.'

  const seats = Number(values.seats)
  if (!Number.isInteger(seats) || seats < 1 || seats > 6) {
    errors.seats = 'Choose between one and six seats.'
  }

  return errors
}

export default function RegisterForm({ event }) {
  const [values, setValues] = useState({ ...EMPTY, event: event.slug })
  const [errors, setErrors] = useState({})
  const [booking, setBooking] = useState(null)

  const chosen = bySlug(values.event) ?? event
  const seats = Number(values.seats)
  const total = formatPrice(chosen.price * (Number.isInteger(seats) ? seats : 1))

  const set = (key) => (changeEvent) => {
    const value = changeEvent.target.value
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current))
  }

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(`field-${first}`)?.focus()
      return
    }

    const bookingRecord = {
      reference: makeReference(),
      eventSlug: chosen.slug,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      seats: Number(values.seats),
      bookedAt: new Date().toISOString(),
    }

    addRegistration(bookingRecord)
    setBooking(bookingRecord)
  }

  if (booking) {
    const bookedEvent = bySlug(booking.eventSlug)
    return (
      <div className="confirm" role="status">
        <p className="confirm__seal">
          <CheckIcon />
          Seat held
        </p>

        <p className="confirm__ref">{booking.reference}</p>

        <p>
          {booking.name}, {booking.seats === 1 ? 'one seat is' : `${booking.seats} seats are`} down for{' '}
          {bookedEvent.title}. Show this reference at the door.
        </p>

        <dl className="confirm__list">
          <div>
            <dt>Event</dt>
            <dd>{bookedEvent.title}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{formatWhen(bookedEvent.startsAt)}</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>
              {bookedEvent.venue}, {bookedEvent.area}
            </dd>
          </div>
          <div>
            <dt>Paid</dt>
            <dd>{formatPrice(bookedEvent.price * booking.seats)}</dd>
          </div>
        </dl>

        <p className="form__note">
          Held in this browser only. This build has no server, so nothing was emailed and no payment
          was taken.
        </p>

        <div className="confirm__actions">
          <Link className="btn" to="/seats">
            See my seats
          </Link>
          <button type="button" className="btn btn--frame" onClick={() => setBooking(null)}>
            Hold another
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label className="field__label" htmlFor="field-event">
          Event
        </label>
        <select
          className="field__input"
          id="field-event"
          name="event"
          value={values.event}
          onChange={set('event')}
          aria-invalid={Boolean(errors.event)}
          aria-describedby={errors.event ? 'error-event' : undefined}
        >
          {EVENTS.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.title}, {formatWhen(item.startsAt)}
            </option>
          ))}
        </select>
        {errors.event && (
          <p className="field__error" id="error-event">
            {errors.event}
          </p>
        )}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="field-name">
          Your name
        </label>
        <input
          className="field__input"
          id="field-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={set('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'error-name' : undefined}
          placeholder="Meera Rao"
        />
        {errors.name && (
          <p className="field__error" id="error-name">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="field-email">
          Email
        </label>
        <input
          className="field__input"
          id="field-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={set('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'error-email' : undefined}
          placeholder="meera@example.com"
        />
        {errors.email && (
          <p className="field__error" id="error-email">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="field-phone">
          Phone
        </label>
        <input
          className="field__input"
          id="field-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={set('phone')}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'error-phone' : 'hint-phone'}
          placeholder="98765 43210"
        />
        {errors.phone ? (
          <p className="field__error" id="error-phone">
            {errors.phone}
          </p>
        ) : (
          <p className="field__hint" id="hint-phone">
            Ten digits, or +91 and ten more.
          </p>
        )}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="field-seats">
          Seats
        </label>
        <select
          className="field__input"
          id="field-seats"
          name="seats"
          value={values.seats}
          onChange={set('seats')}
          aria-invalid={Boolean(errors.seats)}
          aria-describedby={errors.seats ? 'error-seats' : undefined}
        >
          {[1, 2, 3, 4, 5, 6].map((count) => (
            <option key={count} value={count}>
              {count === 1 ? 'One seat' : `${count} seats`}
            </option>
          ))}
        </select>
        {errors.seats && (
          <p className="field__error" id="error-seats">
            {errors.seats}
          </p>
        )}
      </div>

      <div className="form__foot">
        <button type="submit" className="btn btn--block">
          Hold {seats === 1 ? 'a seat' : `${seats} seats`} for {total}
        </button>
        <p className="form__note">
          The seat is saved in this browser so it survives a reload. There is no card payment and no
          email.
        </p>
      </div>
    </form>
  )
}
