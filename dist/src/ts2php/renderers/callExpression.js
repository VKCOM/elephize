"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types_1 = require("../types");
var stdlib_1 = require("./stdlib");
var ast_1 = require("../utils/ast");
var intrinsicElements_1 = require("../internalConfig/intrinsicElements");
var log_1 = require("../utils/log");
var reactHooks_1 = require("../components/react/reactHooks");
var nodeData_1 = require("../components/unusedCodeElimination/usageGraph/nodeData");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
var varsUsage_1 = require("../components/unusedCodeElimination/varsUsage");
var node_1 = require("../components/unusedCodeElimination/usageGraph/node");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tCallExpression(node, context) {
    // Support js stdlib objects methods, see stdlibSupport for details
    var hookResult = stdlib_1.hookStdlib(node, context);
    if (hookResult !== undefined) {
        return hookResult;
    }
    var reactHooks = reactHooks_1.reactHooksSupport(context, node);
    if (reactHooks) {
        if (reactHooks === '!null') {
            return ''; // drop current statement in this special case
        }
        return reactHooks;
    }
    var ident = renderNodes_1.renderNode(node.expression, context);
    var args;
    var usedVars = new Set();
    var onUsage = function (ident) { return usedVars.add(ident); };
    context.scope.addEventListener(usageGraph_1.Scope.EV_USAGE, onUsage);
    if (ident === '$this->h') {
        ident = '\n' + '$this->h';
        context.nodeFlagsStore.upsert(node, { name: 'ReactCreateElement' });
        var _a = node.arguments, componentName = _a[0], attrs = _a[1], children = _a.slice(2);
        var componentNameRendered = void 0;
        var attrsRendered = void 0;
        var childrenRendered = void 0;
        if (componentName.kind === ts.SyntaxKind.StringLiteral) { // intrinsic element
            componentNameRendered = renderNodes_1.renderNode(componentName, context);
            var componentNameUnquoted = componentNameRendered.replace(/"/g, '');
            if (!intrinsicElements_1.intrinsicElements[componentNameUnquoted]) {
                log_1.log("Unknown intrinsic tag " + componentNameUnquoted, log_1.LogSeverity.ERROR, log_1.ctx(node));
                return 'null';
            }
            // This will be used in propertyAssignment visitor to check attrs
            context.nodeFlagsStore.upsert(node, { elementName: componentNameUnquoted });
            attrsRendered = renderNodes_1.renderNode(attrs, context) || '[]';
            childrenRendered = renderNodes_1.renderNodes(children, context);
        }
        else { // react component
            componentNameRendered = renderNodes_1.renderNode(componentName, context);
            attrsRendered = renderNodes_1.renderNode(attrs, context) || '[]';
            childrenRendered = renderNodes_1.renderNodes(children, context);
        }
        args = [
            componentNameRendered,
            attrsRendered,
            '[' + childrenRendered.join(', ') + ']' // convert child nodes to explicit array
        ];
    }
    else if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression
        && node.expression.name.escapedText === 'hasOwnProperty') {
        // Object {}.hasOwnProperty() support for For-In loops; not a general support!
        ast_1.flagParentOfType(node, [ts.SyntaxKind.IfStatement], { drop: true }, context.nodeFlagsStore);
        ast_1.flagParentOfType(node, [ts.SyntaxKind.ForInStatement], { validated: true }, context.nodeFlagsStore);
        args = renderNodes_1.renderNodes(__spreadArrays(node.arguments), context);
    }
    else {
        args = renderNodes_1.renderNodes(__spreadArrays(node.arguments), context);
    }
    context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, onUsage);
    // Check for spread in the middle
    var callChildren = node.arguments.slice();
    var spread = callChildren.findIndex(function (v) { return v.kind === ts.SyntaxKind.SpreadElement; });
    if (spread !== -1) {
        if (spread !== callChildren.length - 1) {
            // specific situation: php does not allow spreads in middle of argument list.
            // So we use array_merge + spread. Kphp will not be really happy with it though.
            log_1.log('Using array_merge to create parameters array for function, it may fail type inference', log_1.LogSeverity.WARN, log_1.ctx(node));
            args = ["..." + makeCallArgs(callChildren, args)];
        }
        else {
            // ok, it's last one, so just add ... to spread element.
            args[args.length - 1] = '...' + args[args.length - 1];
        }
    }
    var lExp = ast_1.getLeftExpr(node.expression);
    if (!lExp) {
        log_1.log('Calls of non-identifier expressions are not supported', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var _b = context.scope.findByIdent(lExp.getText()) || [], decl = _b[0], declScope = _b[1], declNode = _b[2];
    if (!context.dryRun) {
        if (!decl || (declNode && !node_1.isBound(declNode))) {
            log_1.log('Call of undeclared or dropped identifier: ' + lExp.getText(), log_1.LogSeverity.ERROR, log_1.ctx(node));
        }
    }
    varsUsage_1.markUsedVars(node, lExp, usedVars, context);
    // Similar logic for similar cases, but with slight differences >_<
    if (decl && decl.flags & types_1.DeclFlag.External) {
        var prop = node.expression.name.getText();
        return context.registry.callExportedCallable(context.moduleDescriptor, decl.targetModulePath, prop, args);
    }
    else if ((decl && decl.flags & types_1.DeclFlag.DereferencedImport) ||
        (decl && (decl.flags & types_1.DeclFlag.Local && (nodeData_1.insideComponent(context.scope) || (declScope === null || declScope === void 0 ? void 0 : declScope.isRoot()))))) {
        return context.registry.callExportedCallable(context.moduleDescriptor, decl.targetModulePath, decl.propName, args);
    }
    return ident + "(" + args.join(', ') + ")";
}
exports.tCallExpression = tCallExpression;
function makeCallArgs(nodes, args) {
    var toRender = [];
    var synList = [];
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].kind === ts.SyntaxKind.SpreadElement) {
            synList = synList.concat('[' + toRender.join(', ') + ']');
            toRender = [];
            synList.push(args[i]);
        }
        else {
            toRender.push(args[i]);
        }
    }
    synList = synList.concat('[' + toRender.join(', ') + ']');
    return "array_merge(" + synList.join(', ') + ")";
}
