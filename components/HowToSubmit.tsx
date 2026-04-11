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
  { icon: Calendar, label: 'Deadline', value: 'April 24, 2026' },
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
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
