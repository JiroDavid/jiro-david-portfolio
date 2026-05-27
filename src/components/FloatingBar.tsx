'use client'

import { useEffect, useState } from 'react'
import { useWindowManager } from '@/context/WindowManager'
import { workspaces, workspaceOrder, WorkspaceId } from '@/data/workspaces'

export default function FloatingBar() {
  const { activeWorkspace, switchWorkspace } = useWindowManager()
  const theme = workspaces[activeWorkspace]
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const n = new Date()
      setTime(
        n.getHours().toString().padStart(2, '0') +
        ':' +
        n.getMinutes().toString().padStart(2, '0')
      )
    }
    tick()
    const id = setInterval(tick, 10_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        top: '8px',
        left: '10px',
        right: '10px',
        height: '38px',
        borderRadius: '8px',
        background: theme.barBg,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        zIndex: 1000,
        transition: 'background 0.4s',
        border: `1px solid rgba(255,255,255,0.06)`,
      }}
    >
      {/* Logo — 25% bigger: 10px → 13px */}
      <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: theme.a1, opacity: 0.7 }}>
        ⬡ JIRO<span style={{ color: theme.a2 }}>.</span>DEV
      </span>

      {/* Right side: workspace buttons + clock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '10px', color: theme.muted, marginRight: '6px' }}>{time}</span>
        <span style={{ color: theme.muted, opacity: 0.2, fontSize: '13px' }}>|</span>
        <div style={{ display: 'flex', gap: '3px', marginLeft: '6px' }}>
          {workspaceOrder.map((id: WorkspaceId) => {
            const on = id === activeWorkspace
            return (
              <button
                key={id}
                onClick={() => switchWorkspace(id)}
                style={{
                  padding: '4px 13px',
                  border: `1px solid ${on ? theme.border : 'transparent'}`,
                  borderRadius: '4px',
                  background: 'transparent',
                  color: on ? theme.a1 : theme.muted,
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
              >
                {workspaces[id].label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
