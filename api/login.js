// GET    /api/login   → { authed }
// POST   /api/login   { password } → sets session cookie
// DELETE /api/login   → logs out
import { passwordMatches, sessionCookie, clearCookie, isAdmin, isJson, readBody } from './_lib/auth.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'GET') return res.status(200).json({ authed: isAdmin(req) })

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', clearCookie())
    return res.status(200).json({ ok: true })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST, DELETE')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!isJson(req)) return res.status(415).json({ error: 'Send JSON' })

  if (!process.env.ADMIN_PASSWORD) return res.status(503).json({ error: 'ADMIN_PASSWORD is not set in Vercel yet' })

  const body = readBody(req) || {}
  if (!passwordMatches(String(body.password || ''))) {
    await new Promise((r) => setTimeout(r, 800)) // slow down guessing
    return res.status(401).json({ error: 'Wrong password' })
  }

  res.setHeader('Set-Cookie', sessionCookie())
  return res.status(200).json({ ok: true })
}
