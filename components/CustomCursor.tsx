'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function CustomCursor() {
  const reduced = useReducedMotion()
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -200, y: -200 })
  const currRef = useRef({ x: -200, y: -200 })
  const rafRef = useRef<number>(0)
  const mountedRef = useRef(false)

  useEffect(() => {
    if (reduced) return
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    mountedRef.current = true
    document.body.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (cursor.style.opacity === '0') cursor.style.opacity = '1'
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      const isCTA = !!target.closest('[data-cursor="cta"]')
      const isInteractive = !!target.closest('a, button, input, textarea, select, [role="button"], label')

      if (isCTA) {
        cursor.setAttribute('data-state', 'cta')
      } else if (isInteractive) {
        cursor.setAttribute('data-state', 'hover')
      } else {
        cursor.setAttribute('data-state', 'default')
      }
    }

    const tick = () => {
      const lerp = 0.12
      currRef.current.x += (posRef.current.x - currRef.current.x) * lerp
      currRef.current.y += (posRef.current.y - currRef.current.y) * lerp
      cursor.style.transform = `translate(${currRef.current.x}px, ${currRef.current.y}px) translate(-50%, -50%)`
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      data-state="default"
      className="custom-cursor"
      style={{ opacity: 0 }}
    />
  )
}
