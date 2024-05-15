import { Logger, LogOptions, LogPrinter, LogVerbosity } from '../../utils/log';

type ConfigureLoggingParams = {
  quiet?: boolean;
  verbose?: boolean;
  verboseUsage?: boolean;
  verboseTypehints?: boolean;
  outDir: string;
  baseDir: string;
  printer?: LogPrinter;
};

export function configureLogging(options: ConfigureLoggingParams): Logger {
  const opts: LogOptions = {
    noOutput: false,
    baseDir: options.baseDir,
    outDir: options.outDir,
    verbosity: LogVerbosity.ERROR | LogVerbosity.WARN | LogVerbosity.WITH_CONTEXT,
    forceStderr: false,
  };

  if (options.quiet) {
    opts.verbosity = 0 as LogVerbosity;
  } else {
    if (options.verbose) {
      opts.verbosity = opts.verbosity! | LogVerbosity.INFO;
    }
    if (options.verboseUsage) {
      opts.verbosity = opts.verbosity! | LogVerbosity.WITH_USAGE_GRAPH_DUMP | LogVerbosity.WITH_ELIMINATION_HINTS;
    }
    if (options.verboseTypehints) {
      opts.verbosity = opts.verbosity! | LogVerbosity.WITH_TYPEHINTS;
    }
  }

  return new Logger(opts, options.printer);
}
