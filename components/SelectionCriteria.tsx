'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import TiltCard from '@/components/TiltCard'

const criteria = [
  {
    number: '01',
    title: 'App Activity & Engagement',
    desc: 'How consistently and deeply you use FanLinc daily. Streaks, posts, live sessions, predictions — everything is a signal.',
    accent: '#00ff88',
  },
  {
    number: '02',
    title: 'Creativity & Ideas',
    desc: 'Originality and boldness of your initiatives. The most interesting idea beats the most polished one every time.',
    accent: '#00d4ff',
  },
  {
    number: '03',
    title: 'Impact & Innovation',
    desc: 'Real-world viability and potential to move the needle. We ask: if we built this, would it matter?',
    accent: '#ff0090',
  },
  {
    number: '04',
    title: 'Consistency',
    desc: 'Sustained effort across the full competition period. Not a one-day sprint — a pattern of showing up.',
    accent: '#ffcc00',
  },
]

export default function SelectionCriteria() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduced = useReducedMotion()

  return (
    <section className="bg-[#080810] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col gap-4 mb-14"
        >
          <span className="section-label">How You Get Picked</span>
          <h2
            className="font-russo text-[#f0f4ff] leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            Selected On Four Things
          </h2>
          <p className="font-chakra text-[rgba(240,244,255,0.6)] leading-[1.7]" style={{ fontSize: 'clamp(15px, 1.2vw, 17px)' }}>
            No GPA. No résumé. Just what you do on the platform and the ideas you bring.
          </p>
        </motion.div>

        {/* Criteria cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {criteria.map((c, i) => (
            <CriterionCard key={c.number} criterion={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CriterionCard({
  criterion,
  index,
}: {
  criterion: (typeof criteria)[0]
  index: number
}) {
  return (
    <TiltCard
      delay={index * 0.1}
      spotlightColor={`${criterion.accent}0d`}
      className="rounded-2xl bg-[#0e0e1a] border border-white/[0.07] p-8 overflow-hidden cursor-default transition-colors duration-300 hover:border-white/20"
    >
      {/* Large faded number background */}
      <span
        className="absolute top-4 right-6 font-russo leading-none pointer-events-none select-none tracking-tight"
        style={{
          fontSize: 'clamp(76px, 9vw, 112px)',
          color: `${criterion.accent}24`,
          textShadow: `0 0 20px ${criterion.accent}2b, 0 2px 8px rgba(0,0,0,0.75)`,
          WebkitTextStroke: '1px rgba(255,255,255,0.08)',
        }}
        aria-hidden="true"
      >
        {criterion.number}
      </span>

      <div className="relative z-10 flex flex-col gap-5">
        {/* Small number label */}
        <span
          className="font-space text-[11px] tracking-[0.25em] uppercase"
          style={{ color: criterion.accent }}
        >
          {criterion.number}
        </span>

        <h3
          className="font-russo text-[#f0f4ff] leading-tight"
          style={{ fontSize: 'clamp(20px, 2.2vw, 28px)' }}
        >
          {criterion.title}
        </h3>

        <p
          className="font-chakra text-[rgba(240,244,255,0.7)] leading-[1.75]"
          style={{ fontSize: 'clamp(15px, 1.1vw, 16px)' }}
        >
          {criterion.desc}
        </p>

        {/* Bottom accent line */}
        <div
          className="h-[2px] w-12 rounded-full mt-2"
          style={{ background: criterion.accent }}
          aria-hidden="true"
        />
      </div>
    </TiltCard>
  )
}
