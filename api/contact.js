// Vercel serverless function: POST /api/contact
// Sends the contact form to your inbox through Brevo (free plan).
// Env vars (Vercel → Project → Settings → Environment Variables):
//   BREVO_API_KEY  your Brevo API key (SMTP & API → API Keys)
//   CONTACT_TO     where messages go, e.g. milner.turei@gmail.com
//   CONTACT_FROM   sender on your Brevo-authenticated domain, e.g. portfolio@kaupekadigital.com

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

  const { BREVO_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env
  if (!BREVO_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    console.error('Contact form is missing BREVO_API_KEY, CONTACT_TO or CONTACT_FROM')
    return res.status(500).json({ error: 'Contact form is not set up yet' })
  }

  const text = [
    `Name: ${name}`,
    `Company: ${company || '-'}`,
    `Email: ${email}`,
    '',
    message,
  ].join('\n')

  const r = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      sender: { name: 'FIFO Portfolio', email: CONTACT_FROM },
      to: [{ email: CONTACT_TO }],
      replyTo: { email, name },
      subject: `Portfolio enquiry from ${name}${company ? ` (${company})` : ''}`,
      textContent: text,
    }),
  })

  if (!r.ok) {
    console.error('Brevo error', r.status, await r.text())
    return res.status(502).json({ error: 'Email service error' })
  }

  return res.status(200).json({ ok: true })
}
