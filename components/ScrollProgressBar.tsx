'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const bar = barRef.current
    if (!bar) return

    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      bar.style.transform = `scaleX(${docHeight > 0 ? scrollTop / docHeight : 0})`
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 99998,
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        background: 'linear-gradient(90deg, #00ff88 0%, #00d4ff 50%, #ff0090 100%)',
        boxShadow: '0 0 8px rgba(0,255,136,0.7), 0 0 18px rgba(0,212,255,0.4)',
      }}
    />
  )
}
