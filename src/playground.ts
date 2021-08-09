import * as fs from 'fs';
import { retrieveConfig } from './ts2php/components/cli/retrieveConfig';
import { configureLogging } from './ts2php/components/cli/configureLogging';
import { transpile } from './ts2php/components/cli/transpile';
import { InputOptions } from './ts2php/types';

export function startPlayground(opts: InputOptions) {
  const _options = {
    ...opts,
    watch: true,
  };

  const options = retrieveConfig(_options);
  const log = configureLogging({
    baseDir: options.baseDir,
    outDir: options.outDir,
    verbose: options.verbose,
    verboseTypehints: options.verboseTypehints,
    verboseUsage: options.verboseUsage,
    quiet: false,
  });

  log.info('Running with configuration: %s', [JSON.stringify(options, null, '  ')]);
  log.info('Running transpilation in glob: %s', [options.src]);

  // Create output dir if absent
  fs.mkdirSync(options.outDir, { recursive: true });
  log.special('Selected source directory [base]: %s', [options.baseDir]);
  log.special('Selected target directory [out]: %s', [options.outDir]);

  transpile(options, options.baseDir, options.outDir, log);
}
