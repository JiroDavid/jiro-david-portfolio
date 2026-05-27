import { WorkspaceTheme } from '@/data/workspaces'

export default function CvWindow({ theme }: { theme: WorkspaceTheme }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      height: '100%', minHeight: '160px', gap: '14px',
    }}>
      <i className="ti ti-file-type-pdf" style={{ fontSize: '42px', color: theme.a2, opacity: 0.75 }} aria-hidden="true" />
      <a
        href="/assets/jiro-david-cv.pdf"
        download
        style={{
          fontSize: '9px', letterSpacing: '0.12em', color: theme.a1,
          textDecoration: 'none', padding: '7px 16px',
          border: `1px solid ${theme.border}`, borderRadius: '4px',
          transition: 'opacity 0.15s',
        }}
      >
        DOWNLOAD CV
      </a>
      <span style={{ fontSize: '8px', color: theme.muted }}>jiro-david-cv.pdf</span>
    </div>
  )
}
