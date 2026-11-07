import { useSyncExternalStore } from 'react'

const KEY = 'handbill.registrations'
const EVENT = 'handbill:registrations'

/**
 * A tiny store over localStorage. Every component reading registrations
 * subscribes here, so a booking on one page shows up in the masthead at once.
 */
function read() {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

let cache = read()

function emit() {
  cache = read()
  window.dispatchEvent(new CustomEvent(EVENT))
}

function subscribe(callback) {
  const onChange = () => callback()
  window.addEventListener(EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

function getSnapshot() {
  return cache
}

export function useRegistrations() {
  return useSyncExternalStore(subscribe, getSnapshot, () => [])
}

export function addRegistration(registration) {
  const next = [registration, ...read()]
  localStorage.setItem(KEY, JSON.stringify(next))
  emit()
  return registration
}

export function removeRegistration(reference) {
  const next = read().filter((item) => item.reference !== reference)
  localStorage.setItem(KEY, JSON.stringify(next))
  emit()
}

export function clearRegistrations() {
  localStorage.setItem(KEY, JSON.stringify([]))
  emit()
}
