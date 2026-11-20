import { jobs } from '../data'
import { Page, PageHeader } from '../components/ui'

export default function Experience() {
  return (
    <Page title="Experience">
      <PageHeader eyebrow="WORK HISTORY" title="Work experience" />
      <ol className="list-none m-0 p-0 border-l-2 border-line ml-2">
        {jobs.map((j) => (
          <li key={j.role} className="relative pl-8 pb-8">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-accent border-[3px] border-ink" aria-hidden="true" />
            {j.dates && <p className="m-0 text-mute text-sm font-semibold tracking-wider">{j.dates}</p>}
            <h3 className="mt-1 mb-0.5 font-display font-bold text-3xl leading-tight">{j.role}</h3>
            <p className="m-0 mb-2 text-soft font-medium">{j.place}</p>
            <ul className="m-0 pl-5 text-mute max-w-3xl flex flex-col gap-1">
              {j.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </li>
        ))}
      </ol>
      <p className="m-0 text-mute">Referees available on request.</p>
    </Page>
  )
}
