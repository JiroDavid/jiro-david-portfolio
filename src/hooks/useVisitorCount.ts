'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'jd_visited'

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const isNewVisitor = !localStorage.getItem(STORAGE_KEY)

    if (isNewVisitor) {
      localStorage.setItem(STORAGE_KEY, '1')
      fetch('/api/views', { method: 'POST' })
        .then(r => r.json())
        .then(d => setCount(d.count))
        .catch(() => setCount(null))
    } else {
      fetch('/api/views')
        .then(r => r.json())
        .then(d => setCount(d.count))
        .catch(() => setCount(null))
    }
  }, [])

  return count
}
