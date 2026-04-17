'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import TiltCard from '@/components/TiltCard'

const stats = [
  { label: 'Live Product', sub: 'Real app. Real users. Not a simulation.' },
  { label: 'Real Internship Prize', sub: 'Lead your own idea at Blayz Technologies.' },
  { label: 'Any Major Welcome', sub: 'Zero restrictions on your background.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function WhatIsCompetition() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  const reduced = useReducedMotion()
  const animate = reduced ? 'visible' : inView ? 'visible' : 'hidden'

  return (
    <section id="competition" className="bg-black py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={animate}
          className="flex flex-col gap-12"
        >
          {/* Main card */}
          <TiltCard
            maxTilt={3}
            spotlightColor="rgba(0,255,136,0.06)"
            className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0e0e1a]"
          >
            {/* Green top gradient border */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: 'linear-gradient(90deg, #00ff88 0%, #00d4ff 50%, #ff0090 100%)' }}
              aria-hidden="true"
            />

            <div className="p-8 sm:p-12 lg:p-16 flex flex-col gap-6 max-w-4xl">
              <motion.span variants={itemVariants} className="section-label">
                The Competition
              </motion.span>

              <motion.div variants={itemVariants} className="flex flex-col gap-1">
                <p className="font-space text-[11px] tracking-[0.15em] uppercase text-[rgba(240,244,255,0.45)]">
                  FanLinc × International Business University
                </p>
                <h2
                  className="font-russo text-[#f0f4ff] leading-tight"
                  style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}
                >
                  Campus Innovation Challenge 2026
                </h2>
                <p className="font-space text-[11px] tracking-[0.15em] uppercase text-brand-green mt-1">
                  Powered by Blayz Technologies Inc.
                </p>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="font-chakra text-[rgba(240,244,255,0.75)] leading-[1.8]"
                style={{ fontSize: 'clamp(16px, 1.3vw, 18px)' }}
              >
                This is not a case competition. This is not a simulation. FanLinc is a real, working
                app built by Blayz Technologies Inc. — and we are bringing it to IBU to find the
                sharpest student minds in the building.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="font-chakra text-[rgba(240,244,255,0.75)] leading-[1.8]"
                style={{ fontSize: 'clamp(16px, 1.3vw, 18px)' }}
              >
                Download the app. Use it every day. Observe what works, what doesn't, and what could
                be better. Then bring us your best initiative — whatever form that takes. The top
                innovators don't just get a certificate. They get a premium internship at Blayz
                Technologies and lead the actual implementation of their idea inside a live product.
              </motion.p>
            </div>
          </TiltCard>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stats.map((stat, i) => (
              <TiltCard
                key={stat.label}
                delay={0.1 + i * 0.09}
                spotlightColor="rgba(0,212,255,0.07)"
                className="rounded-xl p-6 text-center flex flex-col gap-3 cursor-default bg-white/[0.04] backdrop-blur-[12px] border border-white/[0.08] hover:border-white/[0.18] transition-colors duration-300"
              >
                <p
                  className="font-russo text-brand-green leading-tight"
                  style={{ fontSize: 'clamp(18px, 2vw, 26px)' }}
                >
                  {stat.label}
                </p>
                <p className="font-chakra text-[rgba(240,244,255,0.6)] text-[14px] leading-[1.6]">
                  {stat.sub}
                </p>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
