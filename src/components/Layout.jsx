import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { site } from '../data'
import { Icon } from './ui'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/fifo', label: 'FIFO' },
  { to: '/experience', label: 'Experience' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/tech', label: 'Tech Work' },
  { to: '/contact', label: 'Contact' },
]

const linkClass = ({ isActive }) =>
  `font-semibold text-[15px] px-3.5 py-2.5 rounded min-h-11 inline-flex items-center no-underline transition-colors ${
    isActive ? 'bg-accent !text-ink' : '!text-paper hover:bg-panel'
  }`

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-accent focus:!text-ink">Skip to content</a>
      <header className="sticky top-0 z-10 bg-ink/95 backdrop-blur border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-3.5 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 !text-paper no-underline min-h-11" onClick={() => setOpen(false)}>
            <span className="w-9 h-9 bg-accent text-ink flex items-center justify-center font-display font-extrabold text-xl rounded">TM</span>
            <span className="font-display font-bold text-2xl tracking-wide">TUREI MILNER</span>
          </Link>
          <nav aria-label="Main" className="hidden md:flex gap-1">
            {nav.map((n) => <NavLink key={n.to} to={n.to} end className={linkClass}>{n.label}</NavLink>)}
          </nav>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded border border-line2 bg-transparent text-paper cursor-pointer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
        {open && (
          <nav aria-label="Mobile" className="md:hidden border-t border-line px-6 py-3 flex flex-col gap-1">
            {nav.map((n) => <NavLink key={n.to} to={n.to} end className={linkClass} onClick={() => setOpen(false)}>{n.label}</NavLink>)}
          </nav>
        )}
      </header>

      <div id="content" key={pathname} className="flex-1">
        <Outlet />
      </div>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-wrap justify-between gap-3 text-mute text-sm">
          <span>{site.fullName} · Nō Mangatū, Tairāwhiti</span>
          <span className="flex flex-wrap gap-4">
            <a href={site.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href={site.github} target="_blank" rel="noopener">GitHub</a>
            <span>Bush to Browser</span>
          </span>
        </div>
      </footer>
    </div>
  )
}
