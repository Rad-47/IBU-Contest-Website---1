'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function FooterCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reduced = useReducedMotion()
  const animate = reduced ? 'visible' : inView ? 'visible' : 'hidden'

  return (
    <section className="relative bg-black py-32 sm:py-40 overflow-hidden">
      {/* Aurora radial background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className={`aurora-orb w-[900px] h-[900px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${!reduced ? 'animate-aurora-1' : ''}`}
          style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, rgba(0,212,255,0.05) 40%, transparent 70%)' }}
        />
        <div
          className={`aurora-orb w-[600px] h-[600px] -top-20 -right-20 ${!reduced ? 'animate-aurora-2' : ''}`}
          style={{ background: 'radial-gradient(circle, rgba(255,0,144,0.06) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={animate}
          className="flex flex-col items-center gap-8"
        >
          {/* Massive headline */}
          <div className="flex flex-col items-center leading-[1.05]">
            <motion.span
              variants={itemVariants}
              className="font-russo text-[#f0f4ff] block"
              style={{ fontSize: 'clamp(56px, 10vw, 140px)' }}
            >
              Innovate.
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="font-russo gradient-text block"
              style={{ fontSize: 'clamp(56px, 10vw, 140px)' }}
            >
              Improve.
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="font-russo text-[#f0f4ff] block"
              style={{ fontSize: 'clamp(56px, 10vw, 140px)' }}
            >
              Lead.
            </motion.span>
          </div>

          {/* Sub text */}
          <motion.p
            variants={itemVariants}
            className="font-chakra text-[rgba(240,244,255,0.65)] max-w-xl leading-[1.75]"
            style={{ fontSize: 'clamp(16px, 1.4vw, 19px)' }}
          >
            Download the app. Start using it. See what you notice. Submit what you think. The best
            initiative leads.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            {/* iOS */}
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
              className="inline-flex items-center gap-3 bg-brand-green text-black font-chakra font-bold px-6 py-3.5 rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer min-w-[180px] shadow-[0_0_60px_rgba(0,255,136,0.2)]"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
                <path fill="#1a1a1a" d="M3.18 23.76c.35.2.74.24 1.12.15l11.25-11.27-2.88-2.88z"/>
                <path fill="#1a1a1a" d="M20.32 10.25 17.5 8.62l-3.22 3.22 3.22 3.22 2.82-1.63c.8-.47.8-1.71 0-2.18z"/>
                <path fill="#1a1a1a" d="M4.3.09C3.92 0 3.53.04 3.18.24L14.28 11.34l2.88-2.88z"/>
                <path fill="#1a1a1a" d="M3.18 23.76l11.1-11.1-2.88-2.88L3.18.24C2.94.4 2.76.67 2.76 1v22c0 .33.18.6.42.76z"/>
              </svg>
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-normal tracking-wide opacity-70">Get it on</span>
                <span className="text-[16px] font-bold leading-none">Google Play</span>
              </span>
            </a>
            <a
              href="#rules"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('rules')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 border border-white/20 text-[#f0f4ff] font-chakra font-semibold text-base px-8 py-4 rounded-xl hover:border-white/40 hover:bg-white/5 active:scale-[0.97] transition-all duration-200 cursor-pointer"
            >
              Read the Full Brief
            </a>
          </motion.div>

          {/* Powered by */}
          <motion.p variants={itemVariants} className="font-space text-[10px] tracking-[0.2em] uppercase text-[rgba(240,244,255,0.3)] mt-4">
            Powered by Blayz Technologies Inc.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
