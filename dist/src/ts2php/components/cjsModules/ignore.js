"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var ts = require("typescript");
var log_1 = require("../../utils/log");
var pathsAndNames_1 = require("../../utils/pathsAndNames");
// ignored/skipped imports related functions
var ctxEx = function (fn, node) { return node ? log_1.ctx(node) : "Entry point: " + fn; };
function parseSourceFile(_a) {
    var filename = _a.filename, onFinish = _a.onFinish, onSkip = _a.onSkip, importReference = _a.importReference;
    fs.readFile(filename, { encoding: 'utf-8' }, function (err, data) {
        var sourceFile = ts.createSourceFile(filename, data, ts.ScriptTarget.Latest, true);
        var trivia = importReference === null || importReference === void 0 ? void 0 : importReference.getFullText().substr(0, importReference === null || importReference === void 0 ? void 0 : importReference.getLeadingTriviaWidth());
        if (trivia === null || trivia === void 0 ? void 0 : trivia.includes('@elephizeIgnore')) {
            log_1.log("Skipping ignored file: " + filename, log_1.LogSeverity.INFO, ctxEx(filename, importReference));
            onSkip(filename);
            return;
        }
        if (sourceFile.isDeclarationFile) {
            log_1.log("Skipping declaration file: " + filename, log_1.LogSeverity.INFO, ctxEx(filename, importReference));
            onSkip(filename);
            return;
        }
        onFinish(sourceFile);
    });
}
exports.parseSourceFile = parseSourceFile;
exports.getSkippedFilesPromiseExec = function (_a) {
    var entrypoint = _a.entrypoint, baseDir = _a.baseDir, tsPaths = _a.tsPaths, aliases = _a.aliases;
    return function (resolve) {
        var results = [];
        var sem = 0;
        var semInc = function () { return ++sem; };
        var semDec = function (filename) {
            if (filename) {
                results.push(filename);
            }
            --sem;
            if (sem === 0) {
                resolve(results);
            }
        };
        var parseSourceFileRecursive = function (filename, ref) {
            filename = filename.replace(/^'|'$/g, '');
            if (filename.match(/^[a-z_-]+$/) || filename.startsWith('@')) {
                // node module import
                return;
            }
            var fn = pathsAndNames_1.resolveAliasesAndPaths(filename.replace(/^'|'$/g, ''), '', baseDir, tsPaths, aliases, true);
            if (!fn) {
                log_1.log("Module not found: " + filename, log_1.LogSeverity.ERROR, ctxEx(filename, ref));
                return;
            }
            semInc();
            parseSourceFile({ filename: fn, importReference: ref, onSkip: semDec, onFinish: function (result) {
                    var imports = result.statements.filter(function (c) { return c.kind === ts.SyntaxKind.ImportDeclaration; });
                    imports.forEach(function (imp) {
                        parseSourceFileRecursive(imp.moduleSpecifier.getText(result), imp);
                    });
                    semDec();
                } });
        };
        parseSourceFileRecursive(entrypoint);
    };
};
