// Password login for /admin. The session cookie is signed with ADMIN_PASSWORD,
// so changing the password in Vercel logs every session out.
import { createHmac, createHash, timingSafeEqual } from 'node:crypto'

const COOKIE = 'tm_admin'
const WEEK = 7 * 24 * 60 * 60

const sign = (value, password) => createHmac('sha256', `session:${password}`).update(value).digest('hex')
const sha = (v) => createHash('sha256').update(String(v)).digest()

export function passwordMatches(input) {
  const real = process.env.ADMIN_PASSWORD
  if (!real || real.length < 10) return false
  return timingSafeEqual(sha(input), sha(real))
}

export function sessionCookie() {
  const exp = String(Math.floor(Date.now() / 1000) + WEEK)
  const token = `${exp}.${sign(exp, process.env.ADMIN_PASSWORD)}`
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${WEEK}`
}

export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`

export function isAdmin(req) {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  const raw = (req.headers.cookie || '').split(';').map((c) => c.trim()).find((c) => c.startsWith(`${COOKIE}=`))
  if (!raw) return false
  const [exp, sig] = raw.slice(COOKIE.length + 1).split('.')
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false
  const expected = sign(exp, password)
  return sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
}

// Writes must be JSON (blocks plain HTML form posts from other sites).
export const isJson = (req) => (req.headers['content-type'] || '').startsWith('application/json')

export function readBody(req) {
  let body = req.body || {}
  if (typeof body === 'string') {
    try { body = JSON.parse(body || '{}') } catch { return null }
  }
  return body
}
