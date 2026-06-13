export interface Skill {
  name: string
  /** Tabler icon name — outline only, no -filled suffix */
  icon: string
  /** Optional custom image path (overrides Tabler icon) */
  customIcon?: string
  /** Highlighted skills show cream border + brick icon */
  highlight: boolean
}

export const skills: Skill[] = [
  { name: 'PYTHON',     icon: 'brand-python',     highlight: true  },
  { name: 'FASTAPI',    icon: 'cpu',               highlight: true  },
  { name: 'WHISPER',    icon: 'waveform',          customIcon: '/assets/whisper-logo.svg', highlight: true  },
  { name: 'OLLAMA',     icon: 'brain',             highlight: true  },
  { name: 'LLAVA',      icon: 'eye',               highlight: true  },
  { name: 'COMFYUI',    icon: 'photo-ai',          highlight: true  },
  { name: 'NEXT.JS',    icon: 'brand-nextjs',      highlight: false },
  { name: 'REACT',      icon: 'brand-react',       highlight: false },
  { name: 'TYPESCRIPT', icon: 'brand-typescript',  highlight: false },
  { name: 'DOCKER',     icon: 'brand-docker',      highlight: false },
  { name: 'GIT',        icon: 'git-branch',        highlight: false },
  { name: 'SQL',        icon: 'database',          highlight: false },
]
