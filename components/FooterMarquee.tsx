'use client'

import { useReducedMotion } from 'framer-motion'

const ITEMS = [
  'FanLinc × IBU 2026',
  'Download the App',
  'Think Bold',
  'Real Product. Real Impact.',
  'Any Major. Any Background.',
  'April 20 – April 27',
  'Submit Your Initiative',
  'Powered by Blayz Technologies',
]

export default function FooterMarquee() {
  const reduced = useReducedMotion()
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      className="overflow-hidden border-t border-b border-white/[0.06] bg-[#080810] py-3 select-none"
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: reduced ? 'none' : 'marquee-scroll 28s linear infinite',
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-space text-[11px] tracking-[0.2em] uppercase text-[rgba(240,244,255,0.22)] flex-shrink-0 px-8"
          >
            {item}
            <span className="text-brand-green mx-6 opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
