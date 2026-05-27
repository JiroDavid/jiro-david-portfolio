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
      {icon.customIcon ? (
        <img
          src={icon.customIcon}
          alt={icon.label}
          style={{ width: '28px', height: '28px', objectFit: 'contain', display: 'block', margin: '0 auto', opacity: icon.dim ? 0.4 : 1 }}
        />
      ) : (
        <i
          className={`ti ${icon.icon}`}
          style={{ fontSize: '28px', color: ico