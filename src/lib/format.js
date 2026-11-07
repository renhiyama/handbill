const TZ = 'Asia/Kolkata'

const dateFull = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: TZ,
})

const dayNum = new Intl.DateTimeFormat('en-GB', { day: '2-digit', timeZone: TZ })
const monthShort = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: TZ })
const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: TZ })

const timeShort = new Intl.DateTimeFormat('en-GB', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZone: TZ,
})

const bookedOn = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: TZ,
})

export const formatDate = (iso) => dateFull.format(new Date(iso))
export const formatDay = (iso) => dayNum.format(new Date(iso))
export const formatMonth = (iso) => monthShort.format(new Date(iso))
export const formatWeekday = (iso) => weekday.format(new Date(iso))
export const formatTime = (iso) => timeShort.format(new Date(iso)).toLowerCase()
export const formatBookedOn = (iso) => bookedOn.format(new Date(iso))

/** 850 -> "₹850", 0 -> "Free", 2400 -> "₹2,400" */
export const formatPrice = (rupees) =>
  rupees === 0 ? 'Free' : `₹${rupees.toLocaleString('en-IN')}`

/** "Sat 21 Nov, 8:00 pm" */
export const formatWhen = (iso) => {
  const d = new Date(iso)
  return `${weekday.format(d)} ${dayNum.format(d)} ${monthShort.format(d)}, ${timeShort
    .format(d)
    .toLowerCase()}`
}

/** A reference a person can read out loud: HB-7K2QF */
export const makeReference = () => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < 5; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `HB-${out}`
}

export const pad2 = (n) => String(n).padStart(2, '0')
