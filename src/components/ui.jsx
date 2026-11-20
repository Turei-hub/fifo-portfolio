import { useEffect } from 'react'

export function Page({ title, children }) {
  useEffect(() => {
    document.title = title ? `${title} | Turei Milner` : 'Turei Milner | FIFO / Mining Portfolio'
    window.scrollTo(0, 0)
  }, [title])
  return <main className="mx-auto max-w-6xl px-6 py-16 md:py-20 flex flex-col gap-10">{children}</main>
}

export function Eyebrow({ children }) {
  return <p className="m-0 text-accent font-semibold tracking-[2px] text-sm uppercase">{children}</p>
}

export function H2({ children }) {
  return <h2 className="m-0 font-display font-extrabold text-5xl md:text-6xl leading-none uppercase">{children}</h2>
}

export function H3({ children, className = '' }) {
  return <h3 className={`m-0 font-display font-bold text-3xl leading-tight ${className}`}>{children}</h3>
}

export function Card({ children, className = '' }) {
  return <div className={`bg-panel border border-line rounded-md p-6 flex flex-col gap-2 ${className}`}>{children}</div>
}

export function PageHeader({ eyebrow, title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2>{title}</H2>
      {children && <p className="m-0 text-soft text-lg max-w-3xl">{children}</p>}
    </div>
  )
}

const paths = {
  download: <><path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M5 21h14" /></>,
  tree: <><path d="M12 2l7 10H5z" /><path d="M12 8l7 10H5z" /><path d="M12 18v4" /></>,
  build: <><path d="M3 21h18" /><path d="M5 21V10l7-5 7 5v11" /><path d="M10 21v-6h4v6" /></>,
  box: <><rect x="3" y="7" width="18" height="13" rx="1" /><path d="M3 11h18" /><path d="M9 7V4h6v3" /></>,
  code: <><path d="M8 7l-5 5 5 5" /><path d="M16 7l5 5-5 5" /><path d="M14 4l-4 16" /></>,
  external: <><path d="M7 17L17 7" /><path d="M8 7h9v9" /></>,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  close: <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>,
}

export function Icon({ name, size = 18, className = '' }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[name]}
    </svg>
  )
}

export const btnPrimary = 'inline-flex items-center gap-2 bg-accent !text-ink font-semibold px-5 py-3.5 rounded min-h-11 no-underline hover:bg-accent2 transition-colors cursor-pointer border-0'
export const btnGhost = 'inline-flex items-center gap-2 bg-transparent !text-paper border border-line2 font-semibold px-5 py-3.5 rounded min-h-11 no-underline hover:border-paper transition-colors cursor-pointer'
