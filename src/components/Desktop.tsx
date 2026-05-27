'use client'

import { useEffect, useState } from 'react'
import { useWindowManager } from '@/context/WindowManager'
import { workspaces, WorkspaceTheme } from '@/data/workspaces'
import { projects } from '@/data/projects'
import AppWindow from './AppWindow'
import DesktopIcon from './DesktopIcon'
import {
  ProfileWindow,
  ProjectLogWindow,
  ProjectWindow,
  SkillsWindow,
  ContactWindow,
  CvWindow,
} from './windows'

function renderContent(windowId: string, theme: WorkspaceTheme) {
  switch (windowId) {
    case 'profile': return <ProfileWindow theme={theme} />
    case 'log':     return <ProjectLogWindow theme={theme} />
    case 'clip':    return <ProjectWindow theme={theme} project={projects[0]} />
    case 'story':   return <ProjectWindow theme={theme} project={projects[1]} />
    case 'skills':  return <SkillsWindow theme={theme} />
    case 'contact': return <ContactWindow theme={theme} />
    case 'cv':      return <CvWindow theme={theme} />
    default:        return null
  }
}

export default function Desktop() {
  const { activeWorkspace, windowStates, openWindow, closeWindow, minimizeWindow, bringToFront } =
    useWindowManager()

  const theme = workspaces[activeWorkspace]
  const wsState = windowStates[activeWorkspace]

  // null = not yet measured. Windows don't render until we have real dimensions
  // so react-rnd always gets the correct default sizes on first mount.
  const [vp, setVp] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight })
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: theme.bg,
        backgroundImage: `url(${theme.wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-color 0.5s',
        overflow: 'hidden',
      }}
    >
      {/* Desktop icons — left column below bar */}
      <div style={{
        position: 'absolute',
        left: '14px',
        top: '50px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        zIndex: 5,
      }}>
        {theme.icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            theme={theme}
            onOpen={() => openWindow(icon.windowId)}
          />
        ))}
      </div>

      {/* Draggable/resizable windows — only once viewport is measured */}
      {vp && theme.windows.map((winCfg) => {
        const state = wsState[winCfg.id]
        if (!state?.open || state.minimized) return null

        const defaultX = Math.round(winCfg.xFrac * vp.w)
        const defaultY = Math.max(52, Math.round(winCfg.yFrac * vp.h))
        const defaultW = Math.round(winCfg.wFrac * vp.w)
        const defaultH = Math.round(winCfg.hFrac * vp.h)

        return (
          <AppWindow
            key={`${activeWorkspace}-${winCfg.id}`}
            id={winCfg.id}
            title={winCfg.title}
            defaultX={defaultX}
            defaultY={defaultY}
            defaultW={defaultW}
            defaultH={defaultH}
            theme={theme}
            zIndex={state.zIndex}
            onClose={() => closeWindow(winCfg.id)}
            onMinimize={() => minimizeWindow(winCfg.id)}
            onFocus={() => bringToFront(winCfg.id)}
          >
            {renderContent(winCfg.id, theme)}
          </AppWindow>
        )
      })}
    </div>
  )
}
