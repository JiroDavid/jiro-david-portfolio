import { WorkspaceTheme } from '@/data/workspaces'

const rows = [
  { icon: 'ti-mail',          label: 'EMAIL',    value: 'jirodavid153@gmail.com',    href: 'mailto:jirodavid153@gmail.com' },
  { icon: 'ti-brand-github',  label: 'GITHUB',   value: 'github.com/JiroDavid',       href: 'https://github.com/JiroDavid' },
  { icon: 'ti-brand-linkedin',label: 'LINKEDIN', value: 'linkedin.com/in/jirodavid',  href: 'https://linkedin.com/in/jirodavid' },
  { icon: 'ti-map-pin',       label: 'LOCATION', value: 'London, UK · open to remote', href: undefined },
]

export default function ContactWindow({ theme }: { theme: WorkspaceTheme }) {
  return (
    <div>
      <p className="panel-label" style={{ color: theme.a3 }}>CONTACT</p>

      {rows.map(({ icon, label, value, href }) => (
        <div key={label} style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <i className={`ti ${icon}`} style={{ fontSize: '18px', color: theme.a2, width: '22px', textAlign: 'center' }} aria-hidden="true" />
          <div>
            <p style={{ fontSize: '8px', letterSpacing: '0.1em', color: theme.muted, marginBottom: '2px' }}>{label}</p>
            {href ? (
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                style={{ fontSize: '10px', color: theme.a1, textDecoration: 'none' }}
              >
                {value}
              </a>
            ) : (
              <p style={{ fontSize: '10px', color: theme.a1 }}>{value}</p>
            )}
          </div>
        </div>
      ))}

      <div style={{ marginTop: '16px', fontSize: '9px', color: theme.muted }}>
        <span style={{ color: theme.a1, fontWeight: 700 }}>Open to junior dev roles</span>
        {' '}· available Jul 2026
        <span className="blink-cursor" style={{ color: theme.a2 }} aria-hidden="true" />
      </div>
    </div>
  )
}
