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
}

const backgroundImage = {
  'gradient-primary':
    'linear-gradient(140deg, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.6) 95%)',
  'gradient-secondary':
    'linear-gradient(160deg, rgba(217, 217, 217, 0.04) 10%, rgba(255, 255, 255, 0.004) 30%)',
  'gradient-tertiary': 'linear-gradient(91deg, #4728D3 13.25%, #663BC2 96.98%)',
}

const boxShadow = {
  primary: '0px 4px 20px -1px rgba(0, 0, 0, 0.25), 0px 4px 20px 0px rgba(47, 24, 108, 0.1)',
  secondary: '0px 4px 50px 0px rgba(106, 45, 206, 0.65)',
  tertiary: '0px 0px 10px 0px rgba(106, 45, 206, 0.65)',
  'white-sm': '0px 0px 20px 0px rgba(255, 255, 255, 0.25)',
  'white-md': '0px 0px 40px 0px rgba(255, 255, 255, 0.25)',
  'white-lg': '0px 0px 80px 0px rgba(255, 255, 255, 0.25)',
}

const heightSpacing = {
  'home-section': 'calc(100vh - 72px)',
}

const textShadow = {
  sm: '0 1px 2px var(--tw-shadow-color)',
  DEFAULT: '0 2px 4px var(--tw-shadow-color)',
  lg: '0 8px 16px var(--tw-shadow-color)',
  primary: '0px 0px 13.37690258026123px rgba(0, 0, 0, 0.25)',
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
