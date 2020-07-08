"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glob = require("glob");
var log_1 = require("../../utils/log");
var codeGenerator_1 = require("../codeGenerator");
var path = require("path");
var fs = require("fs");
var iconv = require("iconv-lite");
var ncp = require("ncp");
var replace = require('stream-replace');
function transpile(options, baseDir, outDir) {
    var namespaces = {
        root: options.rootNs,
        builtins: options.rootNs + '\\Builtins',
    };
    glob(options.src, function (e, matches) {
        if (e) {
            log_1.log("" + e, log_1.LogSeverity.ERROR);
            process.exit(1);
            return;
        }
        var compilerOptions = {
            baseUrl: baseDir,
            paths: options.tsPaths || {}
        };
        codeGenerator_1.translateCode({
            fileNames: matches.map(function (p) { return path.resolve('./', p); }),
            baseDir: baseDir,
            aliases: options.aliases,
            namespaces: namespaces,
            disableCodeElimination: options.noZap,
            options: compilerOptions,
            onData: function (filename, content) { return onData(filename, content); },
            onFinish: onFinish
        });
    });
    function onData(filename, content) {
        var outputFilename = outDir + '/' + filename;
        log_1.log('Emitting file: ' + outputFilename, log_1.LogSeverity.INFO);
        var outputDir = path.dirname(outputFilename);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(outputFilename, iconv.encode(content, options.encoding || 'utf-8'));
    }
    function onFinish(registry) {
        if ((log_1.log.errCount || 0) > 0 && options.bail === 'error') {
            process.exit(1);
        }
        if ((log_1.log.errCount || 0) + (log_1.log.warnCount || 0) > 0 && options.bail === 'warn') {
            process.exit(1);
        }
        var bootstrapContent = codeGenerator_1.makeBootstrap(registry, baseDir.endsWith('/') ? baseDir : baseDir + '/', options.aliases);
        if (options.output === '__stdout') {
            console.log(bootstrapContent);
        }
        else {
            log_1.log('Creating bootstrap file', log_1.LogSeverity.SPECIAL);
            fs.writeFile(path.resolve(outDir, options.output), iconv.encode(bootstrapContent, options.encoding || 'utf-8'), function (err) {
                if (!err) {
                    log_1.log('Bootstrap file successfully created', log_1.LogSeverity.SPECIAL);
                }
            });
        }
        var bSrc = path.resolve(__dirname, '..', '..', '..', 'server');
        var bTgt = outDir;
        log_1.log('Copying server-side base files', log_1.LogSeverity.SPECIAL);
        log_1.log("From: " + bSrc, log_1.LogSeverity.SPECIAL);
        log_1.log("To: " + bTgt, log_1.LogSeverity.SPECIAL);
        ncp(bSrc, bTgt, {
            transform: function (read, write) {
                read.pipe(replace(/__ROOTNS__/g, namespaces.root)).pipe(write);
            }
        }, function (err) {
            if (!err) {
                log_1.log('Server-side base files successfully copied', log_1.LogSeverity.SPECIAL);
            }
        });
    }
}
exports.transpile = transpile;
