'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Users, Video, Zap, Star, BarChart2, Trophy } from 'lucide-react'
import TiltCard from '@/components/TiltCard'

const features = [
  {
    icon: Users,
    title: 'Social Community Feed',
    desc: 'Sports-native posts, reels, and community engagement for fans and athletes.',
  },
  {
    icon: Video,
    title: 'Live Video Fan/Player Sessions',
    desc: 'Real-time live sessions between fans and their favourite athletes.',
  },
  {
    icon: Zap,
    title: 'Prediction Challenges',
    desc: 'Forecast game results and player performances before they happen.',
  },
  {
    icon: Star,
    title: 'Loyalty Points & Leaderboards',
    desc: 'Every action earns points. Climb ranks and unlock influencer tiers.',
  },
  {
    icon: BarChart2,
    title: 'Fan Analytics Dashboard',
    desc: 'Deep stats and engagement data for fans who think like analysts.',
  },
  {
    icon: Trophy,
    title: 'Gamification & Badges',
    desc: 'Achievement badges, streaks, and rewards that make fandom feel earned.',
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

export default function WhatIsFanLinc() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  const reduced = useReducedMotion()

  const animate = reduced ? 'visible' : inView ? 'visible' : 'hidden'

  return (
    <section id="about" className="bg-[#080810] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={animate}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Left — text */}
          <div className="flex flex-col gap-6">
            <motion.span variants={itemVariants} className="section-label">
              About the Platform
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="font-russo text-[#f0f4ff] leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
            >
              The Social Network Sports Has Always Deserved
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="font-chakra text-[rgba(240,244,255,0.75)] leading-[1.8]"
              style={{ fontSize: 'clamp(16px, 1.3vw, 18px)' }}
            >
              FanLinc is the social media platform built specifically for sports communities. Unlike
              Instagram or TikTok — which are generic platforms that sports happen to use — FanLinc
              is designed from the ground up for fans, athletes, and teams.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-chakra text-[rgba(240,244,255,0.75)] leading-[1.8]"
              style={{ fontSize: 'clamp(16px, 1.3vw, 18px)' }}
            >
              It combines a social community feed, live athlete sessions, prediction challenges,
              loyalty points, leaderboards, and fan analytics into one sports-native platform.
              FanLinc is launching with Hockey, Baseball, Basketball, Kickboxing, MMA, and many
              other sports, and is built to grow alongside athletes from junior leagues all the
              way to professional careers.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-4">
              <a
                href="https://www.fanlinc.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-green text-black font-chakra font-bold text-sm px-6 py-3 rounded-lg hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer"
              >
                FanLinc Website
              </a>
              <a
                href="https://www.linkedin.com/company/blayz-technologies-inc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0A66C2] text-white font-chakra font-bold text-sm px-6 py-3 rounded-lg hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer shadow-[0_0_20px_rgba(10,102,194,0.3)]"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 fill-white" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Follow on LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right — feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feat, i) => (
              <TiltCard
                key={feat.title}
                delay={0.1 + i * 0.06}
                maxTilt={5}
                className="rounded-xl p-5 cursor-default bg-white/[0.04] backdrop-blur-[12px] border border-white/[0.08] hover:border-white/[0.18] transition-colors duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center">
                    <feat.icon size={20} className="text-brand-green" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-chakra font-semibold text-[#f0f4ff] text-[15px] leading-tight mb-1">
                      {feat.title}
                    </h3>
                    <p className="font-chakra text-[rgba(240,244,255,0.6)] text-[13px] leading-[1.6]">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
