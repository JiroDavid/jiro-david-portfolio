'use client'

import { useState, useEffect } from 'react'

const links = [
  { label: 'HOME',     href: '#home'     },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS',   href: '#skills'   },
  { label: 'CONTACT',  href: '#contact'  },
]

export default function Nav() {
  const [active, setActive] = useState('HOME')

  useEffect(() => {
    const sections = ['home', 'projects', 'skills', 'contact']

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.toUpperCase())
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-7 py-4 bg-dark border-b border-dark-border">
      <a
        href="#home"
        className="text-[13px] font-bold tracking-wide text-cream"
        onClick={() => setActive('HOME')}
      >
        JIRO<span className="text-brick">.</span>DEV
      </a>

      <div className="flex gap-0.5">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={() => setActive(label)}
            className={`text-[9px] tracking-widest px-3.5 py-1.5 border transition-colors duration-150 ${
              active === label
                ? 'text-cream border-cream'
                : 'text-muted border-transparent hover:text-cream'
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
