import * as cli from 'cli';
import * as path from 'path';
import * as fs from 'fs';
import { help } from './ts2php/components/cli/help';
import { retrieveConfig } from './ts2php/components/cli/retrieveConfig';
import { configureLogging } from './ts2php/components/cli/configureLogging';
import { transpile } from './ts2php/components/cli/transpile';

const _options = cli.parse({
  config: ['c', 'Configuration file path', 'string', undefined],
  src: ['s', 'An entry point (file or glob) to process', 'string', undefined],
  outDir: ['d', 'Directory for generated php files', 'string', undefined],
  output: ['o', 'Name for bootstrap file', 'string', undefined],
  quiet: ['q', 'Do not show error messages from transpiler', 'bool', undefined],
  verbose: ['v', 'Show more verbose output from transpiler', 'bool', undefined],
  verboseUsage: ['u', 'Show var usage stats & eliminator verbose output', 'bool', undefined],
  verboseTypehints: ['t', 'Show type hinting tool verbose output', 'bool', undefined],
  noZap: ['z', 'Do not remove unused variables from resulting code', 'bool', undefined],
  bail: ['e', 'Return error code if any error occurred during transpilation', 'string', undefined],
  baseDir: ['b', 'Base src directory for transpiled code', 'string', undefined],
  encoding: ['l', 'Set output encoding for non-ascii symbols', 'string', undefined],
  serverFilesRoot: ['r', 'Server root files folder path', 'string', undefined],
  rootNs: ['n', 'Root namespace name for generated classes', 'string', undefined],
  watch: ['w', 'Start elephize in watcher mode', 'bool', undefined],
  help: ['h', 'Show some help', 'bool', undefined],
});

help(_options);
const options = retrieveConfig(_options);
const outDir = path.resolve(options.outDir);
const baseDir = path.resolve(options.baseDir);
const log = configureLogging({
  baseDir, outDir,
  output: options.output,
  verbose: options.verbose,
  verboseTypehints: options.verboseTypehints,
  verboseUsage: options.verboseUsage,
  quiet: options.quiet,
});

log.info('Running with configuration: %s', [JSON.stringify(options, null, '  ')]);
log.info('Running transpilation in glob: %s', [options.src]);

// Create output dir if absent
fs.mkdirSync(outDir, { recursive: true });
log.special('Selected source directory [base]: %s', [baseDir]);
log.special('Selected target directory [out]: %s', [outDir]);

transpile(options, baseDir, outDir, log);
