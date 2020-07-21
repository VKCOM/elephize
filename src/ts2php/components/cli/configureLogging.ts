import { Options } from './types';
import { log, LogVerbosity } from '../../utils/log';

export function configureLogging(options: Options) {
  if (options.output === '__stdout') {
    log.forceStderr = true; // stdout used to print bootstrap file, force use stderr for debug messages
  }

  if (options.quiet) {
    log.verbosity = 0;
  } else {
    log.verbosity = (log.verbosity || (LogVerbosity.ERROR | LogVerbosity.WARN | LogVerbosity.WITH_CONTEXT));
    if (options.verbose) {
      log.verbosity = log.verbosity | LogVerbosity.INFO;
    }
    if (options.verboseUsage) {
      log.verbosity = log.verbosity | LogVerbosity.WITH_USAGE_GRAPH_DUMP | LogVerbosity.WITH_ELIMINATION_HINTS;
    }
    if (options.verboseTypehints) {
      log.verbosity = log.verbosity | LogVerbosity.WITH_TYPEHINTS;
    }
  }
}