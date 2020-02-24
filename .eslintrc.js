module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    semi: 0,
    indent: 0,
    'no-trailing-spaces': 0,
    quotes: 0,
    'key-spacing': 0,
    'space-before-function-paren': 0
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  globals: {
    'AMap': 'AMap'
  }
}
