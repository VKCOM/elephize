import { Options } from './types';

export const defaultOptions: Options = {
  config: '.elephizerc',
  src: '**/*.tsx',
  outDir: 'build/',
  output: '__stdout',
  quiet: false,
  verbose: false,
  verboseUsage: false,
  verboseTypehints: false,
  bail: 'none',
  noZap: false,
  baseDir: '.',
  help: false,
  encoding: 'utf-8',
  aliases: {},
  tsPaths: {},
  rootNs: 'VK\\Elephize'
};
