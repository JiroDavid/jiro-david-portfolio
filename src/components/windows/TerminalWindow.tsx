'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { WorkspaceTheme, WorkspaceId } from '@/data/workspaces'

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'art'
  text: string
}

const PROMPT = 'jiro@portfolio:~$'

const NEOFETCH_ART = "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⠟⠉⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠙⢻⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⣠⣄⠀⢻⣿⣿⣿⣿⣿⡿⠀⣠⣄⠀⠀⠀⢻⣿⣿⣏⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⠀⠀⠀⠀⠰⣿⣿⠀⢸⣿⣿⣿⣿⣿⡇⠀⣿⣿⡇⠀⠀⢸⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀⠙⠃⠀⣼⣿⣿⣿⣿⣿⣇⠀⠙⠛⠁⠀⠀⣼⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣷⣤⣄⣀⣠⣤⣾⣿⣿⣿⣿⣽⣿⣿⣦⣄⣀⣀⣤⣾⣿⣿⣿⣿⠃⠀⠀⢀⣀⠀⠀\n⠰⡶⠶⠶⠶⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠛⠉⠉⠙⠛⠋⠀\n⠀⠀⢀⣀⣠⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠷⠶⠶⠶⢤⣤⣀⠀\n⠀⠛⠋⠉⠁⠀⣀⣴⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⣤⣀⡀⠀⠀⠀⠀⠘⠃\n⠀⠀⢀⣤⡶⠟⠉⠁⠀⠀⠉⠛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠉⠀⠀⠀⠉⠙⠳⠶⣄⡀⠀⠀\n⠀⠀⠙⠁⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"

function getResponse(cmd: string, workspaceId: WorkspaceId): TerminalLine[] {
  const c = cmd.trim().toLowerCase()

  if (c === '') return []
  if (c === 'clear') return [{ type: 'output', text: '__CLEAR__' }]
  if (c === 'whoami') return [{ type: 'output', text: 'jiro david / developer, london' }]
  if (c === 'date') return [{ type: 'output', text: new Date().toString() }]
  if (c === 'pwd') return [{ type: 'output', text: '/home/jiro/portfolio' }]
  if (c === 'neofetch') return [
    { type: 'art',    text: NEOFETCH_ART },
    { type: 'output', text: 'jiro@portfolio' },
    { type: 'output', text: '---------------' },
    { type: 'output', text: 'OS:     Portfolio OS v1.0' },
    { type: 'output', text: 'Host:   jirodavid.dev' },
    { type: 'output', text: 'Shell:  next.js 14' },
    { type: 'output', text: 'Theme:  dark / JRPG' },
    { type: 'output', text: 'Uptime: always' },
  ]
  if (c === 'help') {
    const base: TerminalLine[] = [
      { type: 'output', text: 'commands:' },
      { type: 'output', text: '  help       show this list' },
      { type: 'output', text: '  whoami     about me' },
      { type: 'output', text: '  neofetch   system info' },
      { type: 'output', text: '  clear      clear terminal' },
      { type: 'output', text: '  date       current date' },
      { type: 'output', text: '  pwd        working directory' },
    ]
    const extra: Record<WorkspaceId, TerminalLine[]> = {
      home: [
        { type: 'output', text: '  ls         list files' },
        { type: 'output', text: '  cat profile.sh' },
        { type: 'output', text: '  uname      kernel info' },
      ],
      projects: [
        { type: 'output', text: '  ls         list projects' },
        { type: 'output', text: '  git log    commit history' },
        { type: 'output', text: '  npm run dev' },
      ],
      skills: [
        { type: 'output', text: '  ls         list skills' },
        { type: 'output', text: '  python --version' },
        { type: 'output', text: '  node --version' },
        { type: 'output', text: '  pip list' },
      ],
      contact: [
        { type: 'output', text: '  cat contact.md' },
        { type: 'output', text: '  open github' },
        { type: 'output', text: '  open linkedin' },
      ],
    }
    return [...base, ...(extra[workspaceId] ?? [])]
  }

  if (workspaceId === 'home') {
    if (c === 'ls') return [{ type: 'output', text: 'profile.sh  project.log  terminal.sh  wallpapers/' }]
    if (c === 'cat profile.sh') return [
      { type: 'output', text: '#!/bin/bash' },
      { type: 'output', text: '# jiro david, BSc Creative Computing UAL 2026' },
      { type: 'output', text: '# builds tools for creators and gaming' },
      { type: 'output', text: '# python / next.js / fastapi / whisper / comfyui' },
    ]
    if (c === 'uname' || c === 'uname -a') return [{ type: 'output', text: 'Portfolio OS 1.0.0 Next.js #1 SMP x86_64 GNU/Linux' }]
  }

  if (workspaceId === 'projects') {
    if (c === 'ls' || c === 'ls projects/') return [{ type: 'output', text: 'clip_editor.py  storyboarder.py  r6_strat.py  README.md' }]
    if (c === 'git log' || c === 'git log --oneline') return [
      { type: 'output', text: 'fe6b46f  add custom icons: storyboard_logo + whisper' },
      { type: 'output', text: 'c7b5521  fix viewport sizing + wallpapers' },
      { type: 'output', text: '4a2d91c  add preview modal + project links' },
      { type: 'output', text: '2b8f3e1  scaffold desktop OS layout' },
      { type: 'output', text: '1c0a7d9  initial commit' },
    ]
    if (c === 'npm run dev') return [
      { type: 'output', text: '> portfolio-site@0.1.0 dev' },
      { type: 'output', text: '> next dev' },
      { type: 'output', text: '' },
      { type: 'output', text: '  Next.js 14.2.3' },
      { type: 'output', text: '  Local: http://localhost:3000' },
      { type: 'output', text: '  Ready in 1.2s' },
    ]
  }

  if (workspaceId === 'skills') {
    if (c === 'ls') return [{ type: 'output', text: 'python  node  ffmpeg  docker  git  whisper  comfyui' }]
    if (c === 'python --version' || c === 'python3 --version') return [{ type: 'output', text: 'Python 3.11.9' }]
    if (c === 'node --version') return [{ type: 'output', text: 'v20.11.0' }]
    if (c === 'pip list') return [
      { type: 'output', text: 'fastapi         0.111.0' },
      { type: 'output', text: 'openai-whisper  20231117' },
      { type: 'output', text: 'pillow          10.3.0' },
      { type: 'output', text: 'yt-dlp          2024.4.9' },
      { type: 'output', text: 'gradio          4.31.0' },
      { type: 'output', text: 'torch           2.3.0' },
    ]
  }

  if (workspaceId === 'contact') {
    if (c === 'cat contact.md') return [
      { type: 'output', text: '# contact' },
      { type: 'output', text: '' },
      { type: 'output', text: 'email:    jirodavid153@gmail.com' },
      { type: 'output', text: 'phone:    07555 979 116' },
      { type: 'output', text: 'github:   github.com/JiroDavid' },
      { type: 'output', text: 'linkedin: linkedin.com/in/jirodavid' },
      { type: 'output', text: 'location: London, UK' },
    ]
    if (c === 'open github') {
      if (typeof window !== 'undefined') window.open('https://github.com/JiroDavid', '_blank')
      return [{ type: 'output', text: 'opening github.com/JiroDavid...' }]
    }
    if (c === 'open linkedin') {
      if (typeof window !== 'undefined') window.open('https://linkedin.com/in/jirodavid', '_blank')
      return [{ type: 'output', text: 'opening linkedin.com/in/jirodavid...' }]
    }
  }

  return [{ type: 'error', text: `command not found: ${cmd.trim()}  (try 'help')` }]
}

interface Props {
  theme: WorkspaceTheme
  workspaceId: WorkspaceId
}

export default function TerminalWindow({ theme, workspaceId }: Props) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', text: "type 'help' for commands" },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  function submit() {
    const cmd = input.trim()
    const response = getResponse(cmd, workspaceId)

    if (response[0]?.text === '__CLEAR__') {
      setLines([])
      setInput('')
      setHistory(h => cmd ? [cmd, ...h] : h)
      setHistIdx(-1)
      return
    }

    const newLines: TerminalLine[] = [
      { type: 'input', text: cmd },
      ...response,
    ]
    setLines(l => [...l, ...newLines])
    setHistory(h => cmd ? [cmd, ...h] : h)
    setHistIdx(-1)
    setInput('')
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { submit(); return }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[next] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : history[next])
    }
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'text' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '2px', flexWrap: line.type === 'art' ? 'nowrap' : 'wrap' }}>
            {line.type === 'input' && (
              <span style={{ color: theme.a2, fontSize: '9px', flexShrink: 0 }}>{PROMPT}</span>
            )}
            {line.type === 'art' ? (
              <pre style={{
                fontSize: '5px',
                lineHeight: 1.2,
                fontFamily: 'monospace',
                whiteSpace: 'pre',
                overflow: 'hidden',
                margin: 0,
                color: theme.a3,
                opacity: 0.85,
              }}>
                {line.text}
              </pre>
            ) : (
              <span style={{
                fontSize: '9px',
                color: line.type === 'error' ? '#ff6b6b' : line.type === 'input' ? theme.a1 : theme.muted,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                lineHeight: 1.7,
              }}>
                {line.text}
              </span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: '8px', marginTop: '4px', flexShrink: 0,
      }}>
        <span style={{ fontSize: '9px', color: theme.a2, flexShrink: 0 }}>{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          autoFocus
          spellCheck={false}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: theme.a1,
            fontSize: '9px',
            fontFamily: 'inherit',
            caretColor: theme.a2,
          }}
        />
      </div>
    </div>
  )
}
