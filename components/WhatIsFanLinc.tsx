'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Users, Video, Zap, Star, BarChart2, Trophy } from 'lucide-react'

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

            <motion.div variants={itemVariants} className="mt-4">
              <a
                href="https://www.fanlinc.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-green text-black font-chakra font-bold text-sm px-6 py-3 rounded-lg hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer"
              >
                FanLinc Website
              </a>
            </motion.div>
          </div>

          {/* Right — feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                variants={itemVariants}
                className="glass-card rounded-xl p-5 cursor-default"
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
