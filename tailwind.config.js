/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        '2xl': '1320px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        display: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#080808',
        paper: '#F7F4EF',
        line: '#E7E2DA',
        ash: '#777777',
        signal: '#FF5A1F',
        border: '#E7E2DA',
        input: '#E7E2DA',
        ring: '#FF5A1F',
        background: '#F7F4EF',
        foreground: '#080808',
        primary: { DEFAULT: '#080808', foreground: '#FFFFFF' },
        secondary: { DEFAULT: '#F7F4EF', foreground: '#080808' },
        muted: { DEFAULT: '#F0ECE4', foreground: '#777777' },
        accent: { DEFAULT: '#FF5A1F', foreground: '#FFFFFF' },
        card: { DEFAULT: '#FFFFFF', foreground: '#080808' },
        popover: { DEFAULT: '#FFFFFF', foreground: '#080808' },
        destructive: { DEFAULT: '#DC2626', foreground: '#FFFFFF' },
      },
      borderRadius: {
        lg: '10px',
        md: '8px',
        sm: '6px'
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.6s ease-out both',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
