module.exports = {
  plugins: [
    "import",
    "jest",
    "security"
  ],
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:security/recommended",
    "plugin:jest/recommended"
  ],
  env: {
    "es6": true,
    "jest": true,
    "node": true
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module"
  }
}
