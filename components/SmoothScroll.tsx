'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Expose globally for nav link handling
    ;(window as Window & { __lenis?: Lenis }).__lenis = lenis

    let animId: number
    function raf(time: number) {
      lenis.raf(time)
      animId = requestAnimationFrame(raf)
    }
    animId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animId)
      lenis.destroy()
      delete (window as Window & { __lenis?: Lenis }).__lenis
    }
  }, [])

  return <>{children}</>
}
