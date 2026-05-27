'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { WorkspaceTheme } from '@/data/workspaces'
import { Project } from '@/data/projects'

interface Props {
  theme: WorkspaceTheme
  project: Project
}

function PreviewModal({ project, theme, onClose }: { project: Project; theme: WorkspaceTheme; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const modal = (
    <div
      ref={ref}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '18px',
      } as React.CSSProperties}
    >
      {/* Close button — top left */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '20px', left: '20px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '6px',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '11px', letterSpacing: '0.12em',
          padding: '7px 14px',
          cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}
      >
        <i className="ti ti-x" style={{ fontSize: '13px' }} /> CLOSE
      </button>

      {/* Image — stop propagation so clicking it doesn't close */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={project.title}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '78vw', maxHeight: '68vh',
          objectFit: 'contain',
          borderRadius: '10px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
          border: `1px solid ${theme.border}33`,
          display: 'block',
        }}
      />

      {/* Buttons */}
      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', gap: '12px' }}>
        <a
          href={project.github}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 22px',
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            background: 'rgba(255,255,255,0.05)',
            color: theme.a1, fontSize: '11px', letterSpacing: '0.1em',
            textDecoration: 'none', fontFamily: 'inherit',
          }}
        >
          <i className="ti ti-brand-github" style={{ fontSize: '15px' }} />
          GITHUB
        </a>

        {project.youtube && (
          <a
            href={project.youtube}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 22px',
              border: `1px solid ${theme.border}`,
              borderRadius: '6px',
              background: `${theme.a2}20`,
              color: theme.a1, fontSize: '11px', letterSpacing: '0.1em',
              textDecoration: 'none', fontFamily: 'inherit',
            }}
          >
            <i className="ti ti-brand-youtube" style={{ fontSize: '15px' }} />
            PROJECT BREAKDOWN
          </a>
        )}
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

export default function ProjectWindow({ theme, project }: Props) {
  const [imgError, setImgError]       = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [mounted, setMounted]         = useState(false)

  // Portal needs the DOM to be ready
  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      {mounted && showPreview && (
        <PreviewModal project={project} theme={theme} onClose={() => setShowPreview(false)} />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Screenshot slot */}
        <div
          onClick={() => !imgError && setShowPreview(true)}
          style={{
            position: 'relative', height: '140px', flexShrink: 0,
            background: 'rgba(0,0,0,0.3)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            margin: '-16px -16px 16px',
            overflow: 'hidden',
            cursor: imgError ? 'default' : 'zoom-in',
            userSelect: 'none',
          }}
        >
          {!imgError ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={() => setImgError(true)}
              />
              {/* Hover overlay */}
              <div className="screenshot-hover-overlay" />
            </>
          ) : (
            <div style={{
              width: '100%', height: '100%', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', letterSpacing: '0.1em', color: theme.muted, opacity: 0.4,
            }}>
              [ screenshot coming soon ]
            </div>
          )}
        </div>

        {/* Project ID + title */}
        <p style={{ fontSize: '9px', color: theme.a2, letterSpacing: '0.15em', marginBottom: '5px' }}>
          {project.id}
        </p>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: theme.a1, marginBottom: '10px' }}>
          {project.title}
        </h2>

        {/* Description */}
        <p style={{ fontSize: '10px', color: theme.muted, lineHeight: 1.75, marginBottom: '14px' }}>
          {project.description}
        </p>

        {/* Tech pills */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '8px', letterSpacing: '0.15em', color: theme.muted, opacity: 0.5, marginBottom: '7px' }}>
            STACK
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {project.tech.map((t) => (
              <span key={t} className="pill-tag" style={{ borderColor: `${theme.border}55` }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{
          paddingTop: '12px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', flexDirection: 'column', gap: '10px', flex: 1,
        }}>
          <p style={{ fontSize: '8px', letterSpacing: '0.15em', color: theme.muted, opacity: 0.5 }}>LINKS</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="ti ti-brand-github" style={{ fontSize: '16px', color: theme.muted, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '8px', letterSpacing: '0.1em', color: theme.muted, marginBottom: '2px' }}>GITHUB</p>
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '10px', color: theme.a1, textDecoration: 'none', opacity: 0.85 }}
                onClick={(e) => e.stopPropagation()}>
                {project.github.replace('https://github.com/', '')} ↗
              </a>
            </div>
          </div>

          {project.youtube && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="ti ti-brand-youtube" style={{ fontSize: '16px', color: theme.muted, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '8px', letterSpacing: '0.1em', color: theme.muted, marginBottom: '2px' }}>PROJECT BREAKDOWN</p>
                <a href={project.youtube} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '10px', color: theme.a1, textDecoration: 'none', opacity: 0.85 }}
                  onClick={(e) => e.stopPropagation()}>
                  Watch on YouTube ↗
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <div style={{
          marginTop: '12px', paddingTop: '10px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <span style={{ fontSize: '8px', letterSpacing: '0.12em', color: theme.a3 }}>★ COMPLETE</span>
        </div>
      </div>
    </>
  )
}
