'use client'

import { useEffect, useRef } from 'react'

const S = 4

export default function WaterBackground({ bg, wallpaper }: { bg: string; wallpaper: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const sw = Math.floor(window.innerWidth / S)
    const sh = Math.floor(window.innerHeight / S)
    canvas.width = sw
    canvas.height = sh

    let buf0 = new Float32Array(sw * sh)
    let buf1 = new Float32Array(sw * sh)
    let wpPx: Uint8ClampedArray | null = null

    const img = new Image()
    img.onload = () => {
      const off = document.createElement('canvas')
      off.width = sw; off.height = sh
      const oc = off.getContext('2d')!
      oc.drawImage(img, 0, 0, sw, sh)
      wpPx = oc.getImageData(0, 0, sw, sh).data
    }
    img.src = wallpaper

    function addRipple(screenX: number, screenY: number) {
      const cx = Math.floor(screenX / S)
      const cy = Math.floor(screenY / S)
      const r = 4
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nx = cx + dx, ny = cy + dy
          if (nx < 1 || nx > sw - 2 || ny < 1 || ny > sh - 2) continue
          const d = Math.hypot(dx, dy)
          if (d <= r) buf1[ny * sw + nx] += 480 * (1 - d / r)
        }
      }
    }

    const imgOut = ctx.createImageData(sw, sh)
    const dst = imgOut.data

    function tick() {
      for (let y = 1; y < sh - 1; y++) {
        for (let x = 1; x < sw - 1; x++) {
          const i = y * sw + x
          buf0[i] = (buf1[(y-1)*sw+x] + buf1[(y+1)*sw+x] + buf1[y*sw+x-1] + buf1[y*sw+x+1]) * 0.5 - buf0[i]
          buf0[i] *= 0.987
        }
      }
      const tmp = buf0; buf0 = buf1; buf1 = tmp

      if (wpPx) {
        for (let y = 0; y < sh; y++) {
          for (let x = 0; x < sw; x++) {
            const i = y * sw + x
            const ddx = Math.round((buf1[i + 1] - buf1[i - 1]) * 0.3)
            const ddy = Math.round((buf1[i + sw] - buf1[i - sw]) * 0.3)
            const sx = Math.max(0, Math.min(sw - 1, x + ddx))
            const sy = Math.max(0, Math.min(sh - 1, y + ddy))
            const si = (sy * sw + sx) * 4
            const di = i * 4
            dst[di]     = wpPx[si]
            dst[di + 1] = wpPx[si + 1]
            dst[di + 2] = wpPx[si + 2]
            dst[di + 3] = 255
          }
        }
        ctx!.putImageData(imgOut, 0, 0)
      }
    }

    let fid = 0
    const loop = () => { tick(); fid = requestAnimationFrame(loop) }
    fid = requestAnimationFrame(loop)

    const onDrag = (e: Event) => {
      const { x, y } = (e as CustomEvent<{ x: number; y: number }>).detail
      addRipple(x, y)
    }
    window.addEventListener('win-drag', onDrag)

    return () => {
      cancelAnimationFrame(fid)
      window.removeEventListener('win-drag', onDrag)
    }
  }, [wallpaper])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', backgroundColor: bg }}
    />
  )
}
