'use client'

import { useState } from 'react'
import Image from 'next/image'
import { WorkspaceTheme } from '@/data/workspaces'
import { Project } from '@/data/projects'

interface Props {
  theme: WorkspaceTheme
  project: Project
}

export default function ProjectWindow({ theme, project }: Props) {
  const [imgError, setImgError] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Screenshot slot */}
      <div style={{
        position: 'relative', height: '130px', flexShrink: 0,
        background: 'rgba(0,0,0,0.3)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        margin: '-16px -16px 16px',
        overflow: 'hidden',
      }}>
        {!imgError ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '8px', letterSpacing: '0.1em', color: theme.muted, opacity: 0.4,
          }}>
            [ screenshot coming soon ]
          </div>
        )}
      </div>

      {/* Project ID + title */}
      <p style={{ fontSize: '8px', color: theme.a2, letterSpacing: '0.15em', marginBottom: '5px' }}>
        {project.id}
      </p>
      <h2 style={{ fontSize: '16px', fontWeight: 700, color: theme.a1, marginBottom: '10px' }}>
        {project.title}
      </h2>

      {/* Description */}
      <p style={{ fontSize: '9px', color: theme.muted, lineHeight: 1.75, marginBottom: '14px' }}>
        {project.description}
      </p>

      {/* Tech pills */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '7px', letterSpacing: '0.15em', color: theme.muted, opacity: 0.5, marginBottom: '7px' }}>
          STACK
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {project.tech.map((t) => (
            <span key={t} className="pill-tag" style={{ borderColor: `${theme.border}55` }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Links section */}
      <div style={{
        paddingTop: '12px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        flex: 1,
      }}>
        <p style={{ fontSize: '7px', letterSpacing: '0.15em', color: theme.muted, opacity: 0.5 }}>
          LINKS
        </p>

        {/* GitHub */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="ti ti-brand-github" style={{ fontSize: '14px', color: theme.muted, flexShrink: 0 }} aria-hidden="true" />
          <div>
            <p style={{ fontSize: '7px', letterSpacing: '0.1em', color: theme.muted, marginBottom: '2px' }}>GITHUB</p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '9px', color: theme.a1, textDecoration: 'none', opacity: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {project.github.replace('https://github.com/', '')} ↗
            </a>
          </div>
        </div>

        {/* Project Breakdown (YouTube) */}
        {project.youtube && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="ti ti-brand-youtube" style={{ fontSize: '14px', color: theme.muted, flexShrink: 0 }} aria-hidden="true" />
            <div>
              <p style={{ fontSize: '7px', letterSpacing: '0.1em', color: theme.muted, marginBottom: '2px' }}>PROJECT BREAKDOWN</p>
              <a
                href={project.youtube}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '9px', color: theme.a1, textDecoration: 'none', opacity: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                Watch on YouTube ↗
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Status badge */}
      <div style={{
        marginTop: '12px',
        paddingTop: '10px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <span style={{ fontSize: '7px', letterSpacing: '0.12em', color: theme.a3 }}>★ COMPLETE</span>
      </div>
    </div>
  )
}
