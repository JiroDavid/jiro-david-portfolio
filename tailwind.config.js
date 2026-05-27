/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream:        '#DCC9A9',
        brick:        '#B83A2D',
        sage:         '#4E6851',
        dark:         '#0d0c09',
        'dark-panel': '#111009',
        'dark-border':'#22211c',
        muted:        '#7a6e5a',
        dim:          '#3a3630',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
    },
  },
  plugins: [],
}
