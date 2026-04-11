'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About FanLinc', href: '#about' },
  { label: 'The Competition', href: '#competition' },
  { label: 'Student Journey', href: '#journey' },
  { label: 'Categories', href: '#categories' },
  { label: 'Prize', href: '#prize' },
  { label: 'Rules', href: '#rules' },
  { label: 'Submit', href: '#submit' },
]

function scrollTo(href: string) {
  const target = document.querySelector(href)
  if (!target) return
  const lenis = (window as Window & { __lenis?: { scrollTo: (el: Element, opts?: object) => void } }).__lenis
  if (lenis) {
    lenis.scrollTo(target, { offset: -80 })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y > lastY.current && y > 120) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-1 cursor-pointer -ml-2"
            aria-label="Go to top"
          >
            <span className="font-russo text-xl lg:text-2xl text-[#f0f4ff]">
              Fan<span className="text-brand-green">Linc</span>
            </span>
            <span className="-ml-0.5 font-russo text-xl lg:text-2xl leading-none text-[rgba(240,244,255,0.82)] whitespace-nowrap">
              × IBU 2026
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-space text-[11px] tracking-wider uppercase text-[rgba(240,244,255,0.6)] hover:text-brand-green transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* iOS */}
            <a
              href="https://apps.apple.com/us/app/fanlinc/id6755227235"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-white text-black font-chakra font-bold text-sm px-4 py-2 rounded-lg hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer"
              aria-label="Download on the App Store"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 fill-black" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="hidden xl:inline">App Store</span>
            </a>
            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps/details?id=com.fanlinc&hl=en_CA"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-brand-green text-black font-chakra font-bold text-sm px-4 py-2 rounded-lg hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer"
              aria-label="Get it on Google Play"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                <path fill="#1a1a1a" d="M3.18 23.76c.35.2.74.24 1.12.15l11.25-11.27-2.88-2.88z"/>
                <path fill="#1a1a1a" d="M20.32 10.25 17.5 8.62l-3.22 3.22 3.22 3.22 2.82-1.63c.8-.47.8-1.71 0-2.18z"/>
                <path fill="#1a1a1a" d="M4.3.09C3.92 0 3.53.04 3.18.24L14.28 11.34l2.88-2.88z"/>
                <path fill="#1a1a1a" d="M3.18 23.76l11.1-11.1-2.88-2.88L3.18.24C2.94.4 2.76.67 2.76 1v22c0 .33.18.6.42.76z"/>
              </svg>
              <span className="hidden xl:inline">Google Play</span>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <span
                className={`block h-0.5 w-5 bg-[#f0f4ff] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 bg-[#f0f4ff] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 bg-[#f0f4ff] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/[0.06] overflow-hidden"
          >
            <nav className="px-4 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    scrollTo(link.href)
                    setMobileOpen(false)
                  }}
                  className="font-space text-[11px] tracking-wider uppercase text-[rgba(240,244,255,0.7)] hover:text-brand-green transition-colors duration-200 text-left cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-2 flex flex-col gap-3">
                <a
                  href="https://apps.apple.com/us/app/fanlinc/id6755227235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-white text-black font-chakra font-bold text-sm px-5 py-3 rounded-lg cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-black" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download on App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.fanlinc&hl=en_CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-brand-green text-black font-chakra font-bold text-sm px-5 py-3 rounded-lg cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                    <path fill="#1a1a1a" d="M3.18 23.76c.35.2.74.24 1.12.15l11.25-11.27-2.88-2.88z"/>
                    <path fill="#1a1a1a" d="M20.32 10.25 17.5 8.62l-3.22 3.22 3.22 3.22 2.82-1.63c.8-.47.8-1.71 0-2.18z"/>
                    <path fill="#1a1a1a" d="M4.3.09C3.92 0 3.53.04 3.18.24L14.28 11.34l2.88-2.88z"/>
                    <path fill="#1a1a1a" d="M3.18 23.76l11.1-11.1-2.88-2.88L3.18.24C2.94.4 2.76.67 2.76 1v22c0 .33.18.6.42.76z"/>
                  </svg>
                  Get it on Google Play
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
