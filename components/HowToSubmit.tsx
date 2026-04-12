'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Mail, Calendar, FileText, HelpCircle } from 'lucide-react'

const EMAIL = 'rad@fanlinc.ai'
const SUBJECT = 'FanLinc IBU Campus Innovation Challenge 2026 — [Your Name]'

const steps = [
  {
    step: '01',
    heading: 'Prepare Your Initiative Document',
    desc: 'This can be a PDF, Word doc, slide deck, video, or any format that best presents your idea. There is no template — structure it however makes your idea clearest.',
  },
  {
    step: '02',
    heading: 'Include Your Details',
    desc: 'Include your name, student ID, major, and year of study at the top of your submission.',
  },
  {
    step: '03',
    heading: 'Send Your Submission',
    desc: `Email your file to rad@fanlinc.ai — Subject line: "FanLinc IBU Campus Innovation Challenge 2026 — [Your Name]". If you have any questions, email rad@fanlinc.ai.`,
  },
]

const infoItems = [
  { icon: Mail, label: 'Email', value: EMAIL },
  { icon: Calendar, label: 'Deadline', value: 'April 17 – April 24, 2026' },
  { icon: FileText, label: 'Format', value: 'Any — PDF, Word, Slides, Video, or combination' },
  { icon: HelpCircle, label: 'Questions', value: EMAIL },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function HowToSubmit() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduced = useReducedMotion()
  const animate = reduced ? 'visible' : inView ? 'visible' : 'hidden'

  return (
    <section id="submit" className="bg-[#080810] py-24 sm:py-32">
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
              Submit Your Initiative
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-russo text-[#f0f4ff] leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
            >
              How to Submit
            </motion.h2>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left — steps */}
            <div className="flex flex-col gap-8">
              {steps.map((s) => (
                <motion.div key={s.step} variants={itemVariants} className="flex items-start gap-5">
                  <span className="flex-shrink-0 font-space text-[11px] tracking-widest text-brand-green mt-1">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-russo text-[#f0f4ff] text-[18px] mb-2 leading-snug">
                      {s.heading}
                    </h3>
                    <p className="font-chakra text-[rgba(240,244,255,0.7)] text-[15px] leading-[1.75]">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Email CTA button */}
              <motion.div variants={itemVariants}>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`}
                  className="inline-flex items-center gap-3 bg-brand-green text-black font-chakra font-bold text-[15px] px-7 py-4 rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer shadow-[0_0_30px_rgba(0,255,136,0.2)]"
                >
                  <Mail size={18} aria-hidden="true" />
                  Send Your Submission
                </a>
              </motion.div>

            </div>

            {/* Right — info card */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl bg-[#0e0e1a] border border-brand-green/25 overflow-hidden"
            >
              {/* Green top border */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #00ff88 0%, #00d4ff 100%)' }}
                aria-hidden="true"
              />

              <div className="p-8 flex flex-col gap-5">
                <h3 className="font-russo text-[#f0f4ff] text-[20px]">Submission Details</h3>

                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 border-b border-white/[0.06] pb-5 last:border-0 last:pb-0"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon size={17} className="text-brand-green" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-space text-[10px] tracking-widest uppercase text-[rgba(240,244,255,0.4)] mb-1">
                        {item.label}
                      </p>
                      {item.value === EMAIL ? (
                        <a
                          href={`mailto:${EMAIL}`}
                          className="font-chakra text-brand-green text-[14px] leading-[1.6] hover:underline underline-offset-2"
                        >
                          {EMAIL}
                        </a>
                      ) : (
                        <p className="font-chakra text-[rgba(240,244,255,0.85)] text-[14px] leading-[1.6]">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* LinkedIn row */}
                <div className="flex items-start gap-4 border-t border-white/[0.06] pt-5">
                  <div className="w-9 h-9 rounded-lg bg-[#0A66C2]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] fill-[#0A66C2]" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-space text-[10px] tracking-widest uppercase text-[rgba(240,244,255,0.4)] mb-1">
                      Stay Updated
                    </p>
                    <p className="font-chakra text-[#f0f4ff] text-[13px] leading-[1.6] mb-3">
                      Follow our LinkedIn for announcements on selected students and competition winners.
                    </p>
                    <a
                      href="https://www.linkedin.com/company/blayz-technologies-inc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#0A66C2] text-white font-chakra font-bold text-[13px] px-4 py-2.5 rounded-lg hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 shadow-[0_0_20px_rgba(10,102,194,0.3)]"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 fill-white" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Follow on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
