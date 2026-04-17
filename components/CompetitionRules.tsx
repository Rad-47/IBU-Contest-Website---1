'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const rules = [
  'Download the FanLinc app on iOS or Android.',
  'Create your account and set up your full profile.',
  'Use the app actively — post content, join live sessions, make predictions, engage daily.',
  'Observe the platform critically — identify what works, what\'s missing, and what could be better.',
  'Develop your initiative — this can be a feature idea, marketing campaign, revenue model, UX improvement, video content strategy, business development proposal, or anything else.',
  'Submit your initiative document by the deadline (see submission section below).',
  'Top submissions will be reviewed directly by the Blayz Technologies founding team.',
  'Winners will be announced and offered the premium internship at Blayz Technologies.',
  'All majors and year levels are eligible — any background, any skill set.',
]

export default function CompetitionRules() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduced = useReducedMotion()

  return (
    <section id="rules" className="bg-black py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col gap-4 mb-14"
        >
          <span className="section-label">Competition Rules</span>
          <h2
            className="font-russo text-[#f0f4ff] leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            Simple Rules. No Excuses.
          </h2>
        </motion.div>

        {/* Rules list */}
        <div className="flex flex-col">
          {rules.map((rule, i) => (
            <RuleItem key={i} rule={rule} index={i} reduced={!!reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RuleItem({
  rule,
  index,
  reduced,
}: {
  rule: string
  index: number
  reduced: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, x: -24 }}
      animate={inView || reduced ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => !reduced && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex items-start gap-6 py-6 border-b border-white/[0.06] last:border-b-0 cursor-default overflow-hidden"
    >
      {/* Sliding green left accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-green origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden="true"
      />

      {/* Row background flush */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ background: 'linear-gradient(90deg, rgba(0,255,136,0.04) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      {/* Number */}
      <motion.span
        className="relative flex-shrink-0 font-space text-[11px] tracking-widest w-7 mt-0.5 pl-2"
        animate={{
          color: hovered ? '#00ff88' : '#00ff88',
          textShadow: hovered
            ? '0 0 10px rgba(0,255,136,0.9), 0 0 20px rgba(0,255,136,0.5)'
            : '0 0 0px transparent',
        }}
        transition={{ duration: 0.2 }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      {/* Rule text */}
      <motion.p
        className="relative font-chakra leading-[1.75]"
        animate={{
          color: hovered ? 'rgba(240,244,255,0.95)' : 'rgba(240,244,255,0.8)',
        }}
        transition={{ duration: 0.2 }}
        style={{ fontSize: 'clamp(15px, 1.2vw, 17px)' }}
      >
        {rule}
      </motion.p>
    </motion.div>
  )
}
