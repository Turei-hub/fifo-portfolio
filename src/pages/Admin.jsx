import { useEffect, useState } from 'react'
import { Page, PageHeader, H3, btnPrimary, btnGhost } from '../components/ui'
import { CATEGORY_LABELS, expiryInfo, formatDate, toneClass } from '../lib/tickets'

const field = 'bg-ink border border-line2 rounded px-3 py-2.5 text-paper font-[inherit] min-h-11 w-full box-border'
const label = 'flex flex-col gap-1.5 font-medium text-sm'
const EMPTY = { name: '', category: 'ticket', issuer: '', status: '', achieved: '', expires: '', image_url: '', sort_order: 0 }

async function api(path, opts = {}) {
  const res = await fetch(path, {
    ...opts,
    headers: opts.body ? { 'Content-Type': 'application/json' } : undefined,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Error ${res.status}`)
  return data
}

// Shrink a photo in the browser to max 1600px JPEG before uploading.
function resizeToBase64(file) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const scale = Math.min(1, 1600 / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.85).split(',')[1])
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Couldn't read that image")) }
    img.src = url
  })
}

export default function Admin() {
  const [authed, setAuthed] = useState(null)

  useEffect(() => {
    let m = document.querySelector('meta[name="robots"]')
    if (!m) { m = document.createElement('meta'); m.name = 'robots'; document.head.appendChild(m) }
    m.content = 'noindex, nofollow'
    api('/api/login').then((d) => setAuthed(d.authed)).catch(() => setAuthed(false))
    return () => { m.content = 'index, follow' }
  }, [])

  return (
    <Page title="Admin">
      {authed === null && <p className="text-mute">Loading…</p>}
      {authed === false && <Login onDone={() => setAuthed(true)} />}
      {authed && <Dashboard onLogout={() => setAuthed(false)} />}
    </Page>
  )
}

function Login({ onDone }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true); setError('')
    try { await api('/api/login', { method: 'POST', body: { password } }); onDone() }
    catch (err) { setError(err.message) }
    finally { setBusy(false) }
  }

  return (
    <>
      <PageHeader eyebrow="ADMIN" title="Log in" />
      <form onSubmit={submit} className="bg-panel border border-line rounded-md p-7 flex flex-col gap-4 max-w-md">
        <label className={label}>Password
          <input type="password" autoComplete="current-password" required value={password}
            onChange={(e) => setPassword(e.target.value)} className={field} />
        </label>
        <button type="submit" disabled={busy} className={`${btnPrimary} self-start disabled:opacity-60`}>{busy ? 'Checking…' : 'Log in'}</button>
        <p role="alert" className="m-0 min-h-6 text-[#FF9C9C]">{error}</p>
      </form>
    </>
  )
}

function Dashboard({ onLogout }) {
  const [tickets, setTickets] = useState([])
  const [editing, setEditing] = useState(null) // null | 'new' | ticket
  const [error, setError] = useState('')

  const load = () => api('/api/tickets').then((d) => setTickets(d.tickets)).catch((e) => setError(e.message))
  useEffect(() => { load() }, [])

  async function remove(t) {
    if (!window.confirm(`Delete "${t.name}"?`)) return
    try { await api(`/api/tickets?id=${t.id}`, { method: 'DELETE' }); load() }
    catch (e) { setError(e.message) }
  }

  async function logout() {
    await api('/api/login', { method: 'DELETE' }).catch(() => {})
    onLogout()
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageHeader eyebrow="ADMIN" title="Tickets & licences">
          Changes show on the Certificates page within about 30 seconds.
        </PageHeader>
        <div className="flex gap-3">
          <button type="button" className={btnPrimary} onClick={() => setEditing('new')}>Add new</button>
          <button type="button" className={btnGhost} onClick={logout}>Log out</button>
        </div>
      </div>

      {error && <p role="alert" className="m-0 text-[#FF9C9C]">{error}</p>}

      {editing && (
        <TicketForm
          key={editing === 'new' ? 'new' : editing.id}
          initial={editing === 'new' ? { ...EMPTY, sort_order: (tickets.at(-1)?.sort_order ?? 0) + 10 } : editing}
          onCancel={() => setEditing(null)}
          onSaved={() => { setEditing(null); load() }}
        />
      )}

      <ul className="list-none m-0 p-0 flex flex-col gap-3">
        {tickets.map((t) => {
          const exp = expiryInfo(t.expires)
          return (
            <li key={t.id} className="bg-panel border border-line rounded-md p-4 flex flex-wrap items-center gap-4">
              {t.image_url
                ? <img src={t.image_url} alt="" className="w-20 h-14 object-cover rounded border border-line" />
                : <div className="w-20 h-14 rounded border border-dashed border-line2" aria-hidden="true" />}
              <div className="flex-1 min-w-[200px] flex flex-col gap-1">
                <span className="text-accent text-xs font-semibold tracking-wider uppercase">
                  {CATEGORY_LABELS[t.category]}{t.issuer ? ` · ${t.issuer}` : ''}
                </span>
                <span className="font-semibold">{t.name}</span>
                <span className="text-mute text-sm flex flex-wrap gap-x-3">
                  {t.status && <span>{t.status}</span>}
                  {t.achieved && <span>Achieved {formatDate(t.achieved)}</span>}
                  {exp && <span className={`px-2 rounded-full ${toneClass[exp.tone]}`}>{exp.label}</span>}
                </span>
              </div>
              <div className="flex gap-2">
                <button type="button" className={btnGhost} onClick={() => setEditing(t)}>Edit</button>
                <button type="button" className={`${btnGhost} hover:!border-[#FF9C9C]`} onClick={() => remove(t)}>Delete</button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

function TicketForm({ initial, onCancel, onSaved }) {
  const [t, setT] = useState({ ...EMPTY, ...initial, issuer: initial.issuer || '', status: initial.status || '', achieved: initial.achieved || '', expires: initial.expires || '', image_url: initial.image_url || '' })
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const set = (k) => (e) => setT({ ...t, [k]: e.target.value })

  async function pickPhoto(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true); setError('')
    try {
      const data = await resizeToBase64(file)
      const { url } = await api('/api/upload', { method: 'POST', body: { filename: file.name, contentType: 'image/jpeg', data } })
      setT((prev) => ({ ...prev, image_url: url }))
    } catch (err) { setError(err.message) }
    finally { setUploading(false); e.target.value = '' }
  }

  async function save(e) {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      if (t.id) await api(`/api/tickets?id=${t.id}`, { method: 'PUT', body: t })
      else await api('/api/tickets', { method: 'POST', body: t })
      onSaved()
    } catch (err) { setError(err.message) }
    finally { setBusy(false) }
  }

  return (
    <form onSubmit={save} className="bg-panel border-2 border-accent rounded-md p-6 flex flex-col gap-4">
      <H3>{t.id ? 'Edit' : 'Add'} ticket</H3>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
        <label className={label}>Name *
          <input required maxLength={120} value={t.name} onChange={set('name')} placeholder="e.g. White Card (WA)" className={field} />
        </label>
        <label className={label}>Type
          <select value={t.category} onChange={set('category')} className={field}>
            {Object.entries(CATEGORY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
        <label className={label}>Issued by
          <input maxLength={120} value={t.issuer} onChange={set('issuer')} placeholder="e.g. WorkSafe WA" className={field} />
        </label>
        <label className={label}>Status note
          <input maxLength={120} value={t.status} onChange={set('status')} placeholder="e.g. Current, or Booked for March" className={field} />
        </label>
        <label className={label}>Date achieved
          <input type="date" value={t.achieved} onChange={set('achieved')} className={field} />
        </label>
        <label className={label}>Expiry date (leave blank if none)
          <input type="date" value={t.expires} onChange={set('expires')} className={field} />
        </label>
        <label className={label}>Order (lower shows first)
          <input type="number" value={t.sort_order} onChange={set('sort_order')} className={field} />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {t.image_url && <img src={t.image_url} alt="Ticket photo preview" className="w-40 h-28 object-cover rounded border border-line" />}
        <label className={`${btnGhost} relative`}>
          {uploading ? 'Uploading…' : t.image_url ? 'Replace photo' : 'Add photo of the card'}
          <input type="file" accept="image/*" onChange={pickPhoto} disabled={uploading} className="absolute inset-0 opacity-0 cursor-pointer" />
        </label>
        {t.image_url && <button type="button" className={btnGhost} onClick={() => setT({ ...t, image_url: '' })}>Remove photo</button>}
      </div>
      <p className="m-0 text-mute text-sm">Cover up any card or licence numbers before you take the photo.</p>

      <div className="flex gap-3">
        <button type="submit" disabled={busy || uploading} className={`${btnPrimary} disabled:opacity-60`}>{busy ? 'Saving…' : 'Save'}</button>
        <button type="button" className={btnGhost} onClick={onCancel}>Cancel</button>
      </div>
      <p role="alert" className="m-0 min-h-6 text-[#FF9C9C]">{error}</p>
    </form>
  )
}
