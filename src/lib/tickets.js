import { useEffect, useState } from 'react'
import { tickets as fallback } from '../data'

export const CATEGORY_LABELS = {
  ticket: 'Ticket',
  licence: 'Licence',
  certificate: 'Certificate',
  qualification: 'Qualification',
}

// Live list from /api/tickets; falls back to the static list if the API isn't up.
export function useTickets() {
  const [tickets, setTickets] = useState(fallback)
  useEffect(() => {
    let live = true
    fetch('/api/tickets')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => { if (live && Array.isArray(d.tickets)) setTickets(d.tickets) })
      .catch(() => {})
    return () => { live = false }
  }, [])
  return tickets
}

export function formatDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

// { label, tone } for the expiry badge, or null when there's no expiry date.
export function expiryInfo(expires) {
  if (!expires) return null
  const today = new Date().toISOString().slice(0, 10)
  const soon = new Date(Date.now() + 90 * 864e5).toISOString().slice(0, 10)
  if (expires < today) return { label: `Expired ${formatDate(expires)}`, tone: 'bad' }
  if (expires <= soon) return { label: `Expires ${formatDate(expires)}`, tone: 'warn' }
  return { label: `Valid to ${formatDate(expires)}`, tone: 'good' }
}

export const toneClass = {
  good: 'bg-[#1E3A2A] text-[#8FE0A8]',
  warn: 'bg-[#3D2E12] text-[#FFC86B]',
  bad: 'bg-[#3D1A1A] text-[#FF9C9C]',
}
