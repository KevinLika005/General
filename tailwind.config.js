/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rafin-black': 'rgb(var(--rafin-black) / <alpha-value>)',
        'rafin-ink': 'rgb(var(--rafin-ink) / <alpha-value>)',
        'rafin-panel': 'rgb(var(--rafin-panel) / <alpha-value>)',
        'rafin-muted-light': 'rgb(var(--rafin-muted-light) / <alpha-value>)',
        'rafin-gold': 'rgb(var(--rafin-gold) / <alpha-value>)',
        'rafin-gold-soft': 'rgb(var(--rafin-gold-soft) / <alpha-value>)',
        'rafin-border': 'rgb(var(--rafin-border) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Manrope"', '"Segoe UI"', 'sans-serif'],
        display: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 24px 70px rgba(0, 0, 0, 0.26)',
      },
    },
  },
  plugins: [],
};
