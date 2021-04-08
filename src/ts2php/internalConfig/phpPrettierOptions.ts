// @ts-ignore
import * as phpPlugin from '@prettier/plugin-php/standalone';

export const phpPrettierOptions = {
  plugins: [phpPlugin],
  parser: 'php',
  printWidth: 120,
  braceStyle: '1tbs',
} as any;
