import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { site, roles } from '../data'
import { Icon, btnGhost } from '../components/ui'
import CvButton from '../components/CvButton'

const tiles = [
  { to: '/experience', icon: 'tree', title: 'FORESTRY & BUSH', body: '15 years felling and breaking out in Gisborne forestry.' },
  { to: '/experience', icon: 'build', title: 'CONSTRUCTION', body: '10+ years on NZ construction sites, working to plans and specs.' },
  { to: '/experience', icon: 'box', title: 'STORES & DISPATCH', body: 'Picking, dispatch and stocktake on the Pronto Xi ERP system.' },
  { to: '/tech', icon: 'code', title: 'SYSTEMS & TECH', body: 'Full stack developer. Learns new systems fast and builds his own.' },
]

export default function Home() {
  useEffect(() => { document.title = 'Turei Milner | FIFO / Mining Portfolio' }, [])

  const facts = [
    ['Based', site.location],
    ['Experience', '25+ yrs forestry & construction'],
    ['Work type', 'FIFO / DIDO / Residential'],
    ['Targeting', roles.slice(0, 3).map((r) => r.title.replace('Entry Level ', '')).join(' · ')],
    ['Roster', site.roster],
    ['Available', site.startDate],
    ['Licence', 'NZ Full Licence, Class 1'],
  ].filter(([, v]) => v)

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pt-16 md:pt-20 pb-12 flex flex-wrap gap-12 items-center">
        <div className="flex-[999_1_520px] min-w-0 flex flex-col gap-5">
          <p className="m-0 text-accent font-semibold tracking-[2px] text-sm">BUSH TO BROWSER</p>
          <h1 className="m-0 font-display font-extrabold text-5xl sm:text-6xl md:text-[76px] leading-[0.95] uppercase">
            Hard yards in the bush. Sharp on the tools and the systems.
          </h1>
          <p className="m-0 text-soft text-lg md:text-[19px] max-w-2xl">
            Tree faller, bushman, construction hand and warehouse dispatcher, now also a qualified full stack developer.
            Based in Kalgoorlie, WA and ready for FIFO or DIDO work.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <CvButton />
            <Link to="/contact" className={btnGhost}>Get in touch</Link>
          </div>
        </div>

        <div className="flex-[1_1_340px] min-w-0 bg-panel border border-line rounded-md p-7 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <img src="/img/headshot.jpg" alt="Turei Milner" width="88" height="88"
              className="w-22 h-22 rounded-full object-cover border-2 border-accent" />
            <div>
              <p className="m-0 font-display font-bold text-2xl leading-tight">{site.name}</p>
              <p className="m-0 text-mute text-sm">Entry level · ready to start</p>
            </div>
          </div>
          <dl className="m-0 flex flex-col gap-3.5">
            {facts.map(([k, v], i) => (
              <div key={k} className={`flex justify-between gap-4 ${i < facts.length - 1 ? 'border-b border-line pb-3' : ''}`}>
                <dt className="text-mute">{k}</dt>
                <dd className="m-0 font-semibold text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
          {tiles.map((t) => (
            <Link key={t.title} to={t.to}
              className="bg-panel border border-line rounded-md p-6 !text-paper no-underline flex flex-col gap-2.5 hover:border-accent transition-colors">
              <Icon name={t.icon} size={28} className="text-accent" />
              <span className="font-display font-bold text-2xl">{t.title}</span>
              <span className="text-mute">{t.body}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
