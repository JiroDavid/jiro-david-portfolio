export type WorkspaceId = 'home' | 'projects' | 'skills' | 'contact'

export interface WindowConfig {
  id: string
  title: string
  /** fraction of viewport width  (0–1) */
  xFrac: number
  /** fraction of viewport height (0–1) */
  yFrac: number
  /** fraction of viewport width  (0–1) */
  wFrac: number
  /** fraction of viewport height (0–1) */
  hFrac: number
}

export interface IconConfig {
  id: string
  label: string
  icon: string
  windowId: string
  dim?: boolean
}

export interface WorkspaceTheme {
  id: WorkspaceId
  label: string
  bg: string
  wallpaper: string
  barBg: string
  border: string
  a1: string
  a2: string
  a3: string
  muted: string
  winBg: string
  icons: IconConfig[]
  windows: WindowConfig[]
}

// ─── Layout constants ────────────────────────────────────────────────────────
// All windows: yFrac=0.065, hFrac=0.67 (~70% of available height after bar)
// HOME / PROJECTS: two equal windows, combined = 60% of vw
//   w = (0.60vw - 16) / 2  →  wFrac ≈ 0.294
//   win1 xFrac ≈ 0.075  (right of icon column)
//   win2 xFrac ≈ 0.381  (win1 + win1.w + 16px gap)
// SKILLS: single window at 60% vw
// CONTACT: contact 39% + 16px gap + cv 19.5% ≈ 60%

export const workspaces: Record<WorkspaceId, WorkspaceTheme> = {
  home: {
    id: 'home',
    label: 'HOME',
    bg: '#0d0c09',
    wallpaper: '/assets/wallpapers/1.7.png',
    barBg: 'rgba(8,7,6,0.90)',
    border: '#DCC9A9',
    a1: '#DCC9A9',
    a2: '#B83A2D',
    a3: '#4E6851',
    muted: '#7a6e5a',
    winBg: 'rgba(14,13,11,0.96)',
    icons: [
      { id: 'profile', label: 'profile.sh',  icon: 'ti-user',           windowId: 'profile' },
      { id: 'log',     label: 'project.log', icon: 'ti-clipboard-list', windowId: 'log'     },
    ],
    windows: [
      { id: 'profile', title: 'profile.sh',  xFrac: 0.100, yFrac: 0.065, wFrac: 0.294, hFrac: 0.67 },
      { id: 'log',     title: 'project.log', xFrac: 0.407, yFrac: 0.065, wFrac: 0.294, hFrac: 0.67 },
    ],
  },

  projects: {
    id: 'projects',
    label: 'PROJECTS',
    bg: '#190e11',
    wallpaper: '/assets/wallpapers/2.jpg',
    barBg: 'rgba(15,7,9,0.90)',
    border: '#f0b8c8',
    a1: '#f4ccd8',
    a2: '#c87890',
    a3: '#90b89a',
    muted: '#8a6870',
    winBg: 'rgba(24,12,16,0.96)',
    icons: [
      { id: 'clip',  label: 'clip_editor.py',  icon: 'ti-video',     windowId: 'clip'  },
      { id: 'story', label: 'storyboarder.py', icon: 'ti-storybook', windowId: 'story' },
      { id: 'r6',    label: 'r6_strat.py',     icon: 'ti-lock',      windowId: 'r6',   dim: true },
    ],
    windows: [
      { id: 'clip',  title: 'clip_editor.py',  xFrac: 0.100, yFrac: 0.065, wFrac: 0.294, hFrac: 0.67 },
      { id: 'story', title: 'storyboarder.py', xFrac: 0.407, yFrac: 0.065, wFrac: 0.294, hFrac: 0.67 },
    ],
  },

  skills: {
    id: 'skills',
    label: 'SKILLS',
    bg: '#12101f',
    wallpaper: '/assets/wallpapers/3.png',
    barBg: 'rgba(10,8,20,0.90)',
    border: '#b89edc',
    a1: '#c8b4f0',
    a2: '#9d6fd4',
    a3: '#6a8abf',
    muted: '#7a6a9a',
    winBg: 'rgba(15,12,28,0.96)',
    icons: [
      { id: 'skills', label: 'skills.json', icon: 'ti-code', windowId: 'skills' },
    ],
    windows: [
      { id: 'skills', title: 'skills.json', xFrac: 0.100, yFrac: 0.065, wFrac: 0.600, hFrac: 0.67 },
    ],
  },

  contact: {
    id: 'contact',
    label: 'CONTACT',
    bg: '#080f0c',
    wallpaper: '/assets/wallpapers/4.jpg',
    barBg: 'rgba(5,10,7,0.90)',
    border: '#6aaa88',
    a1: '#8ac8a8',
    a2: '#3a6a4a',
    a3: '#9ab4a8',
    muted: '#5a7a6a',
    winBg: 'rgba(7,12,9,0.96)',
    icons: [
      { id: 'contact', label: 'contact.md', icon: 'ti-mail',          windowId: 'contact' },
      { id: 'cv',      label: 'cv.pdf',     icon: 'ti-file-type-pdf', windowId: 'cv'      },
    ],
    windows: [
      { id: 'contact', title: 'contact.md', xFrac: 0.100, yFrac: 0.065, wFrac: 0.390, hFrac: 0.67 },
      { id: 'cv',      title: 'cv.pdf',     xFrac: 0.502, yFrac: 0.065, wFrac: 0.195, hFrac: 0.67 },
    ],
  },
}

export const workspaceOrder: WorkspaceId[] = ['home', 'projects', 'skills', 'contact']
