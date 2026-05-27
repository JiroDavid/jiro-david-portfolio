'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// ── Sprite sheet ────────────────────────────────────────────────
// cat-sprites.png  256×320  →  32×32 frames  8 cols × 10 rows
const SPRITE   = '/assets/cat-sprites.png'
const FW_SRC   = 32          // source frame px
const FH_SRC   = 32
const SW_SRC   = 256         // source sheet px
const SH_SRC   = 320
const SCALE    = 3           // render scale  →  96×96 per frame
const FW       = FW_SRC * SCALE   // 96
const FH       = FH_SRC * SCALE   // 96

function bgPos(row: number, col: number) {
  return `-${col * FW}px -${row * FH}px`
}

// ── Frame layout ────────────────────────────────────────────────
// Idle (active)  rows 0-3,  col 0-3   16 frames  (4 per row)
// Walking        rows 4-5,  col 0-7   16 frames  (8 per row)
// Lying          row 6,     col 0-3    4 frames
// Grab / fall    row 8,     col 1-3    3 frames   (highest pixel offset = lifted pose)

function getPos(mode: Mode, f: number, idleSub: 'active' | 'lying'): string {
  if (mode === 'dragging' || mode === 'falling') {
    // cycle through the 3 grab frames
    const col = 1 + (f % 3)
    return bgPos(8, col)
  }
  if (mode === 'walking') {
    const idx = f % 16
    return bgPos(4 + Math.floor(idx / 8), idx % 8)
  }
  // idle
  if (idleSub === 'lying') {
    return bgPos(6, f % 4)
  }
  const idx = f % 16
  return bgPos(Math.floor(idx / 4), idx % 4)
}

// ── Pet ─────────────────────────────────────────────────────────
type Mode = 'walking' | 'idle' | 'dragging' | 'falling'

const WALK_SPEED  = 1.0
const FLOOR_GAP   = 8

interface PetProps {
  startX    : number
  startDir  : 1 | -1
  bOffset  ?: number
}

function Pet({ startX, startDir, bOffset = 0 }: PetProps) {
  const [pos,     setPos]     = useState({ x: startX, y: -200 })
  const [dir,     setDir]     = useState<1 | -1>(startDir)
  const [mode,    setMode]    = useState<Mode>('walking')
  const [frame,   setFrame]   = useState(0)
  const [idleSub, setIdleSub] = useState<'active' | 'lying'>('active')

  const xRef    = useRef(startX)
  const dirRef  = useRef(startDir)
  const modeRef = useRef<Mode>('walking')
  xRef.current    = pos.x
  dirRef.current  = dir
  modeRef.current = mode

  const floorY = useCallback(
    () => window.innerHeight - FH - FLOOR_GAP,
    []
  )

  // Set Y on mount + resize
  useEffect(() => {
    setPos(p => ({ ...p, y: floorY() }))
    const onResize = () => setPos(p => ({ ...p, y: floorY() }))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [floorY])

  // Walk RAF
  useEffect(() => {
    if (mode !== 'walking') return
    let id: number
    const loop = () => {
      const maxX = window.innerWidth - FW
      const nx   = xRef.current + dirRef.current * WALK_SPEED
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
    // walk ~10fps, idle ~6fps, grab ~5fps
    const ms = mode === 'walking' ? 100 : mode === 'falling' ? 120 : 180
    const id = setInterval(() => setFrame(f => f + 1), ms)
    return () => clearInterval(id)
  }, [mode])

  // Walk ↔ idle transitions
  useEffect(() => {
    if (mode === 'dragging' || mode === 'falling') return
    const delay = mode === 'walking'
      ? 5000 + bOffset + Math.random() * 7000
      : 2500 + Math.random() * 4500
    const id = setTimeout(
      () => setMode(m => m === 'walking' ? 'idle' : 'walking'),
      delay
    )
    return () => clearTimeout(id)
  }, [mode, bOffset])

  // Idle sub-state: active ↔ lying
  useEffect(() => {
    if (mode !== 'idle') return
    const delay = idleSub === 'active'
      ? 3000 + Math.random() * 4000
      : 2000 + Math.random() * 3000
    const id = setTimeout(
      () => setIdleSub(s => s === 'active' ? 'lying' : 'active'),
      delay
    )
    return () => clearTimeout(id)
  }, [mode, idleSub])

  // Physics fall with bounce
  const startFall = useCallback((fromY: number) => {
    setMode('falling')
    const target = floorY()
    let vy = 0
    let cy = fromY
    const step = () => {
      vy = Math.min(vy + 1.4, 30)
      cy += vy
      if (cy >= target) {
        if (vy > 8) {
          vy = -vy * 0.40
          cy = target
        } else {
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

  // Drag
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setMode('dragging')
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const ox = e.clientX - rect.left
    const oy = e.clientY - rect.top
    const onMove = (ev: MouseEvent) => setPos({ x: ev.clientX - ox, y: ev.clientY - oy })
    const onUp   = (ev: MouseEvent) => {
      startFall(ev.clientY - oy)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup',   onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup',   onUp)
  }, [startFall])

  const grabbed = mode === 'dragging' || mode === 'falling'

  // Flip left-walking via scaleX(-1).  Don't flip when grabbed (frame is ~symmetric).
  const transform = grabbed
    ? `scale(${mode === 'dragging' ? 1.1 : 1.05}) rotate(${mode === 'dragging' ? -5 : 3}deg)`
    : dir === -1
    ? 'scaleX(-1)'
    : undefined

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position         : 'fixed',
        left             : pos.x,
        top              : pos.y,
        width            : FW,
        height           : FH,
        zIndex           : grabbed ? 9999 : 200,
        cursor           : mode === 'dragging' ? 'grabbing' : 'grab',
        userSelect       : 'none',
        WebkitUserSelect : 'none',
        backgroundImage  : `url(${SPRITE})`,
        backgroundRepeat : 'no-repeat',
        backgroundSize   : `${SW_SRC * SCALE}px ${SH_SRC * SCALE}px`,
        backgroundPosition: getPos(mode, frame, idleSub),
        imageRendering   : 'pixelated',
        transform,
        filter           : grabbed ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.45))' : undefined,
        transition       : 'transform 0.12s ease',
      }}
    />
  )
}

// ── Ten pets with staggered positions & timing ──────────────────
const PETS: PetProps[] = [
  { startX:   80, startDir:  1, bOffset:    0 },
  { startX:  200, startDir: -1, bOffset: 1800 },
  { startX:  340, startDir:  1, bOffset: 3200 },
  { startX:  480, startDir: -1, bOffset:  700 },
  { startX:  620, startDir:  1, bOffset: 4500 },
  { startX:  750, startDir: -1, bOffset: 2100 },
  { startX:  890, startDir:  1, bOffset: 5800 },
  { startX: 1020, startDir: -1, bOffset: 1100 },
  { startX: 1160, startDir:  1, bOffset: 3700 },
  { startX: 1280, startDir: -1, bOffset: 6200 },
]

export default function DesktopPets() {
  return (
    <>
      {PETS.map((p, i) => (
        <Pet key={i} startX={p.startX} startDir={p.startDir} bOffset={p.bOffset} />
      ))}
    </>
  )
}
