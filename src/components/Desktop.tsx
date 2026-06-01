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
  TerminalWindow,
} from './windows'

function renderContent(windowId: string, theme: WorkspaceTheme) {
  const workspaceId = theme.id
  switch (windowId) {
    case 'profile':  return <ProfileWindow theme={theme} />
    case 'log':      return <ProjectLogWindow theme={theme} />
    case 'clip':     return <ProjectWindow theme={theme} project={projects[0]} />
    case 'story':    return <ProjectWindow theme={theme} project={projects[1]} />
    case 'skills':   return <SkillsWindow theme={theme} />
    case 'contact':  return <ContactWindow theme={theme} />
    case 'cv':       return <CvWindow theme={theme} />
    case 'terminal': return <TerminalWindow theme={theme} workspaceId={workspaceId} />
    default:         return null
  }
}

export default function Desktop() {
  const { activeWorkspace, windowStates, openWindow, closeWindow, minimizeWindow, bringToFront } =
    useWindowManager()

  const theme = workspaces[activeWorkspace]
  const wsState = windowStates[activeWorkspace]

  const [vp, setVp] = useState<{ w: number; h: number } | null>(null)
  const [closingIds, setClosingIds] = useState<Set<string>>(new Set())

  function requestClose(windowId: string) {
    setClosingIds((prev) => new Set(prev).add(windowId))
    setTimeout(() => {
      closeWindow(windowId)
      setClosingIds((prev) => { const s = new Set(prev); s.delete(windowId); return s })
    }, 170)
  }

  useEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight })
    let timer: ReturnType<typeof setTimeout>
    const update = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        setVp({ w: window.innerWidth, h: window.innerHeight })
      }, 200)
    }
    window.addEventListener('resize', update)
    return () => { clearTimeout(timer); window.removeEventListener('resize', update) }
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: theme.bg,
        backgroundImage: `url(${theme.wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-color 0.5s',
      }}
    >
      <div key={activeWorkspace} className="ws-fade" style={{
        position: 'absolute',
        left: '14px',
        top: '66px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        zIndex: 5,
      }}>
        {theme.icons.map((icon) => {
          const winState = wsState[icon.windowId]
          const isOpenAndVisible = winState?.open && !winState?.minimized && !closingIds.has(icon.windowId)
          return (
            <DesktopIcon
              key={icon.id}
              icon={icon}
              theme={theme}
              onOpen={() => isOpenAndVisible ? requestClose(icon.windowId) : openWindow(icon.windowId)}
            />
          )
        })}
      </div>

      {vp && theme.windows.map((winCfg) => {
        const state = wsState[winCfg.id]
        const isClosing = closingIds.has(winCfg.id)
        if ((!state?.open || state.minimized) && !isClosing) return null

        const defaultX = Math.round(winCfg.xFrac * vp.w)
        const defaultY = Math.max(68, Math.round(winCfg.yFrac * vp.h))
        const defaultW = Math.round(winCfg.wFrac * vp.w)
        const defaultH = Math.round(winCfg.hFrac * vp.h)

        return (
          <AppWindow
            key={`${activeWorkspace}-${winCfg.id}-${vp.w}`}
            id={winCfg.id}
            title={winCfg.title}
            defaultX={defaultX}
            defaultY={defaultY}
            defaultW={defaultW}
            defaultH={defaultH}
            theme={theme}
            zIndex={state.zIndex}
            isClosing={isClosing}
            onClose={() => requestClose(winCfg.id)}
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
