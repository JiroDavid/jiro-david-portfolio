'use client'

import { skills } from '@/data/skills'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Skills() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="skills" ref={ref} className="reveal px-7 py-9 border-b border-dark-border">

      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-[9px] text-brick">スキル</span>
        <span className="text-[9px] tracking-widest text-sage">SKILLS</span>
        <span className="section-rule" />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
        {skills.map(({ name, icon, highlight }) => (
          <div
            key={name}
            className={`flex flex-col items-center justify-center py-4 px-2 border text-center transition-colors duration-150 ${
              highlight
                ? 'border-cream'
                : 'border-dark-border hover:border-muted'
            }`}
          >
            <i
              className={`ti ti-${icon} text-[20px] mb-1.5 block ${
                highlight ? 'text-brick' : 'text-dim'
              }`}
              aria-hidden="true"
            />
            <span
              className={`text-[8px] tracking-wide ${
                highlight ? 'text-cream' : 'text-muted'
              }`}
            >
              {name}
            </span>
          </div>
        ))}
      </div>

    </section>
  )
}
