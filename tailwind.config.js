/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/partials/**/*.{js,jsx,ts,tsx}`,
    `./src/hooks/**/*.{js,jsx,ts,tsx}`,
    `./src/contexts/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {},
  },
  plugins: [
    '@tailwindcss/aspect-ratio',
    '@tailwindcss/container-queries',
    '@tailwindcss/forms',
    '@tailwindcss/typography',
    'prettier-plugin-tailwindcss',
  ],
}
