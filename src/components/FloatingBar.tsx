'use client'

import { useEffect, useState, useRef } from 'react'
import { useWindowManager } from '@/context/WindowManager'
import { workspaces, workspaceOrder, WorkspaceId } from '@/data/workspaces'

const WELCOME_NOTIF = {
  from: 'Jiro David',
  avatar: '/assets/toto.png',
  message: "hey! welcome to my portfolio. explore the tabs to see my projects, skills and how to reach me.",
  time: 'just now',
}

function spawnRipple(e: React.MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget
  const rect = btn.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const span = document.createElement('span')
  span.style.cssText = `
    position:absolute;border-radius:50%;
    background:rgba(255,255,255,0.25);
    width:6px;height:6px;
    left:${x}px;top:${y}px;
    transform:translate(-50%,-50%) scale(0);
    animation:ripple 0.55s ease-out forwards;
    pointer-events:none;
  `
  btn.appendChild(span)
  setTimeout(() => span.remove(), 560)
}

export default function FloatingBar() {
  const { activeWorkspace, switchWorkspace } = useWindowManager()
  const theme = workspaces[activeWorkspace]
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const [read, setRead] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tick = () => {
      const n = new Date()
      setTime(
        n.getHours().toString().padStart(2, '0') + ':' +
        n.getMinutes().toString().padStart(2, '0')
      )
      setDate(
        n.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase()
      )
    }
    tick()
    const id = setInterval(tick, 10_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    if (notifOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [notifOpen])

  return (
    <div
      style={{
        position: 'absolute',
        top: '8px',
        left: '10px',
        right: '10px',
        height: '48px',
        borderRadius: '10px',
        background: theme.barBg,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 1000,
        transition: 'background 0.4s',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.1em', color: theme.a1, opacity: 0.7, flexShrink: 0 }}>
        ⬡ JIRO<span style={{ color: theme.a2 }}>.</span>DEV
      </span>

      <div style={{ display: 'flex', gap: '4px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        {workspaceOrder.map((id: WorkspaceId) => {
          const on = id === activeWorkspace
          return (
            <button
              key={id}
              onClick={(e) => { spawnRipple(e); switchWorkspace(id) }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '6px 17px',
                border: `1px solid ${on ? theme.border : 'transparent'}`,
                borderRadius: '6px',
                background: 'transparent',
                color: on ? theme.a1 : theme.muted,
                fontSize: '13px',
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
        <div style={{ textAlign: 'right', lineHeight: 1.4 }}>
          <div style={{ fontSize: '12px', color: theme.a1, opacity: 0.85 }}>{time}</div>
          <div style={{ fontSize: '10px', color: theme.muted, opacity: 0.7 }}>{date}</div>
        </div>

        <img
          src="/assets/toto.png"
          alt="toto"
          style={{ height: '30px', width: 'auto', objectFit: 'contain', opacity: 0.9 }}
        />

        <div ref={panelRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setNotifOpen(o => !o); setRead(true) }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <i className="ti ti-bell" style={{ fontSize: '20px', color: theme.a1, opacity: 0.75 }} />
            {!read && (
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: theme.a2,
              }} />
            )}
          </button>

          {notifOpen && (
            <div style={{
              position: 'absolute',
              top: '42px',
              right: 0,
              width: '300px',
              background: theme.winBg,
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: '10px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              zIndex: 2000,
              animation: 'win-enter 0.15s ease-out forwards',
            }}>
              <div style={{
                padding: '11px 16px',
                fontSize: '9px',
                letterSpacing: '0.18em',
                color: theme.muted,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                NOTIFICATIONS
              </div>
              <div style={{ padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <img
                  src={WELCOME_NOTIF.avatar}
                  alt="toto"
                  style={{ width: '32px', height: '32px', objectFit: 'contain', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: theme.a1 }}>{WELCOME_NOTIF.from}</span>
                    <span style={{ fontSize: '9px', color: theme.muted }}>{WELCOME_NOTIF.time}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: theme.muted, lineHeight: 1.6, margin: 0 }}>
                    {WELCOME_NOTIF.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
