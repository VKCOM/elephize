module.exports = {
  "parserOptions": {
    "project": './tsconfig.json',
    "sourceType": "module"
  },
  "extends": [
    "@vkontakte/eslint-config/typescript"
  ],
  "settings": {
    "react": {
      "version": "16.0",
    }
  },
  "rules": {
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

