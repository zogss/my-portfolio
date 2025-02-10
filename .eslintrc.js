/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'only-warn', 'tailwindcss'],
  settings: {
    tailwindcss: {
      callees: ['cn', 'clsx', 'cva'],
      config: 'tailwind.config.js',
    },
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-unreachable': 'error',
    'tailwindcss/no-custom-classname': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
  ],
};
