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
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module"
  },
  overrides: [
    {
      "files": ["**/*.js"],
      "rules": {
        // See https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-syntax.md
        //   rule supposedly matches ECMA version with node
        //   we get: "Import and export declarations are not supported yet"
        "node/no-unsupported-features/es-syntax": "off",
        // this is a CLI tool; we DO want to send output to console
        "no-console": "off",
      }
    }
  ]
}
