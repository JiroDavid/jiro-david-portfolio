import { WorkspaceTheme } from '@/data/workspaces'
import { skills } from '@/data/skills'

export default function SkillsWindow({ theme }: { theme: WorkspaceTheme }) {
  return (
    <div>
      <p className="panel-label" style={{ color: theme.a3 }}>&#12473;&#12461;&#12523; &middot; SKILLS</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '9px', marginBottom: '20px' }}>
        {skills.map(({ name, icon, customIcon, highlight }) => (
          <div
            key={name}
            style={{
              border: `1px solid ${highlight ? theme.border : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '8px',
              padding: '12px 6px',
              textAlign: 'center',
              opacity: highlight ? 1 : 0.45,
              transition: 'opacity 0.2s',
            }}
          >
            {customIcon ? (
              <img
                src={customIcon}
                alt={name}
                style={{ width: '21px', height: '21px', objectFit: 'contain', display: 'block', margin: '0 auto 6px' }}
              />
            ) : (
              <i
                className={`ti ti-${icon}`}
                style={{ fontSize: '21px', color: highlight ? theme.a2 : theme.muted, display: 'block', marginBottom: '6px' }}
                aria-hidden="true"
              />
            )}
            <span style={{ fontSize: '8px', letterSpacing: '0.06em', color: highlight ? theme.a1 : theme.muted }}>
              {name}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)',
        fontSize: '8px', color: theme.muted, lineHeight: 2.0,
      }}>
        <div><span style={{ color: theme.a3 }}>Languages:</span> Python &middot; TypeScript &middot; JavaScript &middot; HTML &middot; CSS &middot; SQL</div>
        <div><span style={{ color: theme.a3 }}>Frameworks:</span> FastAPI &middot; Next.js &middot; React &middot; Tailwind &middot; Gradio</div>
        <div><span style={{ color: theme.a3 }}>AI / ML:</span> Whisper &middot; Ollama &middot; LLaVA &middot; ComfyUI &middot; SDXL &middot; LoRA fine-tuning</div>
        <div><span style={{ color: theme.a3 }}>Tools:</span> Git &middot; GitHub &middot; FFmpeg &middot; yt-dlp &middot; REST APIs &middot; OAuth 2.0 &middot; Docker</div>
      </div>
    </div>
  )
}
