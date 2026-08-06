const nextCoreWebVitals = require('eslint-config-next/core-web-vitals');

module.exports = [
  ...nextCoreWebVitals,
  {
    ignores: ['.next/**', 'node_modules/**'],
    languageOptions: {
      parserOptions: { ecmaVersion: 2024, sourceType: 'module' },
    },
    settings: { react: { version: 'detect' } },
  },
];
