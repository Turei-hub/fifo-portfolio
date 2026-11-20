// GET    /api/tickets          public list for the Certificates page
// POST   /api/tickets          add (admin)
// PUT    /api/tickets?id=123   update (admin)
// DELETE /api/tickets?id=123   delete (admin)
import { del } from '@vercel/blob'
import { db, ensureTable, validateTicket } from './_lib/db.js'
import { isAdmin, isJson, readBody } from './_lib/auth.js'

const COLS = 'id, name, category, issuer, status, achieved::text AS achieved, expires::text AS expires, image_url, sort_order'

export default async function handler(req, res) {
  const sql = db()
  if (!sql) return res.status(503).json({ error: 'Database not connected yet' })

  try {
    await ensureTable(sql)

    if (req.method === 'GET') {
      const rows = await sql.query(`SELECT ${COLS} FROM tickets ORDER BY sort_order, achieved DESC NULLS LAST, id`)
      res.setHeader('Cache-Control', isAdmin(req) ? 'no-store' : 'public, s-maxage=30, stale-while-revalidate=300')
      return res.status(200).json({ tickets: rows })
    }

    if (!isAdmin(req)) return res.status(401).json({ error: 'Not logged in' })
    if (req.method !== 'DELETE' && !isJson(req)) return res.status(415).json({ error: 'Send JSON' })

    const id = Number(req.query.id)

    if (req.method === 'POST' || req.method === 'PUT') {
      const body = readBody(req)
      if (!body) return res.status(400).json({ error: 'Bad request' })
      const { value: t, error } = validateTicket(body)
      if (error) return res.status(400).json({ error })

      if (req.method === 'POST') {
        const [row] = await sql.query(
          `INSERT INTO tickets (name, category, issuer, status, achieved, expires, image_url, sort_order)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ${COLS}`,
          [t.name, t.category, t.issuer, t.status, t.achieved, t.expires, t.image_url, t.sort_order],
        )
        return res.status(201).json({ ticket: row })
      }

      if (!Number.isInteger(id)) return res.status(400).json({ error: 'Missing id' })
      const [old] = await sql`SELECT image_url FROM tickets WHERE id = ${id}`
      if (!old) return res.status(404).json({ error: 'Not found' })
      const [row] = await sql.query(
        `UPDATE tickets SET name=$1, category=$2, issuer=$3, status=$4, achieved=$5, expires=$6, image_url=$7, sort_order=$8
         WHERE id=$9 RETURNING ${COLS}`,
        [t.name, t.category, t.issuer, t.status, t.achieved, t.expires, t.image_url, t.sort_order, id],
      )
      if (old.image_url && old.image_url !== t.image_url) await removeBlob(old.image_url)
      return res.status(200).json({ ticket: row })
    }

    if (req.method === 'DELETE') {
      if (!Number.isInteger(id)) return res.status(400).json({ error: 'Missing id' })
      const [row] = await sql`DELETE FROM tickets WHERE id = ${id} RETURNING image_url`
      if (!row) return res.status(404).json({ error: 'Not found' })
      if (row.image_url) await removeBlob(row.image_url)
      return res.status(200).json({ ok: true })
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('tickets error', err)
    return res.status(500).json({ error: 'Server error' })
  }
}

// Only delete photos that live in this project's Blob store.
async function removeBlob(url) {
  if (!process.env.BLOB_READ_WRITE_TOKEN || !url.includes('.blob.vercel-storage.com/')) return
  try { await del(url) } catch (err) { console.error('blob delete failed', err) }
}
