import { certificates, quals, units } from '../data'
import { useTickets, expiryInfo, formatDate, toneClass, CATEGORY_LABELS } from '../lib/tickets'
import { Page, PageHeader, H3 } from '../components/ui'

export default function Certificates() {
  const tickets = useTickets()
  return (
    <Page title="Certificates">
      <PageHeader eyebrow="TICKETS, LICENCES & QUALIFICATIONS" title="Certificates & achievements" />

      <section className="flex flex-col gap-3.5">
        <H3>Tickets &amp; licences</H3>
        <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {tickets.map((t) => {
            const exp = expiryInfo(t.expires)
            return (
              <div key={t.id ?? t.name} className="bg-panel border border-line rounded-md px-5 py-4 flex flex-col gap-2">
                {t.image_url && (
                  <a href={t.image_url} target="_blank" rel="noopener" className="block">
                    <img src={t.image_url} alt={`Photo of ${t.name}`} loading="lazy"
                      className="w-full aspect-[16/10] object-cover rounded border border-line block" />
                  </a>
                )}
                <span className="text-accent text-xs font-semibold tracking-wider uppercase">
                  {CATEGORY_LABELS[t.category] || 'Ticket'}{t.issuer ? ` · ${t.issuer}` : ''}
                </span>
                <span className="font-semibold">{t.name}</span>
                <div className="flex flex-wrap gap-1.5">
                  {t.status && <span className="text-[13px] font-semibold px-2.5 py-0.5 rounded-full bg-line">{t.status}</span>}
                  {t.achieved && <span className="text-[13px] font-semibold px-2.5 py-0.5 rounded-full bg-line">Achieved {formatDate(t.achieved)}</span>}
                  {exp && <span className={`text-[13px] font-semibold px-2.5 py-0.5 rounded-full ${toneClass[exp.tone]}`}>{exp.label}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3.5">
        <H3>Certificates</H3>
        <figure className="m-0 bg-panel border border-line rounded-md p-4 flex flex-col gap-3">
          <img src="/img/certs-desk.webp" alt="Turei's two Mission Ready certificates, Full Stack Developer and Tech Career Launchpad, on his desk under a Congrats Grad banner"
            loading="lazy" className="w-full max-h-[520px] object-cover rounded block" />
          <figcaption className="text-mute text-sm">Both Mission Ready certificates on the desk where I study and build.</figcaption>
        </figure>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
          {certificates.map((c) => (
            <figure key={c.title} className="m-0 bg-panel border border-line rounded-md p-4 flex flex-col gap-3">
              <img src={c.img} alt={c.alt} loading="lazy" className="w-full aspect-[4/3] object-cover rounded block" />
              <figcaption className="flex flex-col gap-1">
                <span className="text-accent text-[13px] font-semibold tracking-wider">{c.label}</span>
                <span className="font-display font-bold text-2xl leading-tight">{c.title}</span>
                <span className="text-mute">{c.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3.5">
        <H3>Qualifications</H3>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {quals.map((q) => (
            <div key={q.title} className="bg-panel border border-line rounded-md p-6 flex flex-col gap-2">
              <span className="text-accent text-[13px] font-semibold tracking-wider">{q.issuer}</span>
              <span className="font-display font-bold text-2xl leading-tight">{q.title}</span>
              <span className="text-mute">{q.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3.5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <H3>NZQA Record of Achievement</H3>
          <a href="https://www.nzqa.govt.nz/" target="_blank" rel="noopener" className="font-semibold">Verifiable with NZQA</a>
        </div>
        <p className="m-0 text-soft max-w-3xl">90+ unit standards achieved across forestry, construction, safety and machinery. Highlights below; full record available on request.</p>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">
          {units.map((g) => (
            <div key={g.title} className="bg-panel border border-line rounded-md p-6 flex flex-col gap-3">
              <div className="flex justify-between items-baseline gap-3">
                <span className="font-display font-bold text-[26px] leading-tight">{g.title}</span>
                <span className="text-accent text-[13px] font-semibold tracking-wider whitespace-nowrap">{g.years}</span>
              </div>
              <span className="text-mute text-sm">{g.summary}</span>
              <ul className="m-0 pl-4.5 flex flex-col gap-1.5 text-[#E2E0DA]">
                {g.items.map((u) => <li key={u}>{u}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Page>
  )
}
