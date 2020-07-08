"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var defaults_1 = require("./defaults");
var log_1 = require("../../utils/log");
function retrieveConfig(options) {
    for (var k in options) {
        if (options[k] === undefined) {
            delete options[k];
        }
    }
    var rcOptions = {};
    try {
        var haveDefinedConfig = options.config && fs.existsSync(path.resolve(options.config));
        var haveDefaultConfig = fs.existsSync(path.resolve(defaults_1.defaultOptions.config));
        var cfgName = haveDefinedConfig
            ? path.resolve(options.config)
            : haveDefaultConfig
                ? path.resolve(defaults_1.defaultOptions.config)
                : null;
        if (cfgName) {
            rcOptions = JSON.parse(fs.readFileSync(cfgName, { encoding: 'utf-8' }));
        }
    }
    catch (e) {
        log_1.log("Failed to parse elephize config file: " + e, log_1.LogSeverity.ERROR);
        process.exit(1);
    }
    if (!options.baseDir && !rcOptions.baseDir && (rcOptions.aliases || rcOptions.tsPaths)) {
        log_1.log('With "aliases" or "tsPaths" specified in config, you should always specify baseDir either in config or in command line', log_1.LogSeverity.ERROR);
        process.exit(1);
    }
    return __assign(__assign(__assign({}, defaults_1.defaultOptions), rcOptions), options);
}
exports.retrieveConfig = retrieveConfig;
