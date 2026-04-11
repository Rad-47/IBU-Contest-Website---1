import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        russo: ['var(--font-russo-one)', 'sans-serif'],
        chakra: ['var(--font-chakra-petch)', 'sans-serif'],
        space: ['var(--font-space-mono)', 'monospace'],
      },
      colors: {
        brand: {
          green: '#00ff88',
          cyan: '#00d4ff',
          magenta: '#ff0090',
          gold: '#ffcc00',
          dark: '#000000',
          darker: '#080810',
          card: '#0e0e1a',
        },
      },
      backgroundImage: {
        'gradient-brand':
          'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #ff0090 100%)',
        'gradient-gold': 'linear-gradient(135deg, #ffcc00 0%, #ff9900 100%)',
        'gradient-green-cyan': 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
      },
      animation: {
        'aurora-1': 'aurora1 10s ease-in-out infinite',
        'aurora-2': 'aurora2 13s ease-in-out infinite',
        'aurora-3': 'aurora3 8s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'scroll-line': 'scrollLine 1.8s ease-in-out infinite',
      },
      keyframes: {
        aurora1: {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
          '33%': { transform: 'scale(1.1) translate(4%, -4%)' },
          '66%': { transform: 'scale(0.95) translate(-3%, 3%)' },
        },
        aurora2: {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
          '33%': { transform: 'scale(1.05) translate(-5%, 5%)' },
          '66%': { transform: 'scale(1.12) translate(4%, -3%)' },
        },
        aurora3: {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.15) translate(3%, 4%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        scrollLine: {
          '0%': { height: '0', opacity: '1' },
          '80%': { height: '100%', opacity: '1' },
          '100%': { height: '100%', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
