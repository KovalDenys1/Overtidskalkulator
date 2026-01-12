const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  // apply Next.js recommended configs via compatibility layer
  ...compat.extends('next/core-web-vitals'),
  {
    ignores: ['.next/**', 'node_modules/**'],
    languageOptions: {
      parserOptions: { ecmaVersion: 2024, sourceType: 'module' },
    },
    settings: { react: { version: 'detect' } },
  },
];
