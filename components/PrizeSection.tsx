'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Rocket, Users, Linkedin, Award, Zap, BarChart2 } from 'lucide-react'

const prizeItems = [
  {
    icon: Rocket,
    title: 'Lead Your Idea',
    desc: 'From concept to live implementation inside a real product. Not hand it off — own it.',
  },
  {
    icon: Users,
    title: 'Work with Founders',
    desc: 'Direct access to Blayz Technologies leadership team. Not HR. Not a coordinator.',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Feature',
    desc: 'Your innovation publicly attributed to you professionally. Real credibility, real signal.',
  },
  {
    icon: Award,
    title: 'Certificate & Rewards',
    desc: 'Formal recognition of your contribution, plus rewards tied to the competition outcome.',
  },
  {
    icon: Zap,
    title: 'Real Startup Experience',
    desc: 'The kind most graduates can\'t point to. A verifiable, meaningful stint at a live startup.',
  },
  {
    icon: BarChart2,
    title: 'Theory Meets Practice',
    desc: 'Everything from class, applied on a live product with real users and real consequences.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function PrizeSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduced = useReducedMotion()
  const animate = reduced ? 'visible' : inView ? 'visible' : 'hidden'

  return (
    <section id="prize" className="relative bg-black py-24 sm:py-32 overflow-hidden">
      {/* Gold glow radial */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,204,0,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={animate}
          className="flex flex-col gap-14"
        >
          {/* Section label */}
          <motion.span variants={itemVariants} className="section-label">
            Top Prize
          </motion.span>

          {/* Main prize card */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-2xl bg-[#0e0e1a] border border-white/[0.07] overflow-hidden"
          >
            {/* Gold top border */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: 'linear-gradient(90deg, #ffcc00 0%, #ff9900 50%, transparent 100%)' }}
              aria-hidden="true"
            />

            <div className="p-8 sm:p-12 lg:p-16 flex flex-col gap-6 max-w-4xl">
              <div>
                <h2
                  className="font-russo gradient-text-gold leading-tight"
                  style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}
                >
                  Premium Internship
                </h2>
                <h2
                  className="font-russo text-[#f0f4ff] leading-tight"
                  style={{ fontSize: 'clamp(24px, 3.5vw, 52px)' }}
                >
                  at Blayz Technologies
                </h2>
              </div>

              <p className="font-space text-[11px] tracking-[0.2em] uppercase text-brand-gold">
                Awarded to the Top Innovators
              </p>

              <p
                className="font-chakra text-[rgba(240,244,255,0.75)] leading-[1.8]"
                style={{ fontSize: 'clamp(16px, 1.3vw, 18px)' }}
              >
                Selected students will receive internship opportunities at Blayz Technologies.
                The top 3 among selected interns will also receive prize money in addition to the
                internship because of their unique idea and work.
              </p>
            </div>
          </motion.div>

          {/* Prize items grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {prizeItems.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="rounded-2xl bg-[#0e0e1a] border border-white/[0.07] p-6 flex flex-col gap-3 cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-[0_0_30px_rgba(255,204,0,0.06)]"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-brand-gold" aria-hidden="true" />
                </div>
                <h3 className="font-russo text-[#f0f4ff] text-[18px] leading-snug">
                  {item.title}
                </h3>
                <p className="font-chakra text-[rgba(240,244,255,0.65)] text-[14px] leading-[1.7]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
