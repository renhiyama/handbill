import { useEffect, useState } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const remaining = (target) => {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
    done: diff === 0,
  }
}

export default function useCountdown(iso) {
  const target = new Date(iso).getTime()
  const [value, setValue] = useState(() => remaining(target))

  useEffect(() => {
    setValue(remaining(target))
    const id = window.setInterval(() => setValue(remaining(target)), SECOND)
    return () => window.clearInterval(id)
  }, [target])

  return value
}
