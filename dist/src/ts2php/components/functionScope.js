"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var ts = require("typescript");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var ast_1 = require("../utils/ast");
var reactComponents_1 = require("./react/reactComponents");
var log_1 = require("../utils/log");
function getRenderedBlock(context, nodeIdent, nodeOrig, realParent, nodes) {
    var node;
    var _a = context.scope.findByIdent(nodeIdent) || [], declScope = _a[1];
    if (declScope) {
        node = declScope.declarations.get(nodeIdent);
    }
    if (!node) {
        context.scope.addDeclaration(nodeIdent, [], { dryRun: context.dryRun });
    }
    context.pushScope(nodeIdent);
    if (realParent) {
        realParent.flags.destructuringInfo = { vars: '' }; // Reset destructuring info
    }
    var _b = renderSupportedNodes_1.renderSupportedNodes(nodes, context, false), syntaxList = _b[0], block = _b[1];
    var idMap = new Map();
    context.scope.getClosure().forEach(function (decl, ident) {
        if ((decl.flags & types_1.DeclFlag.External) && decl.propName === '*') {
            return; // imported vars should not get into closure
        }
        if (!!(decl.flags & types_1.DeclFlag.HoistedToModule)) {
            return; // module scope vars also should not get into closure
        }
        idMap.set(ident, !!(decl.flags & types_1.DeclFlag.ModifiedInLowerScope));
    });
    context.popScope();
    return { syntaxList: syntaxList, block: block, idMap: idMap };
}
exports.getRenderedBlock = getRenderedBlock;
function generateFunctionElements(_a) {
    var statement = _a.statement, expr = _a.expr, nodeIdent = _a.nodeIdent, context = _a.context, origDecl = _a.origDecl, origStatement = _a.origStatement;
    if (origDecl && origStatement) {
        var parentStmt = ast_1.getClosestOrigParentOfType(origDecl, ts.SyntaxKind.VariableStatement);
        if (parentStmt) {
            var handledContent = reactComponents_1.handleComponent(context, origStatement, expr);
            if (handledContent) {
                return null; // component is written to different file, so we should not output anything here
            }
        }
    }
    var synListNode = ast_1.getChildOfAnyTypeAfterSelected(expr, ts.SyntaxKind.OpenParenToken, [ts.SyntaxKind.SyntaxList]);
    // Fallback value for oneline arrow function cases.
    var blockNode = ast_1.getChildByType(expr, ts.SyntaxKind.Block) || ast_1.getChildOfAnyTypeAfterSelected(expr, ts.SyntaxKind.EqualsGreaterThanToken, ast_1.RightHandExpressionLike);
    var _b = getRenderedBlock(context, nodeIdent, origStatement, statement, [synListNode, blockNode]), syntaxList = _b.syntaxList, block = _b.block;
    block = unwrapArrowBody(block, blockNode);
    block = prependDestructuredParams(block, statement);
    return { syntaxList: syntaxList, block: block };
}
exports.generateFunctionElements = generateFunctionElements;
function genClosure(idMap, context, node) {
    var closureUse = [];
    idMap.forEach(function (modifiedInClosure, varName) {
        if (modifiedInClosure) {
            log_1.log("Closure-scoped variable " + varName + " has been modified inside closure, this will not work on server side", log_1.LogSeverity.ERROR, log_1.ctx(node));
            closureUse.push("/* !! MODIFIED INSIDE !! */$" + varName);
        }
        else {
            closureUse.push("$" + varName);
        }
        // Reset closure modification flag for all closure vars: they can be used in next closures without modification, and it's ok
        var decl = (context.scope.findByIdent(varName) || [])[0];
        if (decl) {
            decl.flags = decl.flags & ~types_1.DeclFlag.ModifiedInLowerScope;
        }
    });
    var closureExpr = closureUse.length > 0
        ? " use (" + closureUse.join(', ') + ")"
        : '';
    return { closureExpr: closureExpr };
}
exports.genClosure = genClosure;
function prependDestructuredParams(block, realParent) {
    var _a;
    if (!((_a = realParent.flags.destructuringInfo) === null || _a === void 0 ? void 0 : _a.vars)) {
        return block;
    }
    return block.replace(/^{/, '{\n' + realParent.flags.destructuringInfo.vars);
}
exports.prependDestructuredParams = prependDestructuredParams;
function unwrapArrowBody(block, blockNode, noReturn) {
    if (noReturn === void 0) { noReturn = false; }
    if ((blockNode === null || blockNode === void 0 ? void 0 : blockNode.node.kind) !== ts.SyntaxKind.Block) {
        return noReturn ? "{\n" + block + ";\n}" : "{\nreturn " + block + ";\n}";
    }
    return block;
}
exports.unwrapArrowBody = unwrapArrowBody;
exports.functionExpressionGen = function (node, ident, realParent) { return function (opts, context) {
    // TODO: disallow `this` in expressions
    var _a = getRenderedBlock(context, ident, node, realParent, [opts.synListNode, opts.blockNode]), syntaxList = _a.syntaxList, block = _a.block, idMap = _a.idMap;
    block = unwrapArrowBody(block, opts.blockNode);
    block = prependDestructuredParams(block, realParent);
    var closureExpr = genClosure(idMap, context, node).closureExpr;
    return "/* " + ident + " */ function (" + syntaxList + ")" + closureExpr + " " + block;
}; };
