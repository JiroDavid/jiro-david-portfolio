'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useWindowManager } from '@/context/WindowManager'
import { workspaces, workspaceOrder, WorkspaceId } from '@/data/workspaces'

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

const MAX_PULL = 640   // max px the toto can be dragged down

export default function FloatingBar() {
  const { activeWorkspace, switchWorkspace } = useWindowManager()
  const theme = workspaces[activeWorkspace]

  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [modalOpen,   setModalOpen]   = useState(false)
  const [read,        setRead]        = useState(false)
  const [totoOff,     setTotoOff]     = useState({ x: 0, y: 0 })
  const [totoDragging, setTotoDragging] = useState(false)
  const springRaf = useRef<number>()

  // Clock
  useEffect(() => {
    const tick = () => {
      const n = new Date()
      setTime(n.getHours().toString().padStart(2,'0') + ':' + n.getMinutes().toString().padStart(2,'0'))
      setDate(n.toLocaleDateString('en-GB',{ weekday:'short', day:'numeric', month:'short' }).toUpperCase())
    }
    tick()
    const id = setInterval(tick, 10_000)
    return () => clearInterval(id)
  }, [])

  // Toto string drag — any direction, RAF spring on release
  const handleTotoDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (springRaf.current) cancelAnimationFrame(springRaf.current)
    setTotoDragging(true)
    const startX = e.clientX
    const startY = e.clientY
    let ox = 0, oy = 0

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const cap  = dist > MAX_PULL ? MAX_PULL / dist : 1
      ox = dx * cap; oy = dy * cap
      setTotoOff({ x: ox, y: oy })
    }
    const onUp = () => {
      setTotoDragging(false)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup',   onUp)
      // Physics spring-back so the string stays visible during return
      let vx = 0, vy = 0
      const k = 0.12, damp = 0.76
      const step = () => {
        vx = vx * damp - k * ox
        vy = vy * damp - k * oy
        ox += vx; oy += vy
        setTotoOff({ x: ox, y: oy })
        if (Math.abs(ox) > 0.4 || Math.abs(oy) > 0.4 || Math.abs(vx) > 0.4 || Math.abs(vy) > 0.4) {
          springRaf.current = requestAnimationFrame(step)
        } else {
          setTotoOff({ x: 0, y: 0 })
        }
      }
      springRaf.current = requestAnimationFrame(step)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup',   onUp)
  }, [])

  const openNotif = () => { setModalOpen(true); setRead(true) }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '8px', left: '10px', right: '10px',
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
          overflow: 'visible',
        }}
      >
        {/* Logo */}
        <span style={{ fontSize:'15px', fontWeight:700, letterSpacing:'0.1em', color:theme.a1, opacity:0.7, flexShrink:0 }}>
          ⬡ JIRO<span style={{ color:theme.a2 }}>.</span>DEV
        </span>

        {/* Workspace buttons — centred */}
        <div style={{ display:'flex', gap:'4px', position:'absolute', left:'50%', transform:'translateX(-50%)' }}>
          {workspaceOrder.map((id: WorkspaceId) => {
            const on = id === activeWorkspace
            return (
              <button
                key={id}
                onClick={e => { spawnRipple(e); switchWorkspace(id) }}
                style={{
                  position:'relative', overflow:'hidden',
                  padding:'6px 17px',
                  border:`1px solid ${on ? theme.border : 'transparent'}`,
                  borderRadius:'6px',
                  background:'transparent',
                  color: on ? theme.a1 : theme.muted,
                  fontSize:'13px', letterSpacing:'0.1em',
                  cursor:'pointer', fontFamily:'inherit',
                  transition:'all 0.2s',
                }}
              >
                {workspaces[id].label}
              </button>
            )
          })}
        </div>

        {/* Right side: bell → time → toto-on-string */}
        <div style={{ display:'flex', alignItems:'center', gap:'14px', flexShrink:0 }}>

          {/* Bell */}
          <button
            onClick={openNotif}
            style={{ background:'transparent', border:'none', cursor:'pointer', padding:'4px', display:'flex', alignItems:'center', position:'relative' }}
          >
            <span className={!read ? 'bell-ring' : undefined}>
              <i className="ti ti-bell" style={{ fontSize:'20px', color:theme.a1, opacity:0.75 }} />
            </span>
            {!read && (
              <span style={{
                position:'absolute', top:'0', right:'-1px',
                background:theme.a2, color:'#000',
                fontSize:'8px', fontWeight:700,
                width:'13px', height:'13px',
                borderRadius:'50%',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'inherit', lineHeight:1,
                pointerEvents:'none',
              }}>1</span>
            )}
          </button>

          {/* Time / Date */}
          <div style={{ textAlign:'right', lineHeight:1.4 }}>
            <div style={{ fontSize:'12px', color:theme.a1, opacity:0.85 }}>{time}</div>
            <div style={{ fontSize:'10px', color:theme.muted, opacity:0.7 }}>{date}</div>
          </div>

          {/* Toto on a string — any direction ──────────────── */}
          <div
            onMouseDown={handleTotoDown}
            style={{
              position:'relative',
              cursor: totoDragging ? 'grabbing' : 'grab',
              userSelect:'none',
              WebkitUserSelect:'none',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
            }}
          >
            {/* String — rotated div, always reliable cross-browser */}
            {(Math.abs(totoOff.x) > 1 || Math.abs(totoOff.y) > 1) && (() => {
              const len   = Math.sqrt(totoOff.x ** 2 + totoOff.y ** 2)
              const angle = Math.atan2(totoOff.y, totoOff.x) * 180 / Math.PI
              return (
                <div style={{
                  position      : 'absolute',
                  left          : '50%',
                  top           : '50%',
                  width         : `${len}px`,
                  height        : '2px',
                  background    : 'rgba(255,255,255,0.55)',
                  borderRadius  : '1px',
                  transformOrigin: '0 50%',
                  transform     : `translateY(-50%) rotate(${angle}deg)`,
                  pointerEvents : 'none',
                  zIndex        : 0,
                }} />
              )
            })()}
            {/* Toto image */}
            <img
              src="/assets/toto.png"
              alt="toto"
              style={{
                height:'42px',
                width:'auto',
                objectFit:'contain',
                opacity:0.92,
                position:'relative',
                zIndex:1,
                transform:`translate(${totoOff.x}px, ${totoOff.y}px)`,
                transition: 'none',
              }}
            />
          </div>

        </div>
      </div>

      {/* Notification modal */}
      {modalOpen && (
        <div
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', zIndex:4000, display:'flex', alignItems:'center', justifyContent:'center' }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{ width:'420px', maxWidth:'calc(100vw - 40px)', background:theme.winBg, border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', boxShadow:'0 24px 64px rgba(0,0,0,0.7)', animation:'win-enter 0.18s ease-out forwards', overflow:'hidden' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize:'9px', letterSpacing:'0.18em', color:theme.muted }}>NOTIFICATIONS</span>
              <button onClick={() => setModalOpen(false)} style={{ background:'transparent', border:'none', color:theme.muted, fontSize:'14px', cursor:'pointer', padding:'2px 6px', borderRadius:'4px', lineHeight:1 }}>✕</button>
            </div>
            <div style={{ padding:'16px 16px 0', display:'flex', gap:'12px', alignItems:'center' }}>
              <img src="/assets/toto.png" alt="toto" style={{ width:'36px', height:'36px', objectFit:'contain', flexShrink:0 }} />
              <div>
                <div style={{ fontSize:'11px', fontWeight:700, color:theme.a1, marginBottom:'1px' }}>Jiro David</div>
                <div style={{ fontSize:'9px', color:theme.muted }}>just now</div>
              </div>
            </div>
            <div style={{ padding:'14px 16px 18px', fontSize:'10px', color:theme.muted, lineHeight:1.8 }}>
              <p style={{ marginBottom:'12px', color:theme.a1, opacity:0.8 }}>
                Hey! Welcome to my portfolio — here&apos;s a quick tour of what&apos;s inside:
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {[
                  ['PROFILE',  'Who I am, what I build, and how I got here. Also has my skill stack and a quick bio.'],
                  ['PROJECTS', 'My actual work — not just a list. Check out the Twitch Clip Editor (turned thesis, now used by real streamers) and the Video Storyboarder (AI pipeline for YouTube creators).'],
                  ['SKILLS',   'My tech stack at a glance: languages, frameworks, and the AI/ML tools I reach for day-to-day.'],
                  ['CV',       'My resume. Hit the download button if you want a copy.'],
                  ['CONTACT',  'Best ways to reach me. Email is fastest.'],
                ].map(([label, desc]) => (
                  <div key={label} style={{ display:'flex', gap:'8px' }}>
                    <span style={{ color:theme.a2, fontSize:'9px', letterSpacing:'0.12em', minWidth:'58px', paddingTop:'1px', flexShrink:0 }}>{label}</span>
                    <span>{desc}</span>
                  </div>
                ))}
              </div>
              <p style={{ marginTop:'14px', opacity:0.5 }}>Drag windows around and make yourself at home. — Jiro</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
