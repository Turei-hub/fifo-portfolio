import { Link } from 'react-router-dom'
import { roles, strengths } from '../data'
import { Page, PageHeader, H3, Card, btnPrimary } from '../components/ui'

export default function Fifo() {
  return (
    <Page title="FIFO / DIDO">
      <PageHeader eyebrow="FIFO / DIDO · MINING" title="What I bring to site">
        Living in Kalgoorlie, so I can get to a FIFO departure or a DIDO site without needing to relocate.
        Used to long days, hard physical work and doing things the safe way.
      </PageHeader>

      <div className="flex flex-col gap-4">
        <H3 className="text-4xl">Roles I'm applying for</H3>
        <p className="m-0 text-mute max-w-3xl">Entry level and ready to learn the site's way of doing things. In order of preference:</p>
        <ol className="list-none m-0 p-0 grid gap-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {roles.map((r, i) => (
            <li key={r.title}
              className={`bg-panel rounded-md p-6 flex flex-col gap-2 ${r.top ? 'border-2 border-accent' : 'border border-line'}`}>
              <div className="flex justify-between items-center gap-3">
                <span className="font-display font-extrabold text-4xl leading-none text-accent">{String(i + 1).padStart(2, '0')}</span>
                {r.top && <span className="text-xs font-bold tracking-wider px-2.5 py-1 rounded-full bg-accent text-ink">TOP PICK</span>}
              </div>
              <span className="font-display font-bold text-[26px] leading-tight">{r.title}</span>
              <span className="text-soft text-[15px]">{r.scope}</span>
              <span className="text-mute text-[13px] font-semibold tracking-wider pt-1">WHY I FIT</span>
              <span className="text-[#E2E0DA] text-[15px]">{r.why}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-4">
        <H3 className="text-4xl">What I bring</H3>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {strengths.map((s) => (
            <Card key={s.title}>
              <H3 className="text-[26px]">{s.title}</H3>
              <p className="m-0 text-mute">{s.body}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-[#241A12] border border-[#5A3A1E] rounded-md px-6 py-5 flex flex-wrap gap-3 items-center justify-between">
        <p className="m-0"><strong>Site-ready:</strong> happy to complete a pre-employment medical and drug &amp; alcohol test. White Card and first aid refresh to be done on arrival in WA.</p>
        <Link to="/certificates" className={btnPrimary}>See tickets</Link>
      </div>
    </Page>
  )
}
