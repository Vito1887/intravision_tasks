module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'prettier',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['build', '.eslintrc.cjs'],
  rules: {
    '@typescript-eslint/ban-types': ['error', { types: { '{}': false } }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-static-element-interactions': ['error'],
    'no-duplicate-imports': ['error'],
    'no-extra-boolean-cast': 'off',
    'no-useless-escape': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    curly: ['error', 'all'],
  },
};
