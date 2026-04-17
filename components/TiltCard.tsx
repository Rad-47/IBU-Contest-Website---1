'use client'

import { useRef, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  useReducedMotion,
} from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  maxTilt?: number
  once?: boolean
}

export default function TiltCard({
  children,
  className = '',
  delay = 0,
  maxTilt = 7,
  once = true,
}: TiltCardProps) {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { once, amount: 0.1 })

  const rotXRaw = useMotionValue(0)
  const rotYRaw = useMotionValue(0)
  const rotX = useSpring(rotXRaw, { stiffness: 140, damping: 20, mass: 0.5 })
  const rotY = useSpring(rotYRaw, { stiffness: 140, damping: 20, mass: 0.5 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !wrapRef.current) return
      const r = wrapRef.current.getBoundingClientRect()
      rotYRaw.set(((e.clientX - r.left) / r.width - 0.5) * maxTilt * 2)
      rotXRaw.set(((e.clientY - r.top) / r.height - 0.5) * -maxTilt * 2)
    },
    [reduced, rotXRaw, rotYRaw, maxTilt]
  )

  const handleMouseLeave = useCallback(() => {
    rotXRaw.set(0)
    rotYRaw.set(0)
  }, [rotXRaw, rotYRaw])

  return (
    <div ref={wrapRef} style={{ perspective: '900px' }}>
      <motion.div
        className={className}
        initial={reduced ? false : { opacity: 0, y: 32 }}
        animate={
          reduced
            ? {}
            : inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 32 }
        }
        transition={{
          duration: 0.6,
          delay: reduced ? 0 : delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={
          reduced
            ? undefined
            : { rotateX: rotX, rotateY: rotY }
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.div>
    </div>
  )
}
