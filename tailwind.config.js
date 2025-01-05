import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  sans: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'system-ui',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'Noto Sans',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      colors: {
        'charcoal-black': {
          700: '#121120',
        },
        'midnight-slate': {
          400: '#4F4E61',
          700: '#292835',
        },
        'slate-gray': {
          200: '#D9D9D9',
          300: '#A1A1A1',
          400: '#88888f',
          500: '#616161',
        },
        'royal-purple': {
          700: '#663BC3',
        },

        // projects colors
        'spacie-rose': '#CA0185',
        'cs-blue': '#5F5AF5',
        'expert-dark': '#131628',
        'massgueirinha-orange': '#e9522d',
        'bull-blockchain-blue': '#04203a',
        'car-rent-violet': '#5038de',
        'localize-blue': '#81d9f7',
      },
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(140deg, var(--p-gr-primary-color-1) 0%, var(--p-gr-primary-color-2) 95%)',
        'gradient-secondary':
          'linear-gradient(160deg, #d9d9d90a 10%, #ffffff01 30%)',
        'gradient-tertiary':
          'linear-gradient(91deg, var(--p-gr-tertiary-color-1) 13.25%, var(--p-gr-tertiary-color-2) 96.98%)',
      },
      boxShadow: {
        primary:
          '0rem .25rem 1.25rem -0.0625rem #00000040, 0rem .25rem 1.25rem 0rem #2f186c1a',
        secondary: '0rem .25rem 3.125rem 0rem #6a2dcea6',
        tertiary: '0rem 0rem .625rem 0rem #6a2dcea6',
        'white-sm': '0rem 0rem 1.25rem 0rem #ffffff40',
        'white-md': '0rem 0rem 2.5rem 0rem #ffffff40',
        'white-lg': '0rem 0rem 5rem 0rem #ffffff40',
      },
      textShadow: {
        sm: '0 .0625rem .125rem var(--tw-shadow-color)',
        DEFAULT: '0 .125rem .25rem var(--tw-shadow-color)',
        lg: '0 .5rem 1rem var(--tw-shadow-color)',
        primary: '0rem 0rem .8361rem #00000040',
      },
      minHeight: {
        'home-section': 'calc(100vh - 4.5rem)',
      },
      maxHeight: {
        'home-section': 'calc(100vh - 4.5rem)',
      },
      screens: {
        xs: '25rem',
        '3xl': '112rem',
      },
    },
  },
  plugins: [
    'prettier-plugin-tailwindcss',
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(({matchUtilities, theme}) => {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value,
          }),
        },
        {values: theme('textShadow')},
      );
    }),
  ],
};
