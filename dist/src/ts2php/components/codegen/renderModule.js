"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var usageGraph_1 = require("../unusedCodeElimination/usageGraph");
var context_1 = require("../context");
var log_1 = require("../../utils/log");
var renderNodes_1 = require("./renderNodes");
/**
 * Module-level codegen. May emit one or more modules (in case of extracted component)
 *
 * @param checker
 * @param options
 * @param root
 * @param nodeFlagsStore
 * @param baseDir - Note! This should be the SAME baseDir as passed into typescript as compilerOptions.baseUrl!
 * @param namespaces
 * @param registry
 * @param currentModule
 * @param disableCodeElimination
 * @param customGlobals
 */
function renderModule(checker, options, root, nodeFlagsStore, baseDir, namespaces, registry, currentModule, disableCodeElimination, customGlobals) {
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
    var contextDry = new context_1.Context(moduleScope, checker, nodeFlagsStore, options, currentModule, true, baseDir, namespaces, registry, customGlobals);
    // First pass: build trees and collect var usage info
    renderNodes_1.renderNode(root, contextDry);
    // Trigger usage vars graph traversal
    moduleScope.terminalNode.markUsage();
    if (log_1.log.verbosity & log_1.LogVerbosity.WITH_USAGE_GRAPH_DUMP) {
        moduleScope.terminalNode._dump();
    }
    currentModule.clearStatements();
    registry.clearClasses();
    nodeFlagsStore.clear();
    var context = new context_1.Context(moduleScope, checker, nodeFlagsStore, options, currentModule, false, baseDir, namespaces, registry, customGlobals);
    // Second pass: build code with cleaned unused vars
    renderNodes_1.renderNode(root, context);
}
exports.renderModule = renderModule;
