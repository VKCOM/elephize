"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli = require("cli");
var path = require("path");
var fs = require("fs");
var log_1 = require("./ts2php/utils/log");
var help_1 = require("./ts2php/components/cli/help");
var retrieveConfig_1 = require("./ts2php/components/cli/retrieveConfig");
var configureLogging_1 = require("./ts2php/components/cli/configureLogging");
var transpile_1 = require("./ts2php/components/cli/transpile");
var _options = cli.parse({
    config: ['c', 'Configuration file path', 'string', undefined],
    src: ['s', 'An entry point (file or glob) to process', 'string', undefined],
    outDir: ['d', 'Directory for generated php files', 'string', undefined],
    output: ['o', 'Name for bootstrap file', 'string', undefined],
    quiet: ['q', 'Do not show error messages from transpiler', 'bool', undefined],
    verbose: ['v', 'Show more verbose output from transpiler', 'bool', undefined],
    verboseUsage: ['u', 'Show var usage stats & eliminator verbose output', 'bool', undefined],
    noZap: ['z', 'Do not remove unused variables from resulting code', 'bool', undefined],
    bail: ['e', 'Return error code if any error occurred during transpilation', 'string', undefined],
    baseDir: ['b', 'Base src directory for transpiled code', 'string', undefined],
    encoding: ['l', 'Set output encoding for non-ascii symbols', 'string', undefined],
    rootNs: ['n', 'Root namespace name for generated classes', 'string', undefined],
    help: ['h', 'Show some help', 'bool', undefined],
});
help_1.help(_options);
var options = retrieveConfig_1.retrieveConfig(_options);
configureLogging_1.configureLogging(options);
log_1.log('Running with configuration: ' + JSON.stringify(options, null, '  '), log_1.LogSeverity.INFO);
log_1.log("Running transpilation in glob: " + options.src, log_1.LogSeverity.INFO);
// Create output dir if absent
var outDir = path.resolve(options.outDir);
fs.mkdirSync(outDir, { recursive: true });
var baseDir = path.resolve(options.baseDir);
log_1.log('Selected source directory [base]: ' + baseDir, log_1.LogSeverity.SPECIAL);
log_1.log('Selected target directory [out]: ' + outDir, log_1.LogSeverity.SPECIAL);
log_1.log.baseDir = baseDir;
log_1.log.outDir = outDir;
transpile_1.transpile(options, baseDir, outDir);
