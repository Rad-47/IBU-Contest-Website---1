'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const pills = [
  'Any Background',
  'Any Major',
  'Any Skill Set',
  'Video Creators Welcome',
  'Zero Gatekeeping',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function OpenFieldPrinciple() {
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
        >
          {/* Section label */}
          <motion.span variants={itemVariants} className="section-label block mb-8">
            No Rules. No Boxes.
          </motion.span>

          {/* Main card */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-2xl bg-[#0e0e1a] border border-white/[0.06] overflow-hidden"
          >
            {/* Left green accent border */}
            <div
              className="absolute top-0 left-0 bottom-0 w-[3px]"
              style={{ background: 'linear-gradient(180deg, #00ff88 0%, #00d4ff 50%, transparent 100%)' }}
              aria-hidden="true"
            />

            <div className="p-8 sm:p-12 lg:p-16 flex flex-col gap-8">
              {/* Tag pill */}
              <motion.div variants={itemVariants}>
                <span className="inline-flex font-space text-[10px] tracking-[0.2em] uppercase text-brand-green bg-brand-green/10 border border-brand-green/25 rounded-full px-4 py-1.5">
                  The Open Field Principle
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                variants={itemVariants}
                className="font-russo text-[#f0f4ff] leading-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                Unleash Your Skills — Not Fit Into a Box
              </motion.h2>

              {/* Body paragraphs */}
              <motion.div variants={itemVariants} className="flex flex-col gap-6 max-w-4xl">
                <p
                  className="font-chakra text-[rgba(240,244,255,0.8)] leading-[1.8]"
                  style={{ fontSize: 'clamp(16px, 1.3vw, 18px)' }}
                >
                  Everything you have studied was theory in a classroom. This is where you apply it
                  — on a live product, with real users, real decisions, and real stakes. There are no
                  boxes here, no prescribed format, and no single right answer.
                </p>

                <p
                  className="font-chakra text-[rgba(240,244,255,0.8)] leading-[1.8]"
                  style={{ fontSize: 'clamp(16px, 1.3vw, 18px)' }}
                >
                  If you are good at business strategy — map out a market expansion plan we haven't
                  thought of yet. If you understand finance and revenue models — show us a
                  monetisation structure that changes how we price or grow. If marketing and growth
                  is your strength — build the campaign that gets FanLinc in front of 10,000 new
                  users. If you think in data and analytics — find the patterns in our engagement
                  numbers and tell us what they mean.
                </p>

                <p
                  className="font-chakra text-[rgba(240,244,255,0.8)] leading-[1.8]"
                  style={{ fontSize: 'clamp(16px, 1.3vw, 18px)' }}
                >
                  If user experience and product design is where you shine — redesign a flow, fix a
                  friction point, make the app feel better. If you live in creative campaigns and
                  storytelling — concept the idea that makes fans feel something. If you see the
                  business development angle — bring us the partnership, the deal, the opportunity we
                  are missing. And if you are a video content creator — bring your camera, your edit,
                  and your style. FanLinc is built on athlete stories and live moments, and we need
                  people who know how to capture them.
                </p>

                <p
                  className="font-chakra text-[rgba(240,244,255,0.8)] leading-[1.8]"
                  style={{ fontSize: 'clamp(16px, 1.3vw, 18px)' }}
                >
                  We are not here to box your skills into simple rules. We want to see what you do
                  when no one limits you. The student who comes up with the sharpest initiative —
                  bold, grounded, and actionable — gets to lead its implementation in the real world.
                </p>
              </motion.div>

              {/* Pill tags */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-2">
                {pills.map((pill) => (
                  <span
                    key={pill}
                    className="font-chakra font-medium text-[13px] text-[rgba(240,244,255,0.7)] bg-white/5 border border-white/10 rounded-full px-4 py-2"
                  >
                    {pill}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
