module.exports = {
  env: {
    browser: true,  // accept: window, document, location, etc.
    es6: true,
  },
  globals: {
    require: true,  // commonjs
    process: true,  // webpack DefinePlugin
  },
  extends: [
    'eslint-config-airbnb',
  ].map(require.resolve),
  plugins: [
    'vue',
  ],
  rules: { // allow the for-of and for-in statement
    'no-restricted-syntax': [
      'error',
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    "no-mixed-operators": [
      "error",
      {
        "groups": [
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"]
        ],
        "allowSamePrecedence": true
      }
    ],
    'no-console': 'off', // allow console
    'no-plusplus': 'off', // allow the ++
    'no-unused-vars': ['off', { 'vars': 'all', 'args': 'none' }],  // move error to warn
    'max-nested-callbacks': ['warn', 3],  // set max callback depth
    'camelcase': ['off', { 'properties': 'always' }],  // disable camelcase warn
    'no-param-reassign': 'off',  // allow reassign param for short usage
    'prefer-template': 'off',  // allow both template string and string concat
    'guard-for-in': 'off',  // disable force if in for-in
    'import/extensions': 'off',  // allow import without extensions
    'import/no-unresolved': 'off',  // support for webpack alias
    'import/no-extraneous-dependencies': 'off',  // support for webpack alias
  }
};

