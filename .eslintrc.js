module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-const-assign": "error",
    "no-this-before-super": "error",
    "no-undef": "error",
    "no-unreachable": "error",
    "no-unused-vars": "error",
    "constructor-super": "error",
    quotes: ["error", "single"],
    semi: ["error", "never"],
    "valid-typeof": "error",
    "space-before-function-paren": ["error", "always"]
  }
};
