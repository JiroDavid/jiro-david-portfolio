'use client'

import { useState } from 'react'
import { Rnd } from 'react-rnd'
import { WorkspaceTheme } from '@/data/workspaces'

interface Props {
  id: string
  title: string
  defaultX: number
  defaultY: number
  defaultW: number
  defaultH: number
  theme: WorkspaceTheme
  zIndex: number
  isClosing?: boolean
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  children: React.ReactNode
}

export default function AppWindow({
  id, title, defaultX, defaultY, defaultW, defaultH,
  theme, zIndex, isClosing, onClose, onMinimize, onFocus, children,
}: Props) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Rnd
      key={id}
      default={{ x: defaultX, y: defaultY, width: defaultW, height: defaultH }}
      minWidth={220}
      minHeight={180}
      bounds="parent"
      dragHandleClassName="app-win-titlebar"
      style={{ zIndex, position: 'absolute' }}
      onMouseDown={onFocus}
      onDragStart={() => setIsDragging(true)}
      onDrag={(e) => {
        const me = e as MouseEvent
        if (me.clientX !== undefined) {
          window.dispatchEvent(new CustomEvent('win-drag', { detail: { x: me.clientX, y: me.clientY } }))
        }
      }}
      onDragStop={() => setIsDragging(false)}
      enableResizing={{
        top: true, right: true, bottom: true, left: true,
        topRight: true, topLeft: true, bottomRight: true, bottomLeft: true,
      }}
    >
      <div
        className={isClosing ? 'win-exit' : 'win-enter'}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: `1px solid ${theme.border}`,
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: isDragging
            ? '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 8px 40px rgba(0,0,0,0.5)',
          position: 'relative',
          opacity: isDragging ? 0.82 : 1,
          filter: isDragging ? 'blur(0.4px)' : 'none',
          transform: isDragging ? 'scale(1.01)' : 'scale(1)',
          transition: isDragging ? 'none' : 'opacity 0.15s, filter 0.15s, transform 0.15s, box-shadow 0.15s',
        }}
      >
        <div
          className="app-win-titlebar"
          style={{
            height: '34px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 12px',
            background: theme.winBg,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '10px 10px 0 0',
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            <button className="dot-btn" style={{ background: '#ff6058' }}
              onClick={(e) => { e.stopPropagation(); onClose() }} aria-label="Close" />
            <button className="dot-btn" style={{ background: '#ffbd2e' }}
              onClick={(e) => { e.stopPropagation(); onMinimize() }} aria-label="Minimise" />
            <button className="dot-btn" style={{ background: '#28c840', opacity: 0.4, cursor: 'default' }}
              aria-label="Maximise (unavailable)" />
          </div>
          <span style={{ fontSize: '8px', letterSpacing: '0.14em', color: theme.a1, opacity: 0.35, flex: 1 }}>
            {title}
          </span>
        </div>
        <div className="win-body" style={{ background: theme.winBg, color: theme.a1 }}>
          {children}
        </div>
      </div>
    </Rnd>
  )
}
