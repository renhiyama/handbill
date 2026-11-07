import useCountdown from '../hooks/useCountdown'
import { pad2 } from '../lib/format'

const CELLS = [
  ['days', 'days'],
  ['hours', 'hours'],
  ['minutes', 'minutes'],
  ['seconds', 'seconds'],
]

export default function Countdown({ iso }) {
  const value = useCountdown(iso)

  if (value.done) {
    return (
      <p className="countdown__label">
        Doors are open. The bill has started.
      </p>
    )
  }

  return (
    <div className="countdown" role="group" aria-label="Time until doors open">
      {CELLS.map(([key, label]) => (
        <div className="countdown__cell" key={key}>
          <span className="countdown__value">{pad2(value[key])}</span>
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  )
}

/** "in 12 days" or "in 4 hours", for the event page and the seats list. */
export function countdownWords(iso) {
  const diff = new Date(iso).getTime() - Date.now()
  if (diff <= 0) return 'doors are open'
  const days = Math.floor(diff / 86400000)
  if (days >= 2) return `in ${days} days`
  const hours = Math.floor(diff / 3600000)
  if (hours >= 2) return `in ${hours} hours`
  const minutes = Math.max(1, Math.floor(diff / 60000))
  return `in ${minutes} minutes`
}
