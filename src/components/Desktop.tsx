'use client'

import { useEffect, useState } from 'react'
import { useWindowManager } from '@/context/WindowManager'
import { workspaces, WorkspaceTheme } from '@/data/workspaces'
import { projects } from '@/data/projects'
import AppWindow from './AppWindow'
import DesktopIcon from './DesktopIcon'
import VisitorCounter from './VisitorCounter'
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
    case 'shima':    return <ProjectWindow theme={theme} project={projects[1]} />
    case 'story':    return <ProjectWindow theme={theme} project={projects[2]} />
    case 'birthday': return <ProjectWindow theme={theme} project={projects[3]} />
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
  const [r6Toast, setR6Toast] = useState<'hidden' | 'visible' | 'closing'>('hidden')

  function showR6Toast() {
    if (r6Toast !== 'hidden') return
    setR6Toast('visible')
    setTimeout(() => setR6Toast('closing'), 1800)
    setTimeout(() => setR6Toast('hidden'), 1980)
  }

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
              onOpen={() => {
                if (icon.windowId === 'r6') { showR6Toast(); return }
                isOpenAndVisible ? requestClose(icon.windowId) : openWindow(icon.windowId)
              }}
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
      <VisitorCounter theme={theme} />

      {r6Toast !== 'hidden' && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          pointerEvents: 'none',
        }}>
          <div
            className={r6Toast === 'closing' ? 'win-exit' : 'win-enter'}
            style={{
              background: theme.winBg,
              border: `1px solid ${theme.border}`,
              borderRadius: '10px',
              padding: '20px 28px',
              textAlign: 'center',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🤫</div>
            <p style={{ fontSize: '10px', color: theme.a1, margin: 0, letterSpacing: '0.08em' }}>
              coming soon
            </p>
            <p style={{ fontSize: '8px', color: theme.muted, margin: '4px 0 0', letterSpacing: '0.06em' }}>
              this one&apos;s still under wraps
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
