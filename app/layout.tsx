import type { Metadata } from 'next'
import { russoOne, chakraPetch, spaceMono } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'FanLinc IBU Campus Innovation Challenge 2026',
  description:
    'FanLinc IBU Campus Innovation Challenge 2026. Powered by Blayz Technologies Inc. Any background. Any major. We only care about your activity and ideas.',
  keywords: [
    'FanLinc',
    'IBU',
    'International Business University',
    'Campus Innovation Challenge',
    'Blayz Technologies',
    'sports app',
    'student competition',
    'internship',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${russoOne.variable} ${chakraPetch.variable} ${spaceMono.variable} font-chakra bg-black text-[#f0f4ff] antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
