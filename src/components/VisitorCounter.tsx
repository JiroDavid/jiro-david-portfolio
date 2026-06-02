'use client'

import { useState } from 'react'
import { useVisitorCount } from '@/hooks/useVisitorCount'
import { WorkspaceTheme } from '@/data/workspaces'

export default function VisitorCounter({ theme }: { theme: WorkspaceTheme }) {
  const count = useVisitorCount()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 10px)',
          right: 0,
          background: 'rgba(10, 10, 10, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${theme.border}`,
          borderRadius: '6px',
          padding: '7px 12px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.15s ease, transform 0.15s ease',
        }}
      >
        <span style={{ fontSize: '8px', letterSpacing: '0.12em', color: theme.muted }}>
          UNIQUE VISITORS
        </span>
        <span style={{ fontSize: '13px', fontWeight: 700, color: theme.a1, display: 'block', marginTop: '2px' }}>
          {count === null ? '—' : count.toLocaleString()}
        </span>
      </div>

      {/* Eye icon */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          opacity: hovered ? 1 : 0.45,
          transition: 'opacity 0.15s ease',
          filter: hovered ? `drop-shadow(0 0 6px ${theme.a1})` : 'none',
        }}
      >
        {/* Outer eye shape */}
        <path
          d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
          stroke={theme.a1}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Iris */}
        <circle cx="12" cy="12" r="3.5" stroke={theme.a1} strokeWidth="1.5" />
        {/* Pupil */}
        <circle cx="12" cy="12" r="1.2" fill={theme.a1} />
        {/* Corner tick marks — Valorant style */}
        <line x1="1" y1="12" x2="4" y2="12" stroke={theme.a2} strokeWidth="1" opacity="0.5" />
        <line x1="20" y1="12" x2="23" y2="12" stroke={theme.a2} strokeWidth="1" opacity="0.5" />
      </svg>

      {/* Count below icon */}
      <span
        style={{
          fontSize: '8px',
          letterSpacing: '0.1em',
          color: hovered ? theme.a1 : theme.muted,
          fontWeight: 700,
          transition: 'color 0.15s ease',
        }}
      >
        {count === null ? '—' : count.toLocaleString()}
      </span>
    </div>
  )
}
