'use client'

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

export default function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-russo text-xl text-[#f0f4ff]">
              Fan<span className="text-brand-green">Linc</span>
            </span>
            <span className="font-space text-[10px] tracking-widest text-[rgba(240,244,255,0.4)]">
              × IBU
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-space text-[10px] tracking-wider uppercase text-[rgba(240,244,255,0.4)] hover:text-brand-green transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Copyright */}
          <p className="font-chakra text-[12px] text-[rgba(240,244,255,0.3)] text-center md:text-right">
            © 2026 Blayz Technologies Inc.
            <br />
            Campus Innovation Challenge.
          </p>
        </div>
      </div>
    </footer>
  )
}
