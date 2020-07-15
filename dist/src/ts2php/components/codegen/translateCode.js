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
var ts = require("typescript");
var programFromString_1 = require("../../utils/programFromString");
var log_1 = require("../../utils/log");
var prettier = require("prettier/standalone");
var phpPrettierOptions_1 = require("../../internalConfig/phpPrettierOptions");
var moduleRegistry_1 = require("../cjsModules/moduleRegistry");
var pathsAndNames_1 = require("../../utils/pathsAndNames");
var ignore_1 = require("../cjsModules/ignore");
var renderModule_1 = require("./renderModule");
var nodeFlagStore_1 = require("./nodeFlagStore");
var path = require("path");
exports.defaultOptions = {
    target: ts.ScriptTarget.ES5,
    lib: [
        'lib.d.ts',
        'lib.dom.d.ts',
        'lib.es5.d.ts',
        'lib.es2015.d.ts',
        'lib.es2016.d.ts',
        path.resolve(__dirname, '..', '..', 'types', 'global', 'index.d.ts')
    ],
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.React,
    allowUnreachableCode: true,
    allowJs: true,
    isolatedModules: true,
    resolveJsonModule: true,
};
function translateCode(_a) {
    var fileNames = _a.fileNames, onData = _a.onData, _b = _a.onBeforeRender, onBeforeRender = _b === void 0 ? function () { return undefined; } : _b, baseDir = _a.baseDir, _c = _a.customGlobals, customGlobals = _c === void 0 ? {} : _c, _d = _a.disableCodeElimination, disableCodeElimination = _d === void 0 ? false : _d, _e = _a.aliases, aliases = _e === void 0 ? {} : _e, namespaces = _a.namespaces, _f = _a.options, options = _f === void 0 ? exports.defaultOptions : _f, _g = _a.onFinish, onFinish = _g === void 0 ? function () { return undefined; } : _g;
    // Enable more logging using env var
    log_1.log.verbosity = process.env.VERBOSE ? log_1.LogVerbosity.ALL : 0;
    var nodeFlagStore = new nodeFlagStore_1.NodeFlagStore();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.all(fileNames.map(function (fn) { return new Promise(ignore_1.getSkippedFilesPromiseExec({ entrypoint: fn, baseDir: baseDir, tsPaths: options.paths || {}, aliases: aliases })); })).then(function (fileSet) { return fileSet
        .reduce(function (acc, chunk) { return acc.concat(chunk); }, [])
        .map(function (fn) { return pathsAndNames_1.resolveAliasesAndPaths(fn, '', baseDir, options.paths || {}, aliases, true); })
        .filter(function (fn) { return !!fn; }); }).then(function (skippedFiles) {
        var program = programFromString_1.getProgram(fileNames, skippedFiles, {
            compilerOptions: __assign(__assign({}, exports.defaultOptions), options)
        }, function () { return null; });
        var registry = new moduleRegistry_1.ModuleRegistry(baseDir, aliases, options.paths || {}, namespaces);
        var checker = program.getTypeChecker();
        for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
            var sourceFile = _a[_i];
            if (!sourceFile.isDeclarationFile) { // skip .d.ts if any
                var currentModule = registry.registerClass(sourceFile.fileName);
                if (!currentModule) {
                    continue;
                }
                onBeforeRender(sourceFile.fileName, sourceFile);
                renderModule_1.renderModule(checker, options, sourceFile, nodeFlagStore, baseDir, namespaces, registry, currentModule, disableCodeElimination, customGlobals);
            }
        }
        registry.forEachModule(function (mod) {
            if (mod.isEmpty()) {
                // Do not emit empty modules
                log_1.log("Dropping module " + mod.className + " (" + mod.targetFileName + ") because it's empty", log_1.LogSeverity.INFO);
                return;
            }
            var content = mod.generateContent();
            try {
                content = prettier.format(content, phpPrettierOptions_1.phpPrettierOptions);
            }
            catch (e) {
                console.error('Prettier failed to parse & prettify generated code. Here is raw code:');
                console.log(content);
            }
            onData(mod.targetFileName, content);
        });
        onFinish(registry);
    });
    return nodeFlagStore;
}
exports.translateCode = translateCode;
