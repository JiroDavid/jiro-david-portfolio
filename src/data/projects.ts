export type ProjectStatus = 'complete' | 'in-progress' | 'coming-soon'

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  github: string
  youtube?: string
  showcase?: string
  showcaseLabel?: string
  video?: string
  images?: string[]
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
  {
    id: '03',
    title: 'Bindings of NopeYep',
    description:
      'Browser game built from scratch as a birthday gift. Top-down shooter inspired by The Binding of Isaac: multiple enemy types with unique AI, a phased boss fight with telegraph mechanics, skill upgrades between rooms, and a secret garden ending with a photo board and video messages. Built in a single HTML file with vanilla JS and HTML5 Canvas. Web Audio API for procedural sound, delta-time physics, DPR-aware rendering, and particle system.',
    tech: ['JavaScript', 'HTML5 Canvas', 'Web Audio API'],
    github: 'https://github.com/JiroDavid/birthday-game',
    showcase: 'https://jirodavid.github.io/birthday-game/',
    showcaseLabel: 'PLAY',
    image: '/assets/game_ss_1.png',
    images: ['/assets/game_ss_1.png', '/assets/game_ss_2.png', '/assets/game_ss_3.png'],
    status: 'complete',
  },
  {
    id: '04',
    title: 'ShimaTTS',
    description:
      'Local Twitch TTS alert app with AI voice cloning - no cloud, no subscriptions. Channel point redeems are spoken in a voice cloned from a 10-30 second sample (F5-TTS on GPU) while an animated alert banner with the viewer\'s name and message appears in OBS. One-click Twitch login, shiba-themed native dashboard, voice and GIF libraries with in-app previews, test alerts, TTS queue, and system tray.',
    tech: ['Python', 'FastAPI', 'F5-TTS', 'PyTorch', 'pywebview', 'OBS'],
    github: 'https://github.com/JiroDavid/ShimaTTS',
    youtube: 'https://www.youtube.com/watch?v=qQTdEA_w2CY',
    image: '/assets/shimatts-ss.png',
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
    title: 'Bindings of NopeYep',
    tech: 'Vanilla JS · HTML5 Canvas · Web Audio API',
    status: 'done' as const,
  },
  {
    title: 'ShimaTTS',
    tech: 'FastAPI · F5-TTS · PyTorch · pywebview',
    status: 'done' as const,
  },
  {
    title: 'R6 Strategy Tool',
    tech: 'Full-stack · DB design',
    status: 'new' as const,
  },
]
