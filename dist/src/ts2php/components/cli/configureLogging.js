"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../../utils/log");
function configureLogging(options) {
    if (options.output === '__stdout') {
        log_1.log.forceStderr = true; // stdout used to print bootstrap file, force use stderr for debug messages
    }
    if (options.quiet) {
        log_1.log.verbosity = 0;
    }
    else {
        if (options.verbose) {
            log_1.log.verbosity = (log_1.log.verbosity || (log_1.LogVerbosity.ERROR | log_1.LogVerbosity.WARN | log_1.LogVerbosity.WITH_CONTEXT)) | log_1.LogVerbosity.INFO;
        }
        if (options.verboseUsage) {
            log_1.log.verbosity = (log_1.log.verbosity || (log_1.LogVerbosity.ERROR | log_1.LogVerbosity.WARN | log_1.LogVerbosity.WITH_CONTEXT)) | log_1.LogVerbosity.WITH_USAGE_GRAPH_DUMP | log_1.LogVerbosity.WITH_ELIMINATION_HINTS;
        }
    }
}
exports.configureLogging = configureLogging;
