'use client'

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
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  children: React.ReactNode
}

export default function AppWindow({
  id,
  title,
  defaultX,
  defaultY,
  defaultW,
  defaultH,
  theme,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  children,
}: Props) {
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
      enableResizing={{
        top: true, right: true, bottom: true, left: true,
        topRight: true, topLeft: true, bottomRight: true, bottomLeft: true,
      }}
    >
      {/* Full-size window shell */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: `1px solid ${theme.border}`,
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        {/* Traffic-light titlebar */}
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
            <button
              className="dot-btn"
              style={{ background: '#ff6058' }}
              onClick={(e) => { e.stopPropagation(); onClose() }}
              aria-label="Close window"
            />
            <button
              className="dot-btn"
              style={{ background: '#ffbd2e' }}
              onClick={(e) => { e.stopPropagation(); onMinimize() }}
              aria-label="Minimise window"
            />
            <button
              className="dot-btn"
              style={{ background: '#28c840', opacity: 0.4, cursor: 'default' }}
              aria-label="Maximise (unavailable)"
            />
          </div>

          <span style={{
            fontSize: '8px',
            letterSpacing: '0.14em',
            color: theme.a1,
            opacity: 0.35,
            flex: 1,
          }}>
            {title}
          </span>
        </div>

        {/* Scrollable content */}
        <div
          className="win-body"
          style={{ background: theme.winBg, color: theme.a1 }}
        >
          {children}
        </div>
      </div>
    </Rnd>
  )
}
