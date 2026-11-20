// Vercel serverless function: POST /api/contact
// Sends the contact form to your inbox through SendGrid.
// Env vars (Vercel → Project → Settings → Environment Variables):
//   SENDGRID_API_KEY  your SendGrid API key
//   CONTACT_TO        where messages go, e.g. milner.turei@gmail.com
//   CONTACT_FROM      a sender address verified in SendGrid

const clean = (v, max) => String(v ?? '').trim().slice(0, max)
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body = req.body || {}
  if (typeof body === 'string') {
    try { body = JSON.parse(body || '{}') } catch { return res.status(400).json({ error: 'Bad request' }) }
  }

  // Honeypot filled in = bot. Pretend it worked.
  if (body.website) return res.status(200).json({ ok: true })

  const name = clean(body.name, 100)
  const company = clean(body.company, 100)
  const email = clean(body.email, 200)
  const message = clean(body.message, 5000)

  if (!name || !message || !isEmail(email)) {
    return res.status(400).json({ error: 'Please fill in your name, a valid email and a message' })
  }

  const { SENDGRID_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env
  if (!SENDGRID_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    console.error('Contact form is missing SENDGRID_API_KEY, CONTACT_TO or CONTACT_FROM')
    return res.status(500).json({ error: 'Contact form is not set up yet' })
  }

  const text = [
    `Name: ${name}`,
    `Company: ${company || '-'}`,
    `Email: ${email}`,
    '',
    message,
  ].join('\n')

  const sg = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: CONTACT_TO }] }],
      from: { email: CONTACT_FROM, name: 'FIFO Portfolio' },
      reply_to: { email, name },
      subject: `Portfolio enquiry from ${name}${company ? ` (${company})` : ''}`,
      content: [{ type: 'text/plain', value: text }],
    }),
  })

  if (!sg.ok) {
    console.error('SendGrid error', sg.status, await sg.text())
    return res.status(502).json({ error: 'Email service error' })
  }

  return res.status(200).json({ ok: true })
}
