'use client'

import { useState, useEffect } from 'react'
import { WindowManagerProvider } from '@/context/WindowManager'
import FloatingBar from '@/components/FloatingBar'
import Desktop from '@/components/Desktop'
import Dock from '@/components/Dock'
import MobilePortfolio from '@/components/MobilePortfolio'
import DesktopPets from '@/components/DesktopPet'

export default function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile === null) return null

  if (isMobile) return <MobilePortfolio />

  return (
    <WindowManagerProvider>
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Desktop />
        <FloatingBar />
        <Dock />
        <DesktopPets />
      </div>
    </WindowManagerProvider>
  )
}
