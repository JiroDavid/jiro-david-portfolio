import { WorkspaceTheme } from '@/data/workspaces'

export default function CvWindow({ theme }: { theme: WorkspaceTheme }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '10px' }}>
      <div style={{ flex: 1, minHeight: 0, borderRadius: '4px', overflow: 'hidden', border: `1px solid ${theme.border}33` }}>
        <iframe
          src="/assets/jiro-david-cv.pdf"
          style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
          title="Jiro David CV"
        />
      </div>
      <a
        href="/assets/jiro-david-cv.pdf"
        download
        style={{
          display: 'block',
          textAlign: 'center',
          fontSize: '9px',
          letterSpacing: '0.12em',
          color: theme.a1,
          textDecoration: 'none',
          padding: '8px 0',
          border: `1px solid ${theme.border}`,
          borderRadius: '4px',
          transition: 'opacity 0.15s',
          flexShrink: 0,
        }}
      >
        &#8595; DOWNLOAD CV
      </a>
    </div>
  )
}
