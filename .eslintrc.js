module.exports = {
  "extends": [
    "google"
  ],
  parser: '@typescript-eslint/parser',
  "parserOptions": {
    "project": './tsconfig.json',
    "sourceType": "module"
  },
  plugins: [
    'jest',
    '@typescript-eslint',
  ],
  "env": {
    "node": true,
    "jest/globals": true
  },
  "settings": {
    "react": {
      "version": "16.0",
    }
  },
  "rules": {
    'require-jsdoc': 'off',
    'comma-dangle': ['warn', 'always-multiline'],
    'no-undef': 'error',
    'space-infix-ops': ['error', { int32Hint: false }],
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', 180, 2, { ignoreTemplateLiterals: true }],
    'curly': [2, 'all'],
    'no-octal': 'error',
    'no-eval': 'error',
    'no-invalid-this': 'off',
    'prefer-rest-params': 'off',
    'prefer-spread': 'off',
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-global-assign': 'error',

    // Enforce spacing before and after semicolons
    // https://eslint.org/docs/rules/semi-spacing
    'semi-spacing': ['error', { before: false, after: true }],

    // Enforce location of semicolons
    // https://eslint.org/docs/rules/semi-style
    'semi-style': ['error', 'last'],

    // Disallow duplicate imports
    'no-duplicate-imports': 'error',

    // Require the use of === and !==
    // https://eslint.org/docs/rules/eqeqeq
    'eqeqeq': ['error', 'always', { null: 'ignore' }],

    // Enforce spaces inside of blocks after opening block and before closing block
    // https://eslint.org/docs/rules/block-spacing
    'block-spacing': ['error', 'always'],

    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-types': ['error', {
      types: {
        Function: 'Use exact typing of callables instead of generic Function',
        Object: 'Use {} instead or exact typing',
        String: {
          message: 'Use string instead',
          fixWith: 'string',
        },
        Number: {
          message: 'Use number instead',
          fixWith: 'number',
        },
      },
    }],
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'camelcase': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/member-delimiter-style': 'error',
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'error',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      ignoreRestSiblings: true,
    }],
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/restrict-plus-operands': 'error',
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unbound-method': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',

    'valid-jsdoc': 'off',

    // Disallow unnecessary semicolons
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',


    // Disabled because: no configurable options for .length > 0, arr[0] and similar constructions.
    "no-magic-numbers": "off",
    "@typescript-eslint/no-magic-numbers": "off",

    // Disabled because: errors on "displayMode || '5min'" expression with nullable variable.
    "@typescript-eslint/no-unnecessary-condition": "off",

    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/require-array-sort-compare": "off",
    "@typescript-eslint/no-non-null-assertion": "off",

    // Disabled: covered with stricter tsc settings
    "@typescript-eslint/typedef": "off",

    // Disabled: extra parens make code more expressive
    "@typescript-eslint/no-extra-parens": "off",

    // Disabled: weird false positives in recursive classes usage
    "@typescript-eslint/no-use-before-define": "off",

    // Disabled: weird requirement
    "@typescript-eslint/no-this-alias": "off"
  }
};

