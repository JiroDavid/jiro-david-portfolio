'use client'

import { useWindowManager } from '@/context/WindowManager'
import { workspaces } from '@/data/workspaces'

export default function Dock() {
  const { activeWorkspace, windowStates, openWindow } = useWindowManager()
  const theme = workspaces[activeWorkspace]
  const wsState = windowStates[activeWorkspace]
  const wsConfig = workspaces[activeWorkspace]

  const minimized = wsConfig.windows.filter((w) => wsState[w.id]?.minimized)
  if (minimized.length === 0) return null

  const icons = wsConfig.icons

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '5px 10px',
        background: theme.barBg,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${theme.border}`,
        borderRadius: '10px',
        zIndex: 1000,
      }}
    >
      {minimized.map((win) => {
        const iconCfg = icons.find((i) => i.windowId === win.id)
        return (
          <button
            key={win.id}
            onClick={() => openWindow(win.id)}
            title={`Restore ${win.title}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 9px',
              background: 'transparent',
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '7px',
              letterSpacing: '0.08em',
              color: theme.a1,
              transition: 'background 0.15s',
            }}
          >
            <i
              className={`ti ${iconCfg?.icon ?? 'ti-window'}`}
              style={{ fontSize: '13px', color: theme.a2 }}
              aria-hidden="true"
            />
            {win.title}
          </button>
        )
      })}
    </div>
  )
}
