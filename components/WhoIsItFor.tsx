'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Briefcase, Megaphone, BarChart2, Code, Palette, Video } from 'lucide-react'

const audiences = [
  {
    icon: Briefcase,
    title: 'Business & Strategy',
    desc: 'Market expansion, competitive analysis, go-to-market planning, strategic frameworks.',
    highlight: false,
  },
  {
    icon: Megaphone,
    title: 'Marketing & Comms',
    desc: 'Campaigns, brand voice, social playbooks, influencer strategy, PR, content calendars.',
    highlight: false,
  },
  {
    icon: BarChart2,
    title: 'Finance & Analytics',
    desc: 'Revenue models, monetisation structures, engagement data, financial projections.',
    highlight: false,
  },
  {
    icon: Code,
    title: 'Tech & UX',
    desc: 'Feature specs, app flow redesigns, onboarding improvements, UX friction analysis.',
    highlight: false,
  },
  {
    icon: Palette,
    title: 'Creative & Media',
    desc: 'Content campaigns, brand aesthetics, storytelling, athlete narratives, brand moments.',
    highlight: false,
  },
  {
    icon: Video,
    title: 'Video Content Creators',
    desc: 'Bring your camera and your edit. FanLinc runs on live moments and athlete stories — we need you.',
    highlight: true,
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

export default function WhoIsItFor() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduced = useReducedMotion()
  const animate = reduced ? 'visible' : inView ? 'visible' : 'hidden'

  return (
    <section className="bg-black py-24 sm:py-32">
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
              Who This Is For
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-russo text-[#f0f4ff] leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
            >
              Every Student. Every Skill.
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="font-chakra text-[rgba(240,244,255,0.6)] leading-[1.7]"
              style={{ fontSize: 'clamp(15px, 1.2vw, 17px)' }}
            >
              No GPA. No résumé screening. Your major is not your limit — your initiative is.
            </motion.p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {audiences.map((aud) => (
              <motion.div
                key={aud.title}
                variants={itemVariants}
                className="card-lift rounded-2xl p-6 flex flex-col gap-4 cursor-default border bg-[#0e0e1a] border-white/[0.07]"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/[0.06]"
                >
                  <aud.icon
                    size={22}
                    className="text-[rgba(240,244,255,0.5)]"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h3
                    className="font-russo leading-snug mb-2 text-[#f0f4ff]"
                    style={{ fontSize: 'clamp(17px, 1.5vw, 20px)' }}
                  >
                    {aud.title}
                  </h3>
                  <p className="font-chakra text-[rgba(240,244,255,0.65)] text-[14px] leading-[1.7]">
                    {aud.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
