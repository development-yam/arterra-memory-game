const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brandBlue: '#00a3ff',
        brandGreen: '#3fbaa6',
        brandPink: '#ff358f',
      },
      keyframes: {
        'zoom-out': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(4)' },
        },
      },
      animation: {
        'zoom-out': 'zoom-out 7s ease-in-out infinite forwards',
      },
    },
  },
  plugins: [],
}
