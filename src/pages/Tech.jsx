import { projects, site } from '../data'
import { Page, PageHeader, Icon } from '../components/ui'

export default function Tech() {
  return (
    <Page title="Tech Work">
      <PageHeader eyebrow="KAUPEKA DIGITAL" title="Tech & software work">
        Proof I can learn complex systems from scratch. I run my own digital studio and build real products for real clients.
      </PageHeader>

      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))]">
        {projects.map((p) => (
          <article key={p.name} className="bg-panel border border-line rounded-md p-5 flex flex-col gap-2.5">
            {p.imgs.map((img) => (
              <img key={img.src} src={img.src} alt={img.alt} loading="lazy"
                className="w-full aspect-[16/10] object-cover object-top rounded border border-line block" />
            ))}
            <span className="text-accent text-[13px] font-semibold tracking-wider pt-1">{p.tag}</span>
            <h3 className="m-0 font-display font-bold text-[26px] leading-tight">{p.name}</h3>
            <p className="m-0 text-mute">{p.detail}</p>
            {p.url && (
              <a href={p.url} target="_blank" rel="noopener" className="font-semibold inline-flex items-center gap-1.5 min-h-11 mt-auto">
                {p.linkLabel} <Icon name="external" size={16} />
              </a>
            )}
          </article>
        ))}
      </div>

      <p className="m-0 text-soft"><strong>Stack:</strong> React, Vite, Tailwind, Node.js, Express, Postgres (Neon), MongoDB, Vercel, Git/GitHub, Docker, Jira, Figma</p>
      <p className="m-0 flex flex-wrap gap-5 font-semibold">
        <a href={site.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        <a href={site.github} target="_blank" rel="noopener">github.com/Turei-hub</a>
        <a href={site.devPortfolio} target="_blank" rel="noopener">turei.dev</a>
        <a href={site.studio} target="_blank" rel="noopener">kaupekadigital.com</a>
      </p>
    </Page>
  )
}
