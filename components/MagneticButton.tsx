'use client'

import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export default function MagneticButton({
  children,
  strength = 0.28,
  className = '',
}: MagneticButtonProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.6 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      x.set((e.clientX - cx) * strength)
      y.set((e.clientY - cy) * strength)
    },
    [reduced, strength, x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
