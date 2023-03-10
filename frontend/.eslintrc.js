module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:cypress/recommended',
    'prettier',
  ],
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-param-reassign': [2, { props: false }],
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['prettier', 'jest'],
};
