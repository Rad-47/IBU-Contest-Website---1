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
  spotlight?: boolean
  spotlightColor?: string
}

export default function TiltCard({
  children,
  className = '',
  delay = 0,
  maxTilt = 7,
  once = true,
  spotlight = true,
  spotlightColor = 'rgba(0,255,136,0.09)',
}: TiltCardProps) {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { once, amount: 0.1 })

  const rotXRaw = useMotionValue(0)
  const rotYRaw = useMotionValue(0)
  const rotX = useSpring(rotXRaw, { stiffness: 140, damping: 20, mass: 0.5 })
  const rotY = useSpring(rotYRaw, { stiffness: 140, damping: 20, mass: 0.5 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !wrapRef.current) return
      const r = wrapRef.current.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width
      const ny = (e.clientY - r.top) / r.height
      rotYRaw.set((nx - 0.5) * maxTilt * 2)
      rotXRaw.set((ny - 0.5) * -maxTilt * 2)

      if (spotlight && spotRef.current) {
        spotRef.current.style.setProperty('--spot-x', `${nx * 100}%`)
        spotRef.current.style.setProperty('--spot-y', `${ny * 100}%`)
        spotRef.current.style.opacity = '1'
      }
    },
    [reduced, rotXRaw, rotYRaw, maxTilt, spotlight]
  )

  const handleMouseLeave = useCallback(() => {
    rotXRaw.set(0)
    rotYRaw.set(0)
    if (spotlight && spotRef.current) {
      spotRef.current.style.opacity = '0'
    }
  }, [rotXRaw, rotYRaw, spotlight])

  return (
    <div ref={wrapRef} style={{ perspective: '900px' }}>
      <motion.div
        className={`relative ${className}`}
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
        style={reduced ? undefined : { rotateX: rotX, rotateY: rotY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {spotlight && !reduced && (
          <div
            ref={spotRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              opacity: 0,
              zIndex: 10,
              transition: 'opacity 0.35s ease',
              background: `radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 65%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
