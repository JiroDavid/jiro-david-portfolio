export interface Skill {
  name: string
  /** Tabler icon name — outline only, no -filled suffix */
  icon: string
  /** Highlighted skills show cream border + brick icon */
  highlight: boolean
}

export const skills: Skill[] = [
  { name: 'PYTHON',     icon: 'brand-python',     highlight: true  },
  { name: 'NEXT.JS',    icon: 'brand-nextjs',      highlight: true  },
  { name: 'FASTAPI',    icon: 'cpu',               highlight: true  },
  { name: 'WHISPER',    icon: 'waveform',          highlight: true  },
  { name: 'REACT',      icon: 'brand-react',       highlight: false },
  { name: 'TYPESCRIPT', icon: 'brand-typescript',  highlight: false },
  { name: 'COMFYUI',    icon: 'photo-ai',          highlight: false },
  { name: 'GIT',        icon: 'git-branch',        highlight: false },
  { name: 'FFMPEG',     icon: 'movie',             highlight: false },
  { name: 'DOCKER',     icon: 'brand-docker',      highlight: false },
  { name: 'TAILWIND',   icon: 'brand-tailwind',    highlight: false },
  { name: 'SQL',        icon: 'database',          highlight: false },
]
