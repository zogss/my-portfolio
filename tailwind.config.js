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

const boxShadow = {
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

export const content = [`./src/**/*.{js,jsx,ts,tsx}`]
export const theme = {
  extend: {
    colors,
    boxShadow,
    textShadow,
    minHeight: heightSpacing,
    maxHeight: heightSpacing,
  },
}
export const plugins = [
  '@tailwindcss/aspect-ratio',
  '@tailwindcss/container-queries',
  '@tailwindcss/forms',
  '@tailwindcss/typography',
  'prettier-plugin-tailwindcss',
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
]
