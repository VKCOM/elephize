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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderers_1 = require("../renderers");
var programFromString_1 = require("../utils/programFromString");
var context_1 = require("./context");
var log_1 = require("../utils/log");
var prettier = require("prettier/standalone");
var phpPrettierOptions_1 = require("../internalConfig/phpPrettierOptions");
var moduleRegistry_1 = require("./cjsModules/moduleRegistry");
var pathsAndNames_1 = require("../utils/pathsAndNames");
var usageGraph_1 = require("./unusedCodeElimination/usageGraph");
exports.defaultOptions = {
    target: ts.ScriptTarget.ES5,
    lib: [
        'lib.d.ts',
        'lib.dom.d.ts',
        'lib.es5.d.ts'
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
    var program = programFromString_1.getProgram(fileNames, {
        compilerOptions: __assign(__assign({}, exports.defaultOptions), options)
    }, function () { return null; });
    var registry = new moduleRegistry_1.ModuleRegistry(baseDir, aliases, options.paths || {}, namespaces);
    var checker = program.getTypeChecker();
    // console.log(options);
    // console.log(program.getSourceFiles().map((f) => f.fileName));
    for (var _i = 0, _h = program.getSourceFiles(); _i < _h.length; _i++) {
        var sourceFile = _h[_i];
        if (!sourceFile.isDeclarationFile) { // skip .d.ts if any
            var content = getInfo(sourceFile, checker, program.getCompilerOptions());
            var currentModule = registry.registerClass(sourceFile.fileName);
            if (!currentModule) {
                continue;
            }
            onBeforeRender(sourceFile.fileName, content);
            renderCode(content, baseDir, namespaces, registry, currentModule, disableCodeElimination, customGlobals);
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
}
exports.translateCode = translateCode;
/**
 * Module-level codegen. May emit one or more modules (in case of extracted component)
 *
 * @param info
 * @param baseDir - Note! This should be the SAME baseDir as passed into typescript as compilerOptions.baseUrl!
 * @param namespaces
 * @param registry
 * @param currentModule
 * @param disableCodeElimination
 * @param customGlobals
 */
function renderCode(info, baseDir, namespaces, registry, currentModule, disableCodeElimination, customGlobals) {
    if (disableCodeElimination === void 0) { disableCodeElimination = false; }
    if (customGlobals === void 0) { customGlobals = {}; }
    usageGraph_1.Scope._forceDisableUnusedVarsElimination = disableCodeElimination;
    var moduleScope = usageGraph_1.Scope.newRootScope({ flags: 0 }, currentModule.sourceFileName, __spreadArrays([
        'console',
        'document',
        'window',
        'Math',
        'Object',
        'Array'
    ], Object.keys(customGlobals)));
    var contextDry = new context_1.Context(moduleScope, info.checker, info.compilerOptions, currentModule, true, baseDir, namespaces, registry, customGlobals);
    info.node.gen(info, contextDry); // First pass: build trees and collect var usage info
    if (log_1.log.verbosity & log_1.LogVerbosity.WITH_USAGE_GRAPH_DUMP) {
        moduleScope.terminalNode._dump();
    }
    // Trigger usage vars graph traversal
    moduleScope.terminalNode.markUsage();
    currentModule.clearStatements();
    registry.clearClasses();
    var context = new context_1.Context(moduleScope, info.checker, info.compilerOptions, currentModule, false, baseDir, namespaces, registry, customGlobals);
    info.node.gen(info, context); // Second pass: build code with cleaned unused vars
}
function getInfo(node, checker, opts) {
    var children = node.getChildren();
    var nodeInfo = {
        node: renderers_1.getNodeInfo(node),
        checker: checker,
        compilerOptions: opts,
        children: [],
        flags: {
            localsData: {
                regStatements: []
            }
        }
    };
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var child = children_1[_i];
        nodeInfo.children.push(getInfo(child, checker, opts));
        nodeInfo.children[nodeInfo.children.length - 1].parent = nodeInfo;
    }
    return nodeInfo;
}
function makeBootstrap(registry, baseDir, aliases) {
    var names = [];
    registry.forEachModule(function (m) {
        if (!m.isEmpty()) {
            names.push(m.targetFileName);
        }
    });
    var deps = names.map(function (fn) {
        var path = fn.replace(baseDir, '');
        var modPath = pathsAndNames_1.normalizeFileExt(pathsAndNames_1.normalizeBasePath(path, baseDir, aliases));
        return "require_once __DIR__ . \"/" + modPath + "\";";
    });
    return "<?php\nrequire_once __DIR__ . \"/builtins.php\";\n" + deps.join('\n') + "\n\n";
}
exports.makeBootstrap = makeBootstrap;
