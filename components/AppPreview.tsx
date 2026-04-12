'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
} from 'framer-motion'

const screens = [
  {
    title: 'Community Feed',
    desc: 'Post reels, images, and text. Follow fans and players. Build your presence in the sports community in real time.',
    src: '/screenshots/screen-01.png',
    accent: '#00ff88',
  },
  {
    title: 'Live Fan Sessions',
    desc: 'Join player-hosted live Q&As and events the moment they go live. Real athletes, real conversations.',
    src: '/screenshots/screen-02.png',
    accent: '#00d4ff',
  },
  {
    title: 'Fan × Player Live',
    desc: 'Watch real fans go live with actual OHL players — unscripted, unfiltered, and happening right now on FanLinc.',
    src: '/screenshots/screen-11.png',
    accent: '#ff0090',
  },
  {
    title: 'Top Fan Posts',
    desc: 'Discover the highest-viewed fan content on the platform. See what resonates with the community.',
    src: '/screenshots/screen-03.png',
    accent: '#ff0090',
  },
  {
    title: 'Player Discovery',
    desc: 'Browse every OHL player on the platform. Follow your favourites and build a personalised feed.',
    src: '/screenshots/screen-04.png',
    accent: '#00d4ff',
  },
  {
    title: 'Player Profiles',
    desc: 'In-depth stats, career news, videos, and live access — everything about a player, in one place.',
    src: '/screenshots/screen-05.png',
    accent: '#00ff88',
  },
  {
    title: 'Discover & Compare',
    desc: 'Compare players head-to-head, compare teams, enter contests, and see who leads the leaderboard.',
    src: '/screenshots/screen-06.png',
    accent: '#ffcc00',
  },
  {
    title: 'Prediction Challenge',
    desc: 'Predict game scores and player performances before they happen. Lock in your pick and earn points.',
    src: '/screenshots/screen-07.png',
    accent: '#ff0090',
  },
  {
    title: 'Championship Leaderboard',
    desc: 'Compete for the #1 fan ranking across views, likes, and follows. Climb the board, claim the title.',
    src: '/screenshots/screen-08.png',
    accent: '#ffcc00',
  },
  {
    title: 'Game Calendar',
    desc: 'Track every upcoming game, buy tickets directly, and get notified for live sessions.',
    src: '/screenshots/screen-09.png',
    accent: '#00d4ff',
  },
  {
    title: 'Your Profile & Points',
    desc: 'See your loyalty points, rewards earned, following count, and fan level — all in one dashboard.',
    src: '/screenshots/screen-10.png',
    accent: '#00ff88',
  },
]

/* ─── Fallback screen shown before images are placed ── */
function ScreenFallback({ title, accent }: { title: string; accent: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6"
      style={{ background: `linear-gradient(180deg, #060608 60%, ${accent}18 100%)` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: accent }}>
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="9" y1="7" x2="15" y2="7" />
          <line x1="9" y1="11" x2="15" y2="11" />
          <line x1="9" y1="15" x2="13" y2="15" />
        </svg>
      </div>
      <p className="font-chakra text-[13px] text-center leading-snug" style={{ color: `${accent}80` }}>
        {title}
      </p>
    </div>
  )
}

/* ─── Single screenshot with error fallback ── */
function AppScreenshot({ src, title, accent }: { src: string; title: string; accent: string }) {
  const [error, setError] = useState(false)

  if (error) return <ScreenFallback title={title} accent={accent} />

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={title}
      onError={() => setError(true)}
      className="absolute inset-0 w-full h-full object-cover object-top select-none"
      draggable={false}
    />
  )
}

/* ─── Main component ── */
export default function AppPreview() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const phoneRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const reduced = useReducedMotion()

  const screen = screens[current]

  /* ── Auto-advance (restarts whenever current or paused changes) ── */
  useEffect(() => {
    if (paused || reduced) return
    const t = setTimeout(() => setCurrent((c) => (c + 1) % screens.length), 3800)
    return () => clearTimeout(t)
  }, [current, paused, reduced])

  /* ── 3D mouse-tracking tilt ── */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [12, -12]), { stiffness: 100, damping: 18 })
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-12, 12]), { stiffness: 100, damping: 18 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return
      const r = phoneRef.current?.getBoundingClientRect()
      if (!r) return
      mouseX.set(((e.clientX - r.left) / r.width - 0.5) * 2)
      mouseY.set(((e.clientY - r.top) / r.height - 0.5) * 2)
    },
    [reduced, mouseX, mouseY]
  )

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setPaused(false)
  }, [mouseX, mouseY])

  const goTo = (i: number) => {
    setCurrent(i)
  }

  return (
    <section className="bg-black py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          ref={sectionRef}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center gap-4 mb-20"
        >
          <span className="section-label">The App in Action</span>
          <h2
            className="font-russo text-[#f0f4ff] leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            Explore the Platform. Then Improve It.
          </h2>
          <p
            className="font-chakra text-[rgba(240,244,255,0.6)] max-w-xl leading-[1.75]"
            style={{ fontSize: 'clamp(15px, 1.2vw, 17px)' }}
          >
            A sample of what's inside FanLinc — there's much more to discover. Download it, explore
            every corner, and start thinking like a builder.
          </p>
        </motion.div>

        {/* ── Layout: Phone + Info ── */}
        <div className="flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-20">

          {/* ── Phone mockup ── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 48 }}
            animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            ref={phoneRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={handleMouseLeave}
            className="flex-shrink-0 cursor-default"
            style={{ perspective: 1200 }}
          >
            <motion.div
              style={reduced ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative"
            >
              {/* Colour-reactive glow */}
              <motion.div
                animate={{
                  background: `radial-gradient(ellipse at 50% 60%, ${screen.accent}28 0%, transparent 68%)`,
                }}
                transition={{ duration: 1.2 }}
                className="absolute -inset-20 pointer-events-none"
                aria-hidden="true"
              />

              {/* ── Phone shell ── */}
              <div
                className="relative rounded-[52px] bg-[#0b0b0d]"
                style={{
                  width: 288,
                  height: 622,
                  border: '2.5px solid rgba(255,255,255,0.13)',
                  boxShadow:
                    '0 50px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.12) inset',
                }}
              >
                {/* Hardware side buttons */}
                <div className="absolute -right-[3.5px] top-24 w-[3px] h-16 bg-white/[0.12] rounded-r-full" aria-hidden="true" />
                <div className="absolute -left-[3.5px] top-20 w-[3px] h-10 bg-white/[0.12] rounded-l-full" aria-hidden="true" />
                <div className="absolute -left-[3.5px] top-36 w-[3px] h-10 bg-white/[0.12] rounded-l-full" aria-hidden="true" />
                <div className="absolute -left-[3.5px] top-52 w-[3px] h-14 bg-white/[0.12] rounded-l-full" aria-hidden="true" />

                {/* Screen inset */}
                <div className="absolute inset-[3px] rounded-[50px] overflow-hidden bg-[#060608]">

                  {/* Dynamic Island */}
                  <div
                    className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center"
                    style={{
                      width: 112,
                      height: 34,
                      borderRadius: 20,
                      background: '#000',
                    }}
                    aria-hidden="true"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  </div>

                  {/* Screenshots with crossfade */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute inset-0"
                    >
                      <AppScreenshot src={screen.src} title={screen.title} accent={screen.accent} />
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.08] z-20">
                    <motion.div
                      key={`bar-${current}`}
                      className="h-full"
                      style={{ background: screen.accent, borderRadius: 2 }}
                      initial={{ scaleX: 0, transformOrigin: 'left' }}
                      animate={{ scaleX: paused ? undefined : 1 }}
                      transition={{ duration: 3.8, ease: 'linear' }}
                    />
                  </div>

                  {/* Subtle screen reflection */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 70%, rgba(0,0,0,0.15) 100%)',
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Info panel ── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 32 }}
            animate={inView || reduced ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-8 w-full max-w-md"
          >
            {/* Current screen heading + desc */}
            <div className="min-h-[120px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex flex-col gap-3"
                >
                  <span
                    className="font-space text-[11px] tracking-[0.22em] uppercase"
                    style={{ color: screen.accent }}
                  >
                    {String(current + 1).padStart(2, '0')} / {String(screens.length).padStart(2, '0')}
                  </span>
                  <h3
                    className="font-russo text-[#f0f4ff] leading-tight"
                    style={{ fontSize: 'clamp(22px, 2.5vw, 34px)' }}
                  >
                    {screen.title}
                  </h3>
                  <p className="font-chakra text-[rgba(240,244,255,0.65)] text-[15px] leading-[1.75]">
                    {screen.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot progress strip */}
            <div className="flex items-center gap-1.5" role="tablist" aria-label="App screens">
              {screens.map((s, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Screen ${i + 1}: ${s.title}`}
                  onClick={() => goTo(i)}
                  className="h-1.5 rounded-full transition-all duration-500 cursor-pointer"
                  style={{
                    width: i === current ? 28 : 6,
                    background: i === current ? screen.accent : 'rgba(255,255,255,0.18)',
                  }}
                />
              ))}
            </div>

            {/* Screen list */}
            <div className="flex flex-col divide-y divide-white/[0.05]">
              {screens.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="flex items-center gap-4 py-3 text-left group cursor-pointer"
                >
                  {/* Accent dot */}
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-400"
                    style={{
                      background: i === current ? s.accent : 'rgba(255,255,255,0.18)',
                      boxShadow: i === current ? `0 0 8px ${s.accent}70` : 'none',
                      transform: i === current ? 'scale(1.3)' : 'scale(1)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Label */}
                  <span
                    className="font-chakra font-medium text-[13px] transition-colors duration-200"
                    style={{
                      color: i === current
                        ? 'rgba(240,244,255,0.95)'
                        : 'rgba(240,244,255,0.35)',
                    }}
                  >
                    {s.title}
                  </span>

                  {/* Active indicator */}
                  {i === current && (
                    <motion.span
                      layoutId="activeBar"
                      className="ml-auto h-px flex-shrink-0 rounded-full"
                      style={{ width: 20, background: screen.accent }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Store buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://apps.apple.com/us/app/fanlinc/id6755227235"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white text-black font-chakra font-bold text-sm px-5 py-2.5 rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 fill-black" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.fanlinc&hl=en_CA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-brand-green text-black font-chakra font-bold text-sm px-5 py-2.5 rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                  <path fill="#1a1a1a" d="M3.18 23.76c.35.2.74.24 1.12.15l11.25-11.27-2.88-2.88z"/>
                  <path fill="#1a1a1a" d="M20.32 10.25 17.5 8.62l-3.22 3.22 3.22 3.22 2.82-1.63c.8-.47.8-1.71 0-2.18z"/>
                  <path fill="#1a1a1a" d="M4.3.09C3.92 0 3.53.04 3.18.24L14.28 11.34l2.88-2.88z"/>
                  <path fill="#1a1a1a" d="M3.18 23.76l11.1-11.1-2.88-2.88L3.18.24C2.94.4 2.76.67 2.76 1v22c0 .33.18.6.42.76z"/>
                </svg>
                Google Play
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
