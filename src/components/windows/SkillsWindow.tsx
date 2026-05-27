import { WorkspaceTheme } from '@/data/workspaces'
import { skills } from '@/data/skills'

export default function SkillsWindow({ theme }: { theme: WorkspaceTheme }) {
  return (
    <div>
      <p className="panel-label" style={{ color: theme.a3 }}>スキル · SKILLS</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '9px', marginBottom: '20px' }}>
        {skills.map(({ name, icon, highlight }) => (
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
            <i
              className={`ti ti-${icon}`}
              style={{ fontSize: '21px', color: highlight ? theme.a2 : theme.muted, display: 'block', marginBottom: '6px' }}
              aria-hidden="true"
            />
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
        <div><span style={{ color: theme.a3 }}>Languages:</span> Python · TypeScript · JavaScript · HTML · CSS · SQL</div>
        <div><span style={{ color: theme.a3 }}>Frameworks:</span> FastAPI · Next.js · React · Tailwind · Gradio</div>
        <div><span style={{ color: theme.a3 }}>AI / ML:</span> Whisper · Ollama · LLaVA · ComfyUI · SDXL · LoRA fine-tuning</div>
        <div><span style={{ color: theme.a3 }}>Tools:</span> Git · GitHub · FFmpeg · yt-dlp · REST APIs · OAuth 2.0 · Docker</div>
      </div>
    </div>
  )
}
