'use client'

import { useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useMotionValue, useSpring } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function Hero() {
  const reduced = useReducedMotion()
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 120, damping: 18, mass: 0.5 })
  const rotateY = useSpring(tiltY, { stiffness: 120, damping: 18, mass: 0.5 })

  const f = (delay = 0) =>
    reduced ? {} : fadeUp(delay)

  const handleTitleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    tiltY.set(x * 10)
    tiltX.set(y * -8)
  }, [tiltX, tiltY])

  const handleTitleMouseLeave = useCallback(() => {
    tiltX.set(0)
    tiltY.set(0)
  }, [tiltX, tiltY])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className={`aurora-orb w-[700px] h-[700px] -top-60 -left-40 ${!reduced ? 'animate-aurora-1' : ''}`}
          style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.18) 0%, transparent 70%)' }}
        />
        <div
          className={`aurora-orb w-[600px] h-[600px] -top-40 -right-40 ${!reduced ? 'animate-aurora-2' : ''}`}
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.14) 0%, transparent 70%)' }}
        />
        <div
          className={`aurora-orb w-[500px] h-[500px] bottom-0 left-1/2 -translate-x-1/2 ${!reduced ? 'animate-aurora-3' : ''}`}
          style={{ background: 'radial-gradient(circle, rgba(255,0,144,0.10) 0%, transparent 70%)' }}
        />
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
        {/* Live badge */}
        <motion.div {...f(0)} className="flex items-center gap-2 bg-white/5 border border-brand-green/30 rounded-full px-4 py-2">
          <span
            className={`w-2 h-2 rounded-full bg-brand-green flex-shrink-0 ${!reduced ? 'animate-pulse-dot' : ''}`}
            aria-hidden="true"
          />
          <span className="font-space text-[11px] tracking-[0.2em] uppercase text-brand-green">
            Live Competition — Open Now
          </span>
        </motion.div>

        {/* Deadline banner */}
        <motion.div
          {...f(0.05)}
          className="flex items-center gap-3 bg-[rgba(255,204,0,0.08)] border border-[rgba(255,204,0,0.35)] rounded-2xl px-5 py-3"
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#ffcc00] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="2" y="3" width="16" height="15" rx="2.5" />
            <path d="M2 8h16M7 1v3M13 1v3" />
          </svg>
          <span className="font-space text-[12px] tracking-[0.18em] uppercase">
            <span className="text-[rgba(240,244,255,0.55)]">Deadline&nbsp;&nbsp;</span>
            <span className="text-[#ffcc00] font-semibold">April 20 – April 27, 2026</span>
          </span>
        </motion.div>

        {/* Presented by */}
        <motion.p {...f(0.1)} className="font-space text-[11px] tracking-[0.15em] uppercase text-[rgba(240,244,255,0.45)]">
          Blayz Technologies Inc. Presents
        </motion.p>

        {/* Main headline */}
        <div className="w-full flex justify-center" style={reduced ? undefined : { perspective: '1300px' }}>
          <motion.div
            {...f(0.2)}
            className="flex flex-col items-center gap-1 leading-tight"
            style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={reduced ? undefined : handleTitleMouseMove}
            onMouseLeave={reduced ? undefined : handleTitleMouseLeave}
          >
            <div style={reduced ? undefined : { transform: 'translateZ(56px)' }}>
              <h1
                data-text="FanLinc"
                className={`font-russo gradient-text cyberpunk-title cyberpunk-title-brand ${!reduced ? 'cyberpunk-title-motion cyberpunk-delay-0' : ''}`}
                style={{ fontSize: 'clamp(64px, 10vw, 140px)', lineHeight: 1.0 }}
              >
                FanLinc
              </h1>
            </div>
            <div style={reduced ? undefined : { transform: 'translateZ(34px)' }}>
              <h1
                data-text="IBU Campus Innovation"
                className={`font-russo text-[#ffffff] cyberpunk-title ${!reduced ? 'cyberpunk-title-motion cyberpunk-delay-1' : ''}`}
                style={{ fontSize: 'clamp(36px, 6vw, 88px)', lineHeight: 1.1 }}
              >
                IBU Campus Innovation
              </h1>
            </div>
            <div style={reduced ? undefined : { transform: 'translateZ(20px)' }}>
              <h1
                data-text="Challenge 2026"
                className={`font-russo text-[#ffffff] cyberpunk-title ${!reduced ? 'cyberpunk-title-motion cyberpunk-delay-2' : ''}`}
                style={{ fontSize: 'clamp(36px, 6vw, 88px)', lineHeight: 1.1 }}
              >
                Challenge 2026
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Body */}
        <motion.p
          {...f(0.3)}
          className="font-chakra text-[rgba(240,244,255,0.9)] max-w-2xl"
          style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', lineHeight: 1.6 }}
        >
          This competition is about finding the boldest innovators in business and tech — people who can think creatively, move fast, and make a real impact on a live product.
        </motion.p>

        {/* Subheading */}
        <motion.p
          {...f(0.4)}
          className="font-chakra italic font-bold text-[rgba(240,244,255,0.65)] max-w-xl leading-[1.75]"
          style={{
            fontSize: 'clamp(16px, 1.5vw, 18px)',
            textShadow: '0 0 18px rgba(0,212,255,0.45), 0 0 40px rgba(0,255,136,0.2)',
          }}
        >
          Any Background. Any Major. Bold Thinking Has No Prerequisites.
        </motion.p>

        {/* CTAs */}
        <motion.div {...f(0.5)} className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mt-2">
          {/* iOS App Store */}
          <a
            href="https://apps.apple.com/us/app/fanlinc/id6755227235"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black font-chakra font-bold px-6 py-3.5 rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer min-w-[180px]"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0 fill-black" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] font-normal tracking-wide opacity-70">Download on the</span>
              <span className="text-[16px] font-bold leading-none">App Store</span>
            </span>
          </a>

          {/* Google Play */}
          <a
            href="https://play.google.com/store/apps/details?id=com.fanlinc&hl=en_CA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black font-chakra font-bold px-6 py-3.5 rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer min-w-[180px]"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
              <path fill="#EA4335" d="M3.18 23.76c.35.2.74.24 1.12.15l11.25-11.27-2.88-2.88z"/>
              <path fill="#FBBC04" d="M20.32 10.25 17.5 8.62l-3.22 3.22 3.22 3.22 2.82-1.63c.8-.47.8-1.71 0-2.18z"/>
              <path fill="#4285F4" d="M4.3.09C3.92 0 3.53.04 3.18.24L14.28 11.34l2.88-2.88z"/>
              <path fill="#34A853" d="M3.18 23.76l11.1-11.1-2.88-2.88L3.18.24C2.94.4 2.76.67 2.76 1v22c0 .33.18.6.42.76z"/>
            </svg>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] font-normal tracking-wide opacity-70">Get it on</span>
              <span className="text-[16px] font-bold leading-none">Google Play</span>
            </span>
          </a>

          {/* Learn More */}
          <button
            onClick={() => {
              const el = document.getElementById('about')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 border border-white/20 text-[#f0f4ff] font-chakra font-semibold text-base px-8 py-4 rounded-xl hover:border-white/40 hover:bg-white/5 active:scale-[0.97] transition-all duration-200 cursor-pointer"
          >
            Learn More
          </button>
        </motion.div>
      </div>

    </section>
  )
}
