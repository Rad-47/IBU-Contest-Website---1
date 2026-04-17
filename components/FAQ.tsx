'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Do I need a specific major or GPA to enter?',
    a: 'No. Any IBU student of any year and any major is eligible. We do not look at grades.',
  },
  {
    q: 'Can I submit as a team?',
    a: 'No. This is an individual Participation.',
  },
  {
    q: 'Does my initiative need to be polished and formal?',
    a: 'No. We care about the quality of the thinking, not the formatting. A clear, bold, well-reasoned idea beats a slick but shallow one every time.',
  },
  {
    q: 'What if my idea covers multiple categories?',
    a: 'Even better. Cross-category thinking is a sign of strong strategic thinking. Label it however makes most sense.',
  },
  {
    q: 'How long is the internship?',
    a: 'Details will be discussed with winners directly. The format will be designed around your schedule and the scope of your idea.',
  },
  {
    q: 'Can I submit more than one idea?',
    a: 'Yes. Submit as many as you like. We evaluate each on its own merits.',
  },
  {
    q: 'Will my idea stay confidential?',
    a: 'Yes. All submissions are treated as confidential and will not be shared outside the Blayz Technologies evaluation team.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduced = useReducedMotion()
  const animate = reduced ? 'visible' : inView ? 'visible' : 'hidden'
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-black py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={animate}
          className="flex flex-col gap-10"
        >
          {/* Header */}
          <div className="flex flex-col gap-4">
            <motion.span variants={itemVariants} className="section-label">
              Common Questions
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-russo text-[#f0f4ff] leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
            >
              You Asked. We Answered.
            </motion.h2>
          </div>

          {/* Accordion */}
          <motion.div variants={itemVariants} className="flex flex-col">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.q}
                answer={faq.a}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                reduced={!!reduced}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function FAQItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
  reduced,
}: {
  question: string
  answer: string
  index: number
  isOpen: boolean
  onToggle: () => void
  reduced: boolean
}) {
  return (
    <div className="border-b border-white/[0.07] last:border-b-0 relative">
      {/* Animated left border */}
      <motion.div
        initial={false}
        animate={{ scaleY: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ originY: 0, position: 'absolute', left: 0, top: 12, bottom: 12, width: 3, borderRadius: 9999, background: 'linear-gradient(to bottom, #00ff88, #00d4ff)' }}
        aria-hidden="true"
      />

      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-6 pl-4 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span
          className={`font-chakra font-semibold transition-colors duration-200 ${
            isOpen ? 'text-brand-green' : 'text-[rgba(240,244,255,0.9)] group-hover:text-[#f0f4ff]'
          }`}
          style={{ fontSize: 'clamp(15px, 1.3vw, 17px)' }}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: reduced ? 0 : 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-shrink-0 text-brand-green"
        >
          <Plus size={20} aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="font-chakra text-[rgba(240,244,255,0.7)] leading-[1.75] pb-6 pl-4 pr-8"
              style={{ fontSize: 'clamp(14px, 1.1vw, 16px)' }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
