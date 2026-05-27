'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { WorkspaceId, workspaces } from '@/data/workspaces'

export interface WindowState {
  open: boolean
  minimized: boolean
  zIndex: number
}

type AllWindowStates = Record<WorkspaceId, Record<string, WindowState>>

interface WMContextValue {
  activeWorkspace: WorkspaceId
  switchWorkspace: (id: WorkspaceId) => void
  windowStates: AllWindowStates
  openWindow: (windowId: string) => void
  closeWindow: (windowId: string) => void
  minimizeWindow: (windowId: string) => void
  bringToFront: (windowId: string) => void
}

const WMContext = createContext<WMContextValue | null>(null)

function buildInitialStates(): AllWindowStates {
  const states: Partial<AllWindowStates> = {}
  for (const [wsId, ws] of Object.entries(workspaces)) {
    states[wsId as WorkspaceId] = Object.fromEntries(
      ws.windows.map((w, i) => [w.id, { open: true, minimized: false, zIndex: 10 + i }])
    )
  }
  return states as AllWindowStates
}

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>('home')
  const [windowStates, setWindowStates] = useState<AllWindowStates>(buildInitialStates)
  const [topZ, setTopZ] = useState(20)

  const switchWorkspace = useCallback((id: WorkspaceId) => {
    setActiveWorkspace(id)
  }, [])

  const bringToFront = useCallback((windowId: string) => {
    setTopZ((z) => {
      const next = z + 1
      setWindowStates((prev) => {
        const ws = activeWorkspace
        return {
          ...prev,
          [ws]: {
            ...prev[ws],
            [windowId]: { ...prev[ws][windowId], zIndex: next },
          },
        }
      })
      return next
    })
  }, [activeWorkspace])

  const openWindow = useCallback((windowId: string) => {
    setTopZ((z) => {
      const next = z + 1
      setWindowStates((prev) => {
        const ws = activeWorkspace
        const existing = prev[ws][windowId] ?? { open: false, minimized: false, zIndex: 10 }
        return {
          ...prev,
          [ws]: {
            ...prev[ws],
            [windowId]: { ...existing, open: true, minimized: false, zIndex: next },
          },
        }
      })
      return next
    })
  }, [activeWorkspace])

  const closeWindow = useCallback((windowId: string) => {
    setWindowStates((prev) => {
      const ws = activeWorkspace
      return {
        ...prev,
        [ws]: {
          ...prev[ws],
          [windowId]: { ...prev[ws][windowId], open: false, minimized: false },
        },
      }
    })
  }, [activeWorkspace])

  const minimizeWindow = useCallback((windowId: string) => {
    setWindowStates((prev) => {
      const ws = activeWorkspace
      return {
        ...prev,
        [ws]: {
          ...prev[ws],
          [windowId]: { ...prev[ws][windowId], minimized: true },
        },
      }
    })
  }, [activeWorkspace])

  return (
    <WMContext.Provider
      value={{
        activeWorkspace,
        switchWorkspace,
        windowStates,
        openWindow,
        closeWindow,
        minimizeWindow,
        bringToFront,
      }}
    >
      {children}
    </WMContext.Provider>
  )
}

export function useWindowManager() {
  const ctx = useContext(WMContext)
  if (!ctx) throw new Error('useWindowManager must be used inside WindowManagerProvider')
  return ctx
}
