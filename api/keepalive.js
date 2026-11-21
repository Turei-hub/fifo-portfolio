// GET /api/keepalive — run once a day by Vercel Cron (see vercel.json).
// Brevo turns API keys off after 90 days with no use, even "non-expiring" ones.
// This makes one read-only call (yesterday's email stats) so the key always counts as used.
// It never sends an email.

export default async function handler(req, res) {
  // Vercel Cron sends "Authorization: Bearer <CRON_SECRET>" when CRON_SECRET is set.
  const secret = process.env.CRON_SECRET
  const auth = req.headers.authorization || ''
  const fromCron = secret ? auth === `Bearer ${secret}` : (req.headers['user-agent'] || '').startsWith('vercel-cron')
  if (!fromCron) return res.status(401).json({ error: 'Unauthorized' })

  const key = process.env.BREVO_API_KEY
  if (!key) return res.status(500).json({ error: 'BREVO_API_KEY missing' })

  const r = await fetch('https://api.brevo.com/v3/smtp/statistics/aggregatedReport?days=1', {
    headers: { 'api-key': key, Accept: 'application/json' },
  })

  if (!r.ok) {
    console.error('Brevo keepalive failed', r.status, await r.text())
    return res.status(502).json({ ok: false, status: r.status })
  }

  console.log('Brevo keepalive ok')
  return res.status(200).json({ ok: true })
}
