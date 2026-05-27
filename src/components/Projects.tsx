'use client'

import Image from 'next/image'
import { useState } from 'react'
import Panel from './Panel'
import { projects } from '@/data/projects'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Projects() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="projects" ref={ref} className="reveal px-7 py-9 border-b border-dark-border">

      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-[9px] text-brick">プロジェクト</span>
        <span className="text-[9px] tracking-widest text-sage">PROJECTS</span>
        <span className="section-rule" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const [imgError, setImgError] = useState(false)

  return (
    <Panel className="flex flex-col cursor-pointer group hover:bg-dark-panel transition-colors duration-150">

      {/* Image slot — drop your screenshot in public/assets/ */}
      <div className="relative h-40 border-b border-dark-border overflow-hidden">
        {!imgError ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="img-placeholder">
            [ screenshot / demo gif ]
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[8px] tracking-widest text-brick mb-1.5">
          {project.id}
        </p>
        <h2 className="text-[13px] font-bold text-cream mb-2">
          {project.title}
        </h2>
        <p className="text-[9px] text-muted leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[8px] px-2 py-0.5 border border-dark-border text-sage"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-dark-border">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[8px] text-cream opacity-40 tracking-wide hover:opacity-80 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            github ↗
          </a>
          <span className="text-[8px] text-sage tracking-widest">
            ★ COMPLETE
          </span>
        </div>
      </div>
    </Panel>
  )
}
