import { WorkspaceTheme } from '@/data/workspaces'
import { projectLog } from '@/data/projects'

const dotColor = {
  done:   { bg: 'a1', opacity: 0.35 },
  active: { bg: 'a3', opacity: 1 },
  new:    { bg: 'a2', opacity: 1 },
} as const

const badgeColor = {
  done:   'rgba(255,255,255,0.18)',
  active: 'a3',
  new:    'a2',
} as const

const badgeLabel = {
  done:   'COMPLETE',
  active: 'IN PROGRESS',
  new:    'COMING SOON',
} as const

export default function ProjectLogWindow({ theme }: { theme: WorkspaceTheme }) {
  return (
    <div>
      <p className="panel-label" style={{ color: theme.a3 }}>PROJECT LOG</p>

      {projectLog.map((entry, i) => {
        const dot = dotColor[entry.status]
        const bColor = badgeColor[entry.status] === 'a2' ? theme.a2
          : badgeColor[entry.status] === 'a3' ? theme.a3
          : 'rgba(255,255,255,0.18)'

        return (
          <div key={i} className="log-entry">
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0, marginTop: '3px',
              background: theme[dot.bg as 'a1' | 'a2' | 'a3'],
              opacity: dot.opacity,
              display: 'inline-block',
            }} />
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, color: theme.a1, marginBottom: '2px' }}>
                {entry.title}
              </p>
              <p style={{ fontSize: '8px', color: theme.muted, lineHeight: 1.5 }}>
                {entry.tech}
              </p>
              <span style={{
                display: 'inline-block', fontSize: '7px', letterSpacing: '0.1em',
                padding: '2px 7px', marginTop: '4px',
                border: `1px solid ${bColor}`, borderRadius: '3px',
                color: bColor,
              }}>
                {badgeLabel[entry.status]}
              </span>
            </div>
          </div>
        )
      })}

      <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '9px', color: theme.muted }}>
        <span style={{ color: theme.a1, fontWeight: 700 }}>Open to junior dev roles</span>
        {' '}· London / Remote
        <span className="blink-cursor" style={{ color: theme.a2 }} aria-hidden="true" />
      </div>
    </div>
  )
}
