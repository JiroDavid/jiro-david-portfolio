'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const SPRITE = '/assets/cat-sprites.png'
const FW_SRC = 32
const FH_SRC = 32
const SW_SRC = 256
const SH_SRC = 320
const SCALE  = 2          // 64×64 on mobile
const FW     = FW_SRC * SCALE
const FH     = FH_SRC * SCALE
const NAV_H  = 96         // space above nav button

type Mode = 'walking' | 'idle' | 'dragging' | 'falling'

function bgPos(row: number, col: number) {
  return `-${col * FW}px -${row * FH}px`
}

function getPos(mode: Mode, f: number, idleSub: 'active' | 'lying'): string {
  if (mode === 'dragging' || mode === 'falling') return bgPos(8, 1 + (f % 3))
  if (mode === 'walking') {
    const idx = f % 16
    return bgPos(4 + Math.floor(idx / 8), idx % 8)
  }
  if (idleSub === 'lying') return bgPos(6, f % 4)
  const idx = f % 16
  return bgPos(Math.floor(idx / 4), idx % 4)
}

export default function MobilePet() {
  const [pos,     setPos]     = useState({ x: 40, y: -200 })
  const [dir,     setDir]     = useState<1 | -1>(1)
  const [mode,    setMode]    = useState<Mode>('walking')
  const [frame,   setFrame]   = useState(0)
  const [idleSub, setIdleSub] = useState<'active' | 'lying'>('active')

  const xRef    = useRef(40)
  const dirRef  = useRef<1 | -1>(1)
  const modeRef = useRef<Mode>('walking')
  xRef.current    = pos.x
  dirRef.current  = dir
  modeRef.current = mode

  const floorY = useCallback(() => window.innerHeight - NAV_H - FH - 4, [])

  useEffect(() => {
    setPos(p => ({ ...p, y: floorY() }))
    const onResize = () => setPos(p => ({ ...p, y: floorY() }))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [floorY])

  // Walk loop
  useEffect(() => {
    if (mode !== 'walking') return
    let id: number
    const loop = () => {
      const maxX = window.innerWidth - FW
      const nx   = xRef.current + dirRef.current * 0.7
      if (nx <= 0) {
        xRef.current = 0; dirRef.current = 1; setDir(1)
        setPos(p => ({ ...p, x: 0 }))
      } else if (nx >= maxX) {
        xRef.current = maxX; dirRef.current = -1; setDir(-1)
        setPos(p => ({ ...p, x: maxX }))
      } else {
        xRef.current = nx; setPos(p => ({ ...p, x: nx }))
      }
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [mode])

  // Frame ticker
  useEffect(() => {
    if (mode === 'dragging') return
    const ms = mode === 'walking' ? 100 : mode === 'falling' ? 120 : 180
    const id = setInterval(() => setFrame(f => f + 1), ms)
    return () => clearInterval(id)
  }, [mode])

  // Walk ↔ idle
  useEffect(() => {
    if (mode === 'dragging' || mode === 'falling') return
    const delay = mode === 'walking'
      ? 5000 + Math.random() * 7000
      : 2500 + Math.random() * 4500
    const id = setTimeout(() => setMode(m => m === 'walking' ? 'idle' : 'walking'), delay)
    return () => clearTimeout(id)
  }, [mode])

  // Idle sub-state
  useEffect(() => {
    if (mode !== 'idle') return
    const delay = idleSub === 'active' ? 3000 + Math.random() * 4000 : 2000 + Math.random() * 3000
    const id = setTimeout(() => setIdleSub(s => s === 'active' ? 'lying' : 'active'), delay)
    return () => clearTimeout(id)
  }, [mode, idleSub])

  // Fall + bounce physics
  const startFall = useCallback((fromY: number) => {
    setMode('falling')
    const target = floorY()
    let vy = 0, cy = fromY
    const step = () => {
      vy = Math.min(vy + 1.4, 30)
      cy += vy
      if (cy >= target) {
        if (vy > 8) { vy = -vy * 0.40; cy = target }
        else {
          setPos(p => ({ ...p, y: target }))
          setMode('idle')
          setTimeout(() => setMode('walking'), 1000)
          return
        }
      }
      setPos(p => ({ ...p, y: cy }))
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [floorY])

  // Touch drag
  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const touch = e.touches[0]
    setMode('dragging')
    const rect = e.currentTarget.getBoundingClientRect()
    const ox   = touch.clientX - rect.left
    const oy   = touch.clientY - rect.top
    const onMove = (ev: TouchEvent) => {
      ev.preventDefault()
      const t = ev.touches[0]
      setPos({ x: t.clientX - ox, y: t.clientY - oy })
    }
    const onEnd = (ev: TouchEvent) => {
      const t = ev.changedTouches[0]
      startFall(t.clientY - oy)
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend', onEnd)
    }
    document.addEventListener('touchmove', onMove, { passive: false })
    document.addEventListener('touchend', onEnd)
  }, [startFall])

  const grabbed = mode === 'dragging' || mode === 'falling'
  const transform = grabbed
    ? `scale(${mode === 'dragging' ? 1.15 : 1.05}) rotate(${mode === 'dragging' ? -5 : 3}deg)`
    : dir === -1 ? 'scaleX(-1)' : undefined

  return (
    <div
      onTouchStart={onTouchStart}
      style={{
        position           : 'fixed',
        left               : pos.x,
        top                : pos.y,
        width              : FW,
        height             : FH,
        zIndex             : grabbed ? 9999 : 500,
        userSelect         : 'none',
        WebkitUserSelect   : 'none',
        touchAction        : 'none',
        backgroundImage    : `url(${SPRITE})`,
        backgroundRepeat   : 'no-repeat',
        backgroundSize     : `${SW_SRC * SCALE}px ${SH_SRC * SCALE}px`,
        backgroundPosition : getPos(mode, frame, idleSub),
        imageRendering     : 'pixelated',
        transform,
        filter             : grabbed ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' : undefined,
        transition         : 'transform 0.12s ease',
      } as React.CSSProperties}
    />
  )
}
