import { CliOptions } from '../../types';

export const defaultOptions: CliOptions = {
  aliases: {},
  bail: 'none',
  baseDir: '.',
  config: '.elephizerc',
  encoding: 'utf-8',
  importRules: {},
  help: false,
  noZap: false,
  outDir: 'build/',
  output: '__stdout',
  quiet: false,
  rootNs: 'VK\\Elephize',
  src: '**/*.tsx',
  tsPaths: {},
  verbose: false,
  verboseTypehints: false,
  verboseUsage: false,
  watch: false,
};
