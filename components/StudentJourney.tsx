'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const phases = [
  {
    number: '01',
    label: 'Explore & Understand',
    time: 'First 1–2 days',
    heading: 'Get In. Get Oriented.',
    body: 'Set up your profile, add a photo, set sport preferences. Learn the layout — Community feed, Live tab, Game Scores, Insider Buzz, Discover menu. By default you\'ll be following 2 players, Kieron and Conor — check out their posts and player details. Create a post after your signup. Earn points by signing up and posting content.',
    tags: ['Set up profile', 'Explore all tabs', 'Follow players & fans', '+points on signup'],
    color: '#00ff88',
  },
  {
    number: '02',
    label: 'Use It Like a Social Platform',
    time: 'Ongoing daily',
    heading: 'Post. Engage. Show Up.',
    body: 'Post reels, images, and text. Like, comment, and share other fans\' and players\' content. Use the Search section to find and follow other fans and friends already on the platform — the more you connect, the stronger your feed gets. Tip: type a name in the search bar and tap Search — you\'ll see different options and a list of profiles to follow. Join player-hosted live sessions and Q&As in real time. Build daily visit streaks — consistency is rewarded on FanLinc just like in any real job. Every action earns loyalty points and raises your activity score.',
    tags: ['Post reels & images', 'Like & comment', 'Join live sessions', 'Build daily streaks', '+points per action'],
    color: '#00d4ff',
  },
  {
    number: '03',
    label: 'Compete, Predict & Climb',
    time: 'Go deeper',
    heading: 'Compete. Predict. Climb.',
    body: 'Enter the Prediction Challenge — forecast game results and player performances before they happen. Use the Compare tool to go head-to-head on player stats. Climb the Championship Leaderboard where top positions earn bonus points and unlock influencer status tiers. Enter contests and giveaways tied to the beta launch.',
    tags: ['Prediction challenges', 'Compare players & teams', 'Leaderboard ranking', 'Contests', '+bonus for top positions'],
    color: '#ff0090',
  },
  {
    number: '04',
    label: 'Observe, Analyse & Generate Ideas',
    time: 'Think like a builder',
    heading: 'This Is Where the Competition Begins.',
    body: 'Ask: what feature would make this better? Who else should be on this platform? How should it be priced? What campaign would drive 10,000 new users? Post content strategically and study what gets engagement. Refer friends — growing the platform is itself a form of business development.',
    tags: ['Spot gaps & improvements', 'Think strategy & revenue', 'Create content with intent', 'Refer friends', '+points per referral'],
    color: '#ffcc00',
  },
  {
    number: '05',
    label: 'Submit Your Initiative & Lead It',
    time: 'The outcome',
    heading: 'Submit. Get Picked. Lead.',
    body: 'Based on everything you have experienced and observed, submit your initiative — a feature, a campaign, a revenue idea, a UX fix, a content strategy, anything. Top innovators get an internship at Blayz Technologies and lead the actual implementation. Not hand it off. Lead it.',
    tags: ['Submit initiative', 'Judged by founders', '→ Lead real implementation'],
    color: '#00ff88',
  },
]

export default function StudentJourney() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.06 })
  const reduced = useReducedMotion()

  return (
    <section id="journey" className="bg-black py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col gap-4 mb-20"
        >
          <span className="section-label">Student Journey</span>
          <h2
            className="font-russo text-[#f0f4ff] leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            What You Do After Downloading
          </h2>
          <p className="font-chakra text-[rgba(240,244,255,0.6)] text-[17px] leading-[1.7]">
            5 phases — from first login to leading a real-world implementation
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 sm:left-12 top-0 bottom-0 w-px bg-white/[0.06]"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-16">
            {phases.map((phase, i) => (
              <PhaseCard key={phase.number} phase={phase} index={i} reduced={!!reduced} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PhaseCard({
  phase,
  index,
  reduced,
}: {
  phase: (typeof phases)[0]
  index: number
  reduced: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, x: -48 }}
      animate={inView || reduced ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative pl-24 sm:pl-32"
    >
      {/* Phase number node */}
      <div
        className="absolute left-0 top-0 w-16 sm:w-24 flex flex-col items-center"
        aria-hidden="true"
      >
        <div
          className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1"
          style={{ borderColor: phase.color, background: '#000' }}
        />
        <span
          className="font-russo mt-2 leading-none tracking-tight"
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: '#f0f4ff',
            textShadow: `0 0 16px ${phase.color}50, 0 2px 10px rgba(0,0,0,0.75)`,
            WebkitTextStroke: '1px rgba(255,255,255,0.15)',
          }}
        >
          {phase.number}
        </span>
      </div>

      {/* Content card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="font-space text-[10px] tracking-[0.2em] uppercase"
            style={{ color: phase.color }}
          >
            {phase.label}
          </span>
          <span className="font-space text-[10px] tracking-wider text-[rgba(240,244,255,0.35)] bg-white/5 border border-white/10 rounded-full px-3 py-1">
            {phase.time}
          </span>
        </div>

        <h3
          className="font-russo text-[#f0f4ff] leading-tight"
          style={{ fontSize: 'clamp(20px, 2.5vw, 28px)' }}
        >
          {phase.heading}
        </h3>

        <p
          className="font-chakra text-[rgba(240,244,255,0.75)] leading-[1.8]"
          style={{ fontSize: 'clamp(15px, 1.2vw, 17px)' }}
        >
          {phase.body}
        </p>

        <div className="flex flex-wrap gap-2">
          {phase.tags.map((tag) => (
            <span
              key={tag}
              className="font-chakra font-medium text-[12px] px-3 py-1.5 rounded-full border"
              style={{
                color: phase.color,
                borderColor: `${phase.color}30`,
                background: `${phase.color}08`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
