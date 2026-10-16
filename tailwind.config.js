/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { bg: '#0B0B0B', surface: '#151515', line: '#27272A', ink: '#F8FAFC', muted: '#A1A1AA', brand: 'var(--brand)' },
      fontFamily: { display: ['"Playfair Display"', 'Georgia', 'serif'], sans: ['"DM Sans"', 'system-ui', 'sans-serif'] }
    }
  },
  plugins: []
}
