// Neon Postgres. DATABASE_URL is added automatically when you connect Neon
// to the project in Vercel (Storage → Neon). The table creates itself and is
// seeded from src/data.js the first time it's used.
import { neon } from '@neondatabase/serverless'
import { tickets as seed } from '../../src/data.js'

export const CATEGORIES = ['ticket', 'licence', 'certificate', 'qualification']

let ready

export function db() {
  const e = process.env
  const url = e.DATABASE_URL || e.DATABASE_POSTGRES_URL || e.POSTGRES_URL
  if (!url) return null
  return neon(url)
}

export async function ensureTable(sql) {
  if (!ready) {
    ready = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS tickets (
          id          serial PRIMARY KEY,
          name        text NOT NULL,
          category    text NOT NULL DEFAULT 'ticket',
          issuer      text,
          status      text,
          achieved    date,
          expires     date,
          image_url   text,
          sort_order  integer NOT NULL DEFAULT 0,
          created_at  timestamptz NOT NULL DEFAULT now()
        )`
      const [{ count }] = await sql`SELECT count(*)::int AS count FROM tickets`
      if (count === 0) {
        let i = 0
        for (const t of seed) {
          await sql`INSERT INTO tickets (name, category, status, sort_order)
                    VALUES (${t.name}, ${t.category || 'ticket'}, ${t.status}, ${(i += 10)})`
        }
      }
    })().catch((err) => { ready = undefined; throw err })
  }
  return ready
}

const clean = (v, max) => {
  const s = String(v ?? '').trim().slice(0, max)
  return s || null
}
const date = (v) => (/^\d{4}-\d{2}-\d{2}$/.test(String(v || '')) ? v : null)

// Returns { value } or { error }
export function validateTicket(body) {
  const name = clean(body.name, 120)
  if (!name) return { error: 'Name is required' }
  const category = CATEGORIES.includes(body.category) ? body.category : 'ticket'
  const image = clean(body.image_url, 500)
  if (image && !image.startsWith('https://')) return { error: 'Photo link must start with https://' }
  const sort = Number.isFinite(Number(body.sort_order)) ? Math.trunc(Number(body.sort_order)) : 0
  return {
    value: {
      name,
      category,
      issuer: clean(body.issuer, 120),
      status: clean(body.status, 120),
      achieved: date(body.achieved),
      expires: date(body.expires),
      image_url: image,
      sort_order: sort,
    },
  }
}
