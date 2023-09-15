/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

const charcoalBlack = {
  700: '#121120',
}

const midnightSlate = {
  700: '#292835',
}

const slateGray = {
  200: '#D9D9D9',
  300: '#A1A1A1',
  400: '#88888f',
  500: '#616161',
}

const royalPurple = {
  700: '#663BC3',
}

const colors = {
  'charcoal-black': charcoalBlack,
  'midnight-slate': midnightSlate,
  'slate-gray': slateGray,
  'royal-purple': royalPurple,

  // projects colors
  'spacie-rose': '#CA0185',
  'cs-blue': '#5F5AF5',
  'expert-dark': '#131628',
  'massgueirinha-orange': '#e9522d',
  'bull-blockchain-blue': '#04203a',
}

const backgroundImage = {
  'gradient-primary':
    'linear-gradient(140deg, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.6) 95%)',
  'gradient-secondary':
    'linear-gradient(160deg, rgba(217, 217, 217, 0.04) 10%, rgba(255, 255, 255, 0.004) 30%)',
  'gradient-tertiary': 'linear-gradient(91deg, #4728D3 13.25%, #663BC2 96.98%)',
}

const boxShadow = {
  primary:
    '0rem .25rem 1.25rem -0.0625rem rgba(0, 0, 0, 0.25), 0rem .25rem 1.25rem 0rem rgba(47, 24, 108, 0.1)',
  secondary: '0rem .25rem 3.125rem 0rem rgba(106, 45, 206, 0.65)',
  tertiary: '0rem 0rem .625rem 0rem rgba(106, 45, 206, 0.65)',
  'white-sm': '0rem 0rem 1.25rem 0rem rgba(255, 255, 255, 0.25)',
  'white-md': '0rem 0rem 2.5rem 0rem rgba(255, 255, 255, 0.25)',
  'white-lg': '0rem 0rem 5rem 0rem rgba(255, 255, 255, 0.25)',
}

const heightSpacing = {
  'home-section': 'calc(100vh - 4.5rem)',
}

const textShadow = {
  sm: '0 .0625rem .125rem var(--tw-shadow-color)',
  DEFAULT: '0 .125rem .25rem var(--tw-shadow-color)',
  lg: '0 .5rem 1rem var(--tw-shadow-color)',
  primary: '0rem 0rem .8361rem rgba(0, 0, 0, 0.25)',
}

const screens = {
  '3xl': '112rem',
}

module.exports = {
  content: [`./src/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      colors,
      backgroundImage,
      boxShadow,
      textShadow,
      minHeight: heightSpacing,
      maxHeight: heightSpacing,
      screens,
    },
  },
  plugins: [
    'prettier-plugin-tailwindcss',
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
