'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { BookOpen, Rocket, ArrowUpRight, Users, Briefcase, TrendingUp } from 'lucide-react'
import TiltCard from '@/components/TiltCard'

const benefits = [
  {
    icon: BookOpen,
    title: 'Theory → Practice',
    desc: 'Apply classroom frameworks on a live product with real users and real stakes. Not a simulation — the real thing.',
    accent: '#00d4ff',
  },
  {
    icon: Rocket,
    title: 'Your Idea, Your Lead',
    desc: 'Top innovators lead implementation — not just pitch it and walk away. You own it from concept to launch.',
    accent: '#00ff88',
  },
  {
    icon: ArrowUpRight,
    title: 'No Ceiling',
    desc: 'No boxes, no prescribed format. Bold thinking that breaks the mould scores highest. There is no template for winning.',
    accent: '#ff0090',
  },
  {
    icon: Users,
    title: 'Founder-Level Access',
    desc: 'Work directly with Blayz Technologies leadership. Not HR. Not a coordinator. The people who built it.',
    accent: '#ffcc00',
  },
  {
    icon: Briefcase,
    title: 'Real Résumé Material',
    desc: 'LinkedIn feature, certificate, and verifiable startup experience you can point to in every interview.',
    accent: '#a855f7',
  },
  {
    icon: TrendingUp,
    title: 'Skill Signal',
    desc: 'Selected on activity, creativity, impact, and consistency — the exact signals every top employer wants to see.',
    accent: '#00ff88',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function StudentBenefits() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduced = useReducedMotion()
  const animate = reduced ? 'visible' : inView ? 'visible' : 'hidden'

  return (
    <section className="bg-[#080810] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={animate}
          className="flex flex-col gap-14"
        >
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <motion.span variants={itemVariants} className="section-label">
              What You Get Out of It
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-russo text-[#f0f4ff] leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
            >
              Six Reasons This Changes Your Career
            </motion.h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((ben, i) => (
              <TiltCard
                key={ben.title}
                delay={0.1 + i * 0.07}
                spotlightColor={`${ben.accent}12`}
                className="rounded-2xl p-6 flex flex-col gap-4 cursor-default bg-white/[0.04] backdrop-blur-[12px] border border-white/[0.08] hover:border-white/[0.18] transition-colors duration-250"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${ben.accent}14` }}
                >
                  <ben.icon size={22} style={{ color: ben.accent }} aria-hidden="true" />
                </div>
                <div>
                  <h3
                    className="font-russo text-[#f0f4ff] leading-snug mb-2"
                    style={{ fontSize: 'clamp(17px, 1.4vw, 20px)' }}
                  >
                    {ben.title}
                  </h3>
                  <p className="font-chakra text-[rgba(240,244,255,0.65)] text-[14px] leading-[1.7]">
                    {ben.desc}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
