import { IconConfig, WorkspaceTheme } from '@/data/workspaces'

interface Props {
  icon: IconConfig
  theme: WorkspaceTheme
  onOpen: () => void
}

export default function DesktopIcon({ icon, theme, onOpen }: Props) {
  return (
    <button
      className="desktop-icon"
      onClick={icon.dim ? undefined : onOpen}
      title={icon.dim ? 'Coming soon' : `Click to open ${icon.label}`}
      style={{
        background: 'rgba(0,0,0,0.62)',
        border: '1px solid rgba(255,255,255,0.07)',
        cursor: icon.dim ? 'default' : 'pointer',
        opacity: icon.dim ? 0.45 : 1,
        color: theme.a1,
        fontFamily: 'inherit',
      } as React.CSSProperties}
    >
      <i
        className={`ti ${icon.icon}`}
        style={{ fontSize: '28px', color: icon.dim ? theme.muted : theme.a2, display: 'block' }}
        aria-hidden="true"
      />
      <span style={{ fontSize: '9px', letterSpacing: '0.05em', color: theme.a1, lineHeight: 1.3, wordBreak: 'break-all' }}>
        {icon.label}
      </span>
    </button>
  )
}
