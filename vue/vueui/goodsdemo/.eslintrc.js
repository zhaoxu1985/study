module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ['plugin:vue/essential'],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': 0
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  'extends': [
    'plugin:vue/recommended'
  ]
}
