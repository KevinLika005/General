/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-navy': 'rgb(var(--brand-navy) / <alpha-value>)',
        'brand-ink': 'rgb(var(--brand-ink) / <alpha-value>)',
        'brand-gold': 'rgb(var(--brand-gold) / <alpha-value>)',
        'brand-gold-soft': 'rgb(var(--brand-gold-soft) / <alpha-value>)',
        'surface-page': 'rgb(var(--surface-page) / <alpha-value>)',
        'surface-card': 'rgb(var(--surface-card) / <alpha-value>)',
        'surface-subtle': 'rgb(var(--surface-subtle) / <alpha-value>)',
        'surface-strong': 'rgb(var(--surface-strong) / <alpha-value>)',
        text: 'rgb(var(--text-default) / <alpha-value>)',
        'text-muted': 'rgb(var(--text-muted) / <alpha-value>)',
        border: 'rgb(var(--border-default) / <alpha-value>)',
        'status-available': 'rgb(var(--status-available) / <alpha-value>)',
        'status-available-bg': 'rgb(var(--status-available-bg) / <alpha-value>)',
        'status-incoming': 'rgb(var(--status-incoming) / <alpha-value>)',
        'status-incoming-bg': 'rgb(var(--status-incoming-bg) / <alpha-value>)',
        'status-reserved': 'rgb(var(--status-reserved) / <alpha-value>)',
        'status-reserved-bg': 'rgb(var(--status-reserved-bg) / <alpha-value>)',
        'status-sold': 'rgb(var(--status-sold) / <alpha-value>)',
        'status-sold-bg': 'rgb(var(--status-sold-bg) / <alpha-value>)',
        'status-info': 'rgb(var(--status-info) / <alpha-value>)',
        'status-info-bg': 'rgb(var(--status-info-bg) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Manrope"', '"Segoe UI"', 'sans-serif'],
        display: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
      },
      boxShadow: {
        card: '0 14px 32px rgba(17, 29, 74, 0.06)',
        hover: '0 22px 42px rgba(17, 29, 74, 0.12)',
        dropdown: '0 28px 54px rgba(17, 29, 74, 0.16)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
};
