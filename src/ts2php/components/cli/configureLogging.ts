import { Options } from './types';
import { log, LogVerbosity } from '../../utils/log';

export function configureLogging(options: Options) {
  if (options.output === '__stdout') {
    log.forceStderr = true; // stdout used to print bootstrap file, force use stderr for debug messages
  }

  if (options.quiet) {
    log.verbosity = 0;
  } else {
    if (options.verbose) {
      log.verbosity = (log.verbosity || (LogVerbosity.ERROR | LogVerbosity.WARN | LogVerbosity.WITH_CONTEXT)) | LogVerbosity.INFO;
    }
    if (options.verboseUsage) {
      log.verbosity = (log.verbosity || (LogVerbosity.ERROR | LogVerbosity.WARN | LogVerbosity.WITH_CONTEXT)) | LogVerbosity.WITH_USAGE_GRAPH_DUMP | LogVerbosity.WITH_ELIMINATION_HINTS;
    }
  }
}