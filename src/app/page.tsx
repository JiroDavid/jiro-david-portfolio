import { WindowManagerProvider } from '@/context/WindowManager'
import FloatingBar from '@/components/FloatingBar'
import Desktop from '@/components/Desktop'
import Dock from '@/components/Dock'

export default function Home() {
  return (
    <WindowManagerProvider>
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Desktop />
        <FloatingBar />
        <Dock />
      </div>
    </WindowManagerProvider>
  )
}
