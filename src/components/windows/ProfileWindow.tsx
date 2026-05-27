import { WorkspaceTheme } from '@/data/workspaces'

const stats = [
  { label: 'FRONTEND', width: '85%', accent: 'a3' },
  { label: 'BACKEND',  width: '80%', accent: 'a3' },
  { label: 'AI / ML',  width: '75%', accent: 'a2' },
  { label: 'DESIGN',   width: '60%', accent: 'a3' },
] as const

export default function ProfileWindow({ theme }: { theme: WorkspaceTheme }) {
  return (
    <div>
      <p className="panel-label" style={{ color: theme.a3 }}>PROFILE</p>

      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '18px', gap: '14px' }}>
        <img
          src="/assets/jiro.JPG"
          alt="Jiro David"
          style={{
            width: '120px',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '6px',
            border: `1px solid ${theme.border}`,
            flexShrink: 0,
          }}
        />
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, lineHeight: 1.05, marginBottom: '4px', color: theme.a1 }}>
            JIRO<br />DAVID
          </h1>
          <p style={{ fontSize: '9px', color: theme.a2, letterSpacing: '0.12em' }}>
            ◆ FULL-STACK DEVELOPER
          </p>
        </div>
      </div>

      {stats.map(({ label, width, accent }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '11px' }}>
          <span style={{ fontSize: '8px', letterSpacing: '0.08em', color: theme.muted, width: '74px', flexShrink: 0 }}>
            {label}
          </span>
          <div className="stat-track">
            <div className="stat-fill" style={{ width, background: theme[accent] }} />
          </div>
        </div>
      ))}

      <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: theme.muted, marginBottom: '7px' }}>
          <span>EDUCATION</span>
          <span>UAL · BSc CS · 2026</span>
        </div>
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
          <div style={{ height: '100%', width: '68%', background: theme.a2, borderRadius: '2px' }} />
        </div>
      </div>

      <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '9px', color: theme.muted, lineHeight: 1.6 }}>
        CS graduate from UAL. I build tools for the creator and gaming spaces — full-stack apps with ML pipelines baked in.
      </div>
    </div>
  )
}
