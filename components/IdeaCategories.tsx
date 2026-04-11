'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Settings2, TrendingUp, Handshake, Target, Camera, Lightbulb } from 'lucide-react'

const categories = [
  {
    icon: Settings2,
    title: 'Product Features',
    desc: 'New features, UX improvements, app flows, onboarding redesigns. If you use the app and see a gap, build the case for filling it.',
    accent: '#a855f7',
    label: 'Product',
  },
  {
    icon: TrendingUp,
    title: 'Marketing & Growth',
    desc: 'Campaigns, brand strategy, social media playbooks, growth loops. Show us how FanLinc gets in front of 10,000 new users.',
    accent: '#00ff88',
    label: 'Growth',
  },
  {
    icon: Handshake,
    title: 'Business Development',
    desc: 'Partnerships, league deals, sponsor opportunities, market expansion. If you see a door we haven\'t opened, knock on it.',
    accent: '#ffcc00',
    label: 'BizDev',
  },
  {
    icon: Target,
    title: 'User Experience & Engagement',
    desc: 'Retention mechanics, gamification ideas, fan engagement flows, loyalty structures. What keeps fans coming back every single day?',
    accent: '#00d4ff',
    label: 'UX',
  },
  {
    icon: Camera,
    title: 'Creative Campaigns',
    desc: 'Content campaigns, athlete storytelling, video concepts, brand moments. Sports culture runs on creativity — bring yours.',
    accent: '#ff6b6b',
    label: 'Creative',
  },
  {
    icon: Lightbulb,
    title: 'Revenue Ideas',
    desc: 'Pricing models, monetisation structures, new revenue streams. Show us a financial idea that changes how the business grows.',
    accent: '#ff0090',
    label: 'Revenue',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function IdeaCategories() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduced = useReducedMotion()
  const animate = reduced ? 'visible' : inView ? 'visible' : 'hidden'

  return (
    <section id="categories" className="bg-[#080810] py-24 sm:py-32">
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
              Idea Categories
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-russo text-[#f0f4ff] leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
            >
              Six Arenas. The Best Ideas Get Built.
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="font-chakra text-[rgba(240,244,255,0.6)] leading-[1.7]"
              style={{ fontSize: 'clamp(15px, 1.2vw, 17px)' }}
            >
              Your idea can live in one category or cut across all six. If it's bold and actionable,
              we don't cap how many we move forward with.
            </motion.p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <motion.div
                key={cat.title}
                variants={itemVariants}
                className="relative rounded-2xl bg-[#0e0e1a] border border-white/[0.07] overflow-hidden group cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
              >
                {/* Bottom gradient accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${cat.accent}, transparent)` }}
                  aria-hidden="true"
                />

                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${cat.accent}14` }}
                    >
                      <cat.icon size={22} style={{ color: cat.accent }} aria-hidden="true" />
                    </div>
                    <span
                      className="font-space text-[10px] tracking-[0.15em] uppercase"
                      style={{ color: cat.accent }}
                    >
                      {cat.label}
                    </span>
                  </div>

                  <h3
                    className="font-russo text-[#f0f4ff] leading-snug"
                    style={{ fontSize: 'clamp(17px, 1.5vw, 20px)' }}
                  >
                    {cat.title}
                  </h3>

                  <p className="font-chakra text-[rgba(240,244,255,0.65)] text-[14px] leading-[1.7]">
                    {cat.desc}
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
