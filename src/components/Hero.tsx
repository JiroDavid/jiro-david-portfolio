import Panel from './Panel'
import { projectLog } from '@/data/projects'

const stats = [
  { label: 'FRONTEND', width: '85%', color: 'stat-fill-sage'  },
  { label: 'BACKEND',  width: '80%', color: 'stat-fill-sage'  },
  { label: 'AI / ML',  width: '75%', color: 'stat-fill-brick' },
  { label: 'DESIGN',   width: '60%', color: 'stat-fill-sage'  },
]

const badgeStyles = {
  done:   'border border-dim   text-dim',
  active: 'border border-sage  text-sage',
  new:    'border border-brick text-brick',
}

const badgeLabels = {
  done:   'COMPLETE',
  active: 'IN PROGRESS',
  new:    'COMING SOON',
}

const dotStyles = {
  done:   'bg-cream opacity-40',
  active: 'bg-sage',
  new:    'bg-brick',
}

export default function Hero() {
  return (
    <section id="home" className="px-7 py-8 border-b border-dark-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ── Left: Profile ── */}
        <Panel className="p-6">
          <p className="text-[8px] tracking-widest text-sage mb-5 flex items-center gap-2">
            PROFILE
            <span className="section-rule" />
          </p>

          <h1 className="text-[28px] font-bold leading-tight mb-1 text-cream">
            JIRO<br />DAVID
          </h1>
          <p className="text-[9px] tracking-widest text-brick mb-7">
            ◆ FULL-STACK DEVELOPER
          </p>

          {stats.map(({ label, width, color }) => (
            <div key={label} className="flex items-center gap-3 mb-3">
              <span className="text-[8px] tracking-wide text-muted w-20 shrink-0">
                {label}
              </span>
              <div className="stat-track">
                <div className={`h-full ${color}`} style={{ width }} />
              </div>
            </div>
          ))}

          <div className="mt-6 pt-5 border-t border-dark-border">
            <div className="flex justify-between text-[8px] text-muted mb-2">
              <span>EDUCATION</span>
              <span>UAL · BSc CS · 2026</span>
            </div>
            <div className="h-1 bg-[#1c1b16]">
              <div className="h-full bg-brick" style={{ width: '68%' }} />
            </div>
          </div>
        </Panel>

        {/* ── Right: Project Log ── */}
        <Panel className="p-6">
          <p className="text-[8px] tracking-widest text-sage mb-5 flex items-center gap-2">
            PROJECT LOG
            <span className="section-rule" />
          </p>

          <div className="space-y-0">
            {projectLog.map((entry, i) => (
              <div
                key={i}
                className="flex gap-3 py-4 border-b border-dark-border last:border-b-0"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1 ${dotStyles[entry.status]}`}
                />
                <div>
                  <p className="text-[11px] font-bold text-cream mb-0.5">
                    {entry.title}
                  </p>
                  <p className="text-[8px] text-muted leading-relaxed">
                    {entry.tech}
                  </p>
                  <span
                    className={`inline-block text-[7px] tracking-widest px-1.5 py-0.5 mt-1.5 ${badgeStyles[entry.status]}`}
                  >
                    {badgeLabels[entry.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-dark-border text-[8px] text-muted tracking-wide">
            <span className="text-cream font-bold">Open to dev roles</span>
            {' '}· London / Remote
            <span className="blink-cursor" aria-hidden="true" />
          </div>
        </Panel>

      </div>
    </section>
  )
}
