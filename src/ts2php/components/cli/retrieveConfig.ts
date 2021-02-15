import * as fs from 'fs';
import * as path from 'path';
import { defaultOptions } from './defaults';
import { LogObj, LogSeverity } from '../../utils/log';
import { CliOptions } from '../../types';

export function retrieveConfig(options: any, log: LogObj): CliOptions {
  for (const k in options) {
    if (options[k] === undefined) {
      delete options[k];
    }
  }

  let rcOptions: { [key: string]: any } = {};
  try {
    const haveDefinedConfig = options.config && fs.existsSync(path.resolve(options.config));
    const haveDefaultConfig = fs.existsSync(path.resolve(defaultOptions.config));
    const cfgName = haveDefinedConfig
      ? path.resolve(options.config)
      : haveDefaultConfig
        ? path.resolve(defaultOptions.config)
        : null;

    if (cfgName) {
      rcOptions = JSON.parse(fs.readFileSync(cfgName, { encoding: 'utf-8' }));
    }
  } catch(e) {
    log(`Failed to parse elephize config file: ${e}`, LogSeverity.ERROR);
    process.exit(1);
  }

  if (!options.baseDir && !rcOptions.baseDir && (rcOptions.aliases || rcOptions.tsPaths)) {
    log('With "aliases" or "tsPaths" specified in config, you should always specify baseDir either in config or in command line', LogSeverity.ERROR);
    process.exit(1);
  }

  return { ...defaultOptions, ...rcOptions, ...options };
}