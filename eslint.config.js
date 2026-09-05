import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import pluginPrettier from 'eslint-config-prettier';
import pluginOnlyWarn from 'eslint-plugin-only-warn';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export default [
  js.configs.recommended,
  pluginPrettier,
  ...tseslint.configs.recommended,
  {
    ignores: [
      '.env',
      'node_modules',
      'public',
      'static',
      '.gitignore',
      '.cache',
      '.next',
    ],
  },
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  // v7 ships the React Compiler rules in `recommended`; `configs.flat.*` are the
  // flat-config entries (the legacy `configs.recommended` keeps an eslintrc-shaped
  // `plugins` array). Swap to `flat['recommended-latest']` to opt into the
  // experimental rules on top.
  pluginReactHooks.configs.flat.recommended,
  {
    plugins: {
      'only-warn': pluginOnlyWarn,
    },
    rules: {
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
  },
];
