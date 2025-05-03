/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@env',
    '^@/@types/(.*)$',
    '^@/config/(.*)$',
    '^@/actions/(.*)$',
    '^@/lib/(.*)$',
    '^@/helpers/(.*)$',
    '^@/i18n/(.*)$',
    '^@/schemas/(.*)$',
    '^@/hooks/(.*)$',
    '^@/providers/(.*)$',
    '^@/components/ui/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '^@/app/(.*)$',
    '',
    '^@public/(.*)$',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};

export default config;
