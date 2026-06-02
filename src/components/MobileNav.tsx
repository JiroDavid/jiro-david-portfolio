'use client'

import { useState, useRef, useCallback } from 'react'
import { WorkspaceTheme } from '@/data/workspaces'

export const MOBILE_PAGES = ['PROFILE', 'PROJECTS', 'LOG', 'SKILLS', 'CONTACT'] as const
export type MobilePageId = typeof MOBILE_PAGES[number]

const PAGE_ICONS: Record<MobilePageId, string> = {
  PROFILE:  'ti-user',
  PROJECTS: 'ti-code',
  LOG:      'ti-list',
  SKILLS:   'ti-cpu',
  CONTACT:  'ti-mail',
}

// Angles in degrees (0° = right, CCW positive, 90° = straight up)
// 5 items spread across 140°, centred at 90°
const ANGLES = [160, 125, 90, 55, 20]
const RADIUS = 92

// Button is fixed at bottom:20px, height 56px → centre is 48px from viewport bottom
const BTN_BOTTOM_CENTER = 48

interface Props {
  theme: WorkspaceTheme
  currentPage: number
  onNavigate: (index: number) => void
}

export default function MobileNav({ theme, currentPage, onNavigate }: Props) {
  const [open, setOpen]       = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const openRef               = useRef(false)
  openRef.current             = open

  // Button centre in viewport coords (calculated at touch time)
  const getBtnCenter = useCallback(() => ({
    x: window.innerWidth / 2,
    y: window.innerHeight - BTN_BOTTOM_CENTER,
  }), [])

  const angleToIndex = useCallback((tx: number, ty: number) => {
    const c   = getBtnCenter()
    const dx  = tx - c.x
    const dy  = c.y - ty          // flip y: up = positive
    const ang = Math.atan2(dy, dx) * (180 / Math.PI)
    let closest = 0, minD = Infinity
    ANGLES.forEach((a, i) => {
      // handle angle wrap
      let diff = Math.abs(ang - a)
      if (diff > 180) diff = 360 - diff
      if (diff < minD) { minD = diff; closest = i }
    })
    return closest
  }, [getBtnCenter])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    setOpen(true)
    setHovered(null)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    if (!openRef.current) return
    const t  = e.touches[0]
    const c  = getBtnCenter()
    const dx = t.clientX - c.x
    const dy = t.clientY - c.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    setHovered(dist > 32 ? angleToIndex(t.clientX, t.clientY) : null)
  }, [getBtnCenter, angleToIndex])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    if (hovered !== null) onNavigate(hovered)
    setOpen(false)
    setHovered(null)
  }, [hovered, onNavigate])

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 998,
          background: open ? 'rgba(0,0,0,0.55)' : 'transparent',
          backdropFilter: open ? 'blur(4px)' : 'none',
          WebkitBackdropFilter: open ? 'blur(4px)' : 'none',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'background 0.2s, backdrop-filter 0.2s',
        }}
      />

      {/* Radial items — positioned relative to button centre */}
      <div style={{
        position: 'fixed',
        bottom: BTN_BOTTOM_CENTER,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 0,
        height: 0,
        pointerEvents: 'none',
      }}>
        {MOBILE_PAGES.map((page, i) => {
          const rad = ANGLES[i] * Math.PI / 180
          const x   = RADIUS * Math.cos(rad)       // right = positive
          const y   = -RADIUS * Math.sin(rad)      // up = negative in CSS (top)
          const isActive  = i === currentPage
          const isHovered = i === hovered

          return (
            <div
              key={page}
              style={{
                position    : 'absolute',
                left        : x - 30,
                top         : y - 30,
                width       : 60,
                height      : 60,
                borderRadius: '50%',
                background  : isHovered
                  ? `${theme.a1}22`
                  : 'rgba(8,8,8,0.85)',
                backdropFilter        : 'blur(14px)',
                WebkitBackdropFilter  : 'blur(14px)',
                border: `1.5px solid ${
                  isHovered ? theme.a1 : isActive ? theme.a2 : theme.border
                }`,
                display       : 'flex',
                flexDirection : 'column',
                alignItems    : 'center',
                justifyContent: 'center',
                gap           : '3px',
                opacity   : open ? 1 : 0,
                transform : open
                  ? 'scale(1)'
                  : 'scale(0.2)',
                transition: `opacity 0.18s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.025}s,
                             transform 0.18s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.025}s,
                             border-color 0.1s, background 0.1s`,
                boxShadow: isHovered ? `0 0 16px ${theme.a1}44` : undefined,
              }}
            >
              <i
                className={`ti ${PAGE_ICONS[page]}`}
                style={{
                  fontSize: '18px',
                  color: isHovered ? theme.a1 : isActive ? theme.a2 : theme.muted,
                }}
              />
              <span style={{
                fontSize      : '6px',
                letterSpacing : '0.08em',
                color         : isHovered ? theme.a1 : theme.muted,
              }}>
                {page}
              </span>
            </div>
          )
        })}
      </div>

      {/* Centre thumb button */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          position      : 'fixed',
          bottom        : '20px',
          left          : '50%',
          transform     : 'translateX(-50%)',
          zIndex        : 1001,
          width         : '56px',
          height        : '56px',
          borderRadius  : '50%',
          background    : open ? `${theme.a1}18` : 'rgba(8,8,8,0.92)',
          backdropFilter      : 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border        : `1.5px solid ${open ? theme.a1 : theme.border}`,
          display       : 'flex',
          alignItems    : 'center',
          justifyContent: 'center',
          userSelect    : 'none',
          WebkitUserSelect: 'none',
          touchAction   : 'none',
          boxShadow     : open
            ? `0 0 24px ${theme.a1}55`
            : '0 4px 24px rgba(0,0,0,0.6)',
          transition    : 'all 0.15s ease',
        } as React.CSSProperties}
      >
        {/* 3×3 dot grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 5px)', gap: '3.5px' }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{
                width       : '5px',
                height      : '5px',
                borderRadius: '50%',
                background  : open ? theme.a1 : theme.muted,
                opacity     : open ? 1 : 0.55,
                transition  : 'all 0.15s ease',
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
