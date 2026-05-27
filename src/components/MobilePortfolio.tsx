'use client'

import { workspaces } from '@/data/workspaces'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'

const theme = workspaces.home

const contacts = [
  { icon: 'ti-mail',           label: 'EMAIL',    value: 'jirodavid153@gmail.com',   href: 'mailto:jirodavid153@gmail.com' },
  { icon: 'ti-phone',          label: 'PHONE',    value: '07555 979 116',             href: 'tel:07555979116' },
  { icon: 'ti-brand-github',   label: 'GITHUB',   value: 'github.com/JiroDavid',      href: 'https://github.com/JiroDavid' },
  { icon: 'ti-brand-linkedin', label: 'LINKEDIN', value: 'linkedin.com/in/jirodavid', href: 'https://linkedin.com/in/jirodavid' },
  { icon: 'ti-map-pin',        label: 'LOCATION', value: 'London, UK',                href: null },
]

const statBars = [
  { label: 'FRONTEND', width: '85%' },
  { label: 'BACKEND',  width: '80%' },
  { label: 'AI / ML',  width: '75%' },
  { label: 'DESIGN',   width: '60%' },
]

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{ fontSize: '8px', letterSpacing: '0.2em', color: theme.a3, opacity: 0.5, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
      {text}
      <span style={{ flex: 1, height: '1px', background: 'currentColor', opacity: 0.2, display: 'inline-block' }} />
    </p>
  )
}

export default function MobilePortfolio() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflowY: 'auto', overflowX: 'hidden', background: theme.bg, fontFamily: 'var(--font-mono), monospace', color: theme.a1 }}>

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '44px', background: theme.barBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', padding: '0 18px', zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: theme.a1, opacity: 0.7 }}>
          ⬡ JIRO<span style={{ color: theme.a2 }}>.</span>DEV
        </span>
      </div>

      <div style={{ paddingTop: '60px', paddingBottom: '48px' }}>

        <section style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <SectionLabel text="PROFILE" />
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '22px' }}>
            <img
              src="/assets/jiro.JPG"
              alt="Jiro David"
              style={{ width: '90px', height: 'auto', objectFit: 'contain', borderRadius: '6px', border: `1px solid ${theme.border}`, flexShrink: 0 }}
            />
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: 700, lineHeight: 1.05, marginBottom: '6px', color: theme.a1 }}>
                JIRO<br />DAVID
              </h1>
              <p style={{ fontSize: '9px', color: theme.a2, letterSpacing: '0.12em', marginBottom: '6px' }}>◆ FULL-STACK DEVELOPER</p>
              <p style={{ fontSize: '9px', color: theme.muted }}>CS @ UAL · London</p>
            </div>
          </div>
          {statBars.map(({ label, width }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '8px', color: theme.muted, width: '68px', flexShrink: 0 }}>{label}</span>
              <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }}>
                <div style={{ width, height: '100%', background: theme.a3, borderRadius: '2px' }} />
              </div>
            </div>
          ))}
          <p style={{ fontSize: '9px', color: theme.muted, lineHeight: 1.7, marginTop: '16px' }}>
            CS graduate from UAL. I build tools for the creator and gaming spaces — full-stack apps with ML pipelines baked in.
          </p>
        </section>

        <section style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <SectionLabel text="PROJECTS" />
          {projects.map((project) => (
            <div key={project.id} style={{ marginBottom: '18px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '14px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '6px', color: theme.a1 }}>{project.title}</h3>
                <p style={{ fontSize: '9px', color: theme.muted, lineHeight: 1.7, marginBottom: '10px' }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
                  {project.tech.map(tag => (
                    <span key={tag} style={{ fontSize: '8px', padding: '2px 7px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '3px', color: theme.muted }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <a href={project.github} target="_blank" rel="noreferrer" style={{ fontSize: '9px', color: theme.a2, textDecoration: 'none', letterSpacing: '0.06em' }}>↗ GITHUB</a>
                  {project.youtube && (
                    <a href={project.youtube} target="_blank" rel="noreferrer" style={{ fontSize: '9px', color: theme.a2, textDecoration: 'none', letterSpacing: '0.06em' }}>↗ DEMO</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <SectionLabel text="SKILLS" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '18px' }}>
            {skills.map(({ name, icon, customIcon, highlight }) => (
              <div
                key={name}
                style={{ border: `1px solid ${highlight ? theme.border : 'rgba(255,255,255,0.08)'}`, borderRadius: '8px', padding: '10px 4px', textAlign: 'center', opacity: highlight ? 1 : 0.45 }}
              >
                {customIcon ? (
                  <img src={customIcon} alt={name} style={{ width: '20px', height: '20px', objectFit: 'contain', display: 'block', margin: '0 auto 5px' }} />
                ) : (
                  <i className={`ti ti-${icon}`} style={{ fontSize: '20px', color: highlight ? theme.a2 : theme.muted, display: 'block', marginBottom: '5px' }} />
                )}
                <span style={{ fontSize: '7px', letterSpacing: '0.05em', color: highlight ? theme.a1 : theme.muted }}>{name}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '8px', color: theme.muted, lineHeight: 2.2 }}>
            <div><span style={{ color: theme.a3 }}>Languages:</span> Python · TypeScript · JavaScript · SQL</div>
            <div><span style={{ color: theme.a3 }}>Frameworks:</span> FastAPI · Next.js · React · Tailwind</div>
            <div><span style={{ color: theme.a3 }}>AI / ML:</span> Whisper · Ollama · ComfyUI · SDXL</div>
            <div><span style={{ color: theme.a3 }}>Tools:</span> Git · Docker · FFmpeg · REST APIs</div>
          </div>
        </section>

        <section style={{ padding: '24px 20px' }}>
          <SectionLabel text="CONTACT" />
          {contacts.map(({ icon, label, value, href }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <i className={`ti ${icon}`} style={{ fontSize: '18px', color: theme.a2, flexShrink: 0, width: '20px', textAlign: 'center' }} />
              <div>
                <div style={{ fontSize: '7px', color: theme.muted, letterSpacing: '0.1em', marginBottom: '3px' }}>{label}</div>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    style={{ fontSize: '10px', color: theme.a1, textDecoration: 'none' }}
                  >
                    {value}
                  </a>
                ) : (
                  <span style={{ fontSize: '10px', color: theme.a1 }}>{value}</span>
                )}
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  )
}
