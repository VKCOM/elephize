"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var LogSeverity;
(function (LogSeverity) {
    LogSeverity[LogSeverity["INFO"] = 0] = "INFO";
    LogSeverity[LogSeverity["WARN"] = 1] = "WARN";
    LogSeverity[LogSeverity["ERROR"] = 2] = "ERROR";
    LogSeverity[LogSeverity["SPECIAL"] = 3] = "SPECIAL";
})(LogSeverity = exports.LogSeverity || (exports.LogSeverity = {}));
var LogVerbosity;
(function (LogVerbosity) {
    LogVerbosity[LogVerbosity["INFO"] = 1] = "INFO";
    LogVerbosity[LogVerbosity["WARN"] = 2] = "WARN";
    LogVerbosity[LogVerbosity["ERROR"] = 4] = "ERROR";
    LogVerbosity[LogVerbosity["WITH_CONTEXT"] = 8] = "WITH_CONTEXT";
    LogVerbosity[LogVerbosity["WITH_ELIMINATION_HINTS"] = 16] = "WITH_ELIMINATION_HINTS";
    LogVerbosity[LogVerbosity["WITH_USAGE_GRAPH_DUMP"] = 32] = "WITH_USAGE_GRAPH_DUMP";
    LogVerbosity[LogVerbosity["ALL"] = 63] = "ALL"; // fix this if there is more flags
})(LogVerbosity = exports.LogVerbosity || (exports.LogVerbosity = {}));
exports.log = function (message, severity, context) {
    if (context === void 0) { context = ''; }
    switch (severity) {
        case LogSeverity.ERROR:
            exports.log.errCount = (exports.log.errCount || 0) + 1;
            if (exports.log.verbosity & LogVerbosity.ERROR) {
                printLog(message, severity, exports.log.verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
            }
            break;
        case LogSeverity.SPECIAL:
        case LogSeverity.INFO:
            if (exports.log.verbosity & LogVerbosity.INFO) {
                printLog(message, severity, exports.log.verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
            }
            break;
        case LogSeverity.WARN:
            exports.log.warnCount = (exports.log.warnCount || 0) + 1;
            if (exports.log.verbosity & LogVerbosity.WARN) {
                printLog(message, severity, exports.log.verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
            }
            break;
    }
};
exports.log.verbosity = LogVerbosity.ERROR | LogVerbosity.WARN | LogVerbosity.WITH_CONTEXT;
function ctx(node) {
    if (!node) {
        return '';
    }
    var _a = node.getSourceFile().getLineAndCharacterOfPosition(node.getStart()), line = _a.line, character = _a.character;
    var filename = exports.log.baseDir
        ? node.getSourceFile().fileName.replace(exports.log.baseDir, '[base]')
        : node.getSourceFile().fileName;
    return "@" + filename + ":" + (line + 1) + ":" + (character + 1);
}
exports.ctx = ctx;
function shortCtx(fn) {
    var filename = exports.log.baseDir
        ? fn.replace(exports.log.baseDir, '[base]')
        : fn;
    return "@" + filename;
}
exports.shortCtx = shortCtx;
function printLog(message, severity, context) {
    if (context === void 0) { context = ''; }
    if (exports.log.baseDir && severity !== LogSeverity.SPECIAL) {
        message = message.replace(exports.log.baseDir, '[base]');
    }
    if (exports.log.outDir && severity !== LogSeverity.SPECIAL) {
        message = message.replace(exports.log.outDir, '[out]');
    }
    var marker = chalk.dim('[i]');
    switch (severity) {
        case LogSeverity.ERROR:
            marker = chalk.bgRedBright(chalk.black('[E]'));
            break;
        case LogSeverity.WARN:
            marker = chalk.bgYellowBright(chalk.black('[W]'));
            break;
        case LogSeverity.SPECIAL:
            marker = chalk.bgGreenBright(chalk.black('[!]'));
            break;
        case LogSeverity.INFO:
        default:
            break;
    }
    var str = marker + " " + message + (context ? '\n      ' + context : '');
    if (severity === LogSeverity.ERROR || exports.log.forceStderr) {
        process.stderr.write(str + '\n');
    }
    else {
        process.stdout.write(str + '\n');
    }
}
