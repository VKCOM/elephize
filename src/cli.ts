import * as cli from 'cli';
import * as path from 'path';
import * as fs from 'fs';
import { log, LogSeverity } from './ts2php/utils/log';
import { help } from './ts2php/components/cli/help';
import { retrieveConfig } from './ts2php/components/cli/retrieveConfig';
import { configureLogging } from './ts2php/components/cli/configureLogging';
import { transpile } from './ts2php/components/cli/transpile';

let _options = cli.parse({
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
  rootNs: ['n', 'Root namespace name for generated classes', 'string', undefined],
  help: ['h', 'Show some help', 'bool', undefined],
});

help(_options);
const options = retrieveConfig(_options);
configureLogging(options);

log('Running with configuration: ' + JSON.stringify(options, null, '  '), LogSeverity.INFO);
log(`Running transpilation in glob: ${options.src}`, LogSeverity.INFO);

// Create output dir if absent
const outDir = path.resolve(options.outDir);
fs.mkdirSync(outDir, { recursive: true });

const baseDir = path.resolve(options.baseDir);
log('Selected source directory [base]: ' + baseDir, LogSeverity.SPECIAL);
log('Selected target directory [out]: ' + outDir, LogSeverity.SPECIAL);
log.baseDir = baseDir;
log.outDir = outDir;

transpile(options, baseDir, outDir);
