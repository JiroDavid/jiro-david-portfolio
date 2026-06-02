export type ProjectStatus = 'complete' | 'in-progress' | 'coming-soon'

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  github: string
  youtube?: string
  showcase?: string
  /** Drop your screenshot or demo GIF in public/assets/ and point to it here */
  image: string
  status: ProjectStatus
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'Twitch Clip Editor',
    description:
      'Full-stack web app converting Twitch clips to vertical 9:16 for Shorts and TikTok. Adopted by 10 streamers following a 30-user beta. Subtitle generation, automatic layout detection, metadata automation. Showcase version built for CCI Festival featuring a polished interactive demo with 3 pre-loaded clips, per-speaker caption colours, live FFmpeg render, and a 4-step reveal with phone frame.',
    tech: ['Python', 'FastAPI', 'Next.js', 'Whisper', 'Ollama', 'FFmpeg'],
    github: 'https://github.com/JiroDavid/ai-twitch-clip-editor',
    youtube: 'https://www.youtube.com/watch?v=DwAc-PRauQY',
    showcase: 'https://github.com/JiroDavid/twitchtok-showcase',
    image: '/assets/twitch-demo-ss.png',
    status: 'complete',
  },
  {
    id: '02',
    title: 'Video Storyboarder',
    description:
      'Pipeline for YouTube creators. Transcribes with Whisper, analyses frames with LLaVA, generates storyboard panels via ComfyUI with a custom SDXL LoRA.',
    tech: ['Python', 'Gradio', 'LLaVA', 'ComfyUI', 'LoRA'],
    github: 'https://github.com/JiroDavid/video-storyboarder',
    youtube: 'https://www.youtube.com/watch?v=zaeQMB_12VU',
    image: '/assets/video-storyboarder.png',
    status: 'complete',
  },
]

export const projectLog = [
  {
    title: 'Twitch Clip Editor',
    tech: 'FastAPI · Next.js · Whisper · FFmpeg',
    status: 'done' as const,
  },
  {
    title: 'Video Storyboarder',
    tech: 'Gradio · Ollama · ComfyUI · LoRA',
    status: 'done' as const,
  },
  {
    title: 'Portfolio Site',
    tech: 'Next.js · React · Tailwind',
    status: 'active' as const,
  },
  {
    title: 'R6 Strategy Tool',
    tech: 'Full-stack · DB design',
    status: 'new' as const,
  },
]
