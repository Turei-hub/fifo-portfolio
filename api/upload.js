// POST /api/upload  { filename, contentType, data (base64) } → { url }   (admin)
// Photos are resized in the browser first, so they stay well under Vercel's 4.5 MB request limit.
// Needs BLOB_READ_WRITE_TOKEN, added automatically when you connect a Blob store (Storage → Blob).
import { put } from '@vercel/blob'
import { isAdmin, isJson, readBody } from './_lib/auth.js'

const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }
const MAX = 3.5 * 1024 * 1024

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!isAdmin(req)) return res.status(401).json({ error: 'Not logged in' })
  if (!isJson(req)) return res.status(415).json({ error: 'Send JSON' })
  if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(503).json({ error: 'Photo storage not connected yet' })

  const body = readBody(req) || {}
  const ext = TYPES[body.contentType]
  if (!ext) return res.status(400).json({ error: 'Use a JPG, PNG or WebP photo' })

  const buf = Buffer.from(String(body.data || ''), 'base64')
  if (!buf.length) return res.status(400).json({ error: 'Empty file' })
  if (buf.length > MAX) return res.status(413).json({ error: 'Photo too large' })

  const base = String(body.filename || 'ticket').toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'ticket'

  try {
    const blob = await put(`tickets/${base}.${ext}`, buf, {
      access: 'public',
      contentType: body.contentType,
      addRandomSuffix: true,
    })
    return res.status(200).json({ url: blob.url })
  } catch (err) {
    console.error('upload error', err)
    return res.status(500).json({ error: 'Upload failed' })
  }
}
