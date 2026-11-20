import { useState } from 'react'
import { site } from '../data'
import { Page, Eyebrow, H2, btnPrimary } from '../components/ui'

const field = 'bg-ink border border-line2 rounded px-3 py-3 text-paper font-[inherit] min-h-11 w-full box-border'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || 'Something went wrong')
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  const links = [
    ['Email', site.email, `mailto:${site.email}`],
    ['Phone', site.phone, site.phone && `tel:${site.phone.replace(/\s/g, '')}`],
    ['LinkedIn', 'linkedin.com/in/turei-milner-2682b5361', site.linkedin],
    ['GitHub', 'github.com/Turei-hub', site.github],
    ['Developer portfolio', 'turei.dev', site.devPortfolio],
  ].filter(([, v]) => v)

  return (
    <Page title="Contact">
      <div className="flex flex-wrap gap-10">
        <div className="flex-[1_1_340px] min-w-0 flex flex-col gap-4">
          <Eyebrow>CONTACT</Eyebrow>
          <H2>Let's talk</H2>
          <p className="m-0 text-soft">{site.location}. Happy to jump on a call any time.</p>
          {links.map(([label, text, href]) => (
            <p key={label} className="m-0">
              <span className="text-mute">{label}</span><br />
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener">{text}</a>
            </p>
          ))}
        </div>

        <form onSubmit={onSubmit} className="flex-[999_1_480px] min-w-0 bg-panel border border-line rounded-md p-7 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 font-medium">Name<input name="name" type="text" required maxLength={100} className={field} /></label>
          <label className="flex flex-col gap-1.5 font-medium">Company<input name="company" type="text" maxLength={100} className={field} /></label>
          <label className="flex flex-col gap-1.5 font-medium">Email<input name="email" type="email" required maxLength={200} className={field} /></label>
          <label className="flex flex-col gap-1.5 font-medium">Message<textarea name="message" rows={5} required maxLength={5000} className={`${field} resize-y`} /></label>
          {/* Honeypot: real people never see or fill this */}
          <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <button type="submit" disabled={status === 'sending'} className={`${btnPrimary} self-start disabled:opacity-60`}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p role="status" aria-live="polite" className="m-0 min-h-6">
            {status === 'sent' && <span className="text-[#7BD88F]">Thanks, your message is on its way. I'll get back to you soon.</span>}
            {status === 'error' && <span className="text-[#FF9C9C]">Couldn't send that ({error}). Email me directly at {site.email}.</span>}
          </p>
        </form>
      </div>
    </Page>
  )
}
