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
var typescript_1 = require("typescript");
var fs_1 = require("fs");
// internals. Not good thing to import them this way, but it's hard to customize transpileModule the way we want.
var addRange = require('typescript').addRange;
function getProgram(filenames, skippedFiles, transpileOptions, writeFile) {
    var diagnostics = [];
    var options = __assign({}, transpileOptions.compilerOptions || {});
    // mix in default options
    var defaultOptions = typescript_1.getDefaultCompilerOptions();
    for (var key in defaultOptions) {
        if (defaultOptions.hasOwnProperty(key) && options[key] === undefined) {
            options[key] = defaultOptions[key];
        }
    }
    // transpileModule does not write anything to disk so there is no need to verify that there are no conflicts between input and output paths.
    options.suppressOutputPathCheck = true;
    // Filename can be non-ts file.
    options.allowNonTsExtensions = true;
    // Create a compilerHost object to allow the compiler to read and write files
    var compilerHost = {
        getSourceFile: function (fileName) {
            if (skippedFiles.includes(fileName)) {
                // Use this hack to prevent typescript resolver from getting into files we don't want to parse.
                return undefined;
            }
            if (fileName.endsWith('.d.ts')) {
                return getDtsSourceFile(fileName, options.target) || undefined;
            }
            return getSourceFile(fileName, options.target) || undefined;
        },
        writeFile: writeFile,
        getDefaultLibFileName: function () { return 'lib.d.ts'; },
        useCaseSensitiveFileNames: function () { return false; },
        getCanonicalFileName: function (fileName) { return fileName; },
        getCurrentDirectory: function () { return ''; },
        getNewLine: function () { return '\n'; },
        fileExists: function (fileName) { return fs_1.existsSync(fileName); },
        readFile: function () { return ''; },
        directoryExists: function () { return true; },
        getDirectories: function () { return []; }
    };
    var program = typescript_1.createProgram(filenames, options, compilerHost);
    if (transpileOptions.reportDiagnostics) {
        addRange(/*to*/ diagnostics, /*from*/ program.getSyntacticDiagnostics());
        addRange(/*to*/ diagnostics, /*from*/ program.getOptionsDiagnostics());
    }
    return program;
}
exports.getProgram = getProgram;
var sourceFiles = {};
// Try find d.ts source in typescript folder
function getDtsSourceFile(name, target) {
    if (sourceFiles[name] === undefined) {
        var path = name.startsWith('/') ? name : require.resolve('typescript/lib/' + name);
        if (fs_1.existsSync(path)) {
            var input = fs_1.readFileSync(path, { encoding: 'utf-8' });
            sourceFiles[name] = typescript_1.createSourceFile(name, input, target);
        }
        else {
            sourceFiles[name] = null;
        }
    }
    return sourceFiles[name];
}
function getSourceFile(path, target) {
    if (sourceFiles[path] === undefined) {
        if (fs_1.existsSync(path)) {
            var input = fs_1.readFileSync(path, { encoding: 'utf-8' });
            sourceFiles[path] = typescript_1.createSourceFile(path, input, target);
        }
        else {
            sourceFiles[path] = null;
        }
    }
    return sourceFiles[path];
}
