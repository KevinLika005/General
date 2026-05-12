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
        'surface-alt': 'rgb(var(--surface-alt) / <alpha-value>)',
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
        sans: ['"IBM Plex Sans"', '"Segoe UI"', 'sans-serif'],
        display: ['"Barlow Semi Condensed"', '"IBM Plex Sans"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 0 rgba(16, 24, 40, 0.03)',
        hover: '0 10px 24px rgba(16, 24, 40, 0.08)',
        dropdown: '0 20px 40px rgba(16, 24, 40, 0.14)',
      },
      borderRadius: {
        xl: '0.5rem',
        '2xl': '0.625rem',
        '3xl': '0.75rem',
      },
    },
  },
  plugins: [],
};
