"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
function getLeftExpr(exp, srcFile) {
    if (!exp) {
        return null;
    }
    var e = exp;
    while (e.kind !== ts.SyntaxKind.Identifier && e.kind) {
        if (!e.getChildren(srcFile)[0]) {
            return null;
        }
        e = e.getChildren(srcFile)[0];
    }
    return e;
}
exports.getLeftExpr = getLeftExpr;
function fetchAllBindingIdents(binding) {
    if (binding.kind === ts.SyntaxKind.Identifier) {
        return [binding];
    }
    if (binding.kind === ts.SyntaxKind.Parameter) {
        return fetchAllBindingIdents(binding.name);
    }
    if (binding.kind === ts.SyntaxKind.ObjectBindingPattern) {
        return binding.elements
            .map(function (el) { return fetchAllBindingIdents(el.name); })
            .reduce(function (acc, val) { return acc.concat(val); }, []); // flatten
    }
    if (binding.kind === ts.SyntaxKind.ArrayBindingPattern) {
        return binding.elements
            .filter(function (el) { return el.kind !== ts.SyntaxKind.OmittedExpression; })
            .map(function (el) { return fetchAllBindingIdents(el.name); })
            .reduce(function (acc, val) { return acc.concat(val); }, []); // flatten
    }
    return [];
}
exports.fetchAllBindingIdents = fetchAllBindingIdents;
/**
 * Apply flags to a closest parent of one of types listed in 'kind' parameter. Only one parent is marked!
 *
 * @param node
 * @param kind
 * @param flags
 * @param store
 */
function flagParentOfType(node, kind, flags, store) {
    while (node.kind !== ts.SyntaxKind.SourceFile) {
        if (kind.includes(node.kind)) {
            store.upsert(node, flags);
            return;
        }
        node = node.parent;
    }
}
exports.flagParentOfType = flagParentOfType;
function getClosestParentOfType(node, kind, includeSelf) {
    if (includeSelf === void 0) { includeSelf = false; }
    if (!includeSelf) {
        node = node.parent;
    }
    while (node.kind !== ts.SyntaxKind.SourceFile) {
        if (kind === node.kind) {
            return node;
        }
        node = node.parent;
    }
    return null;
}
exports.getClosestParentOfType = getClosestParentOfType;
function getClosestParentOfAnyType(node, kind, includeSelf) {
    if (includeSelf === void 0) { includeSelf = false; }
    if (!includeSelf) {
        node = node.parent;
    }
    while (node.kind !== ts.SyntaxKind.SourceFile) {
        if (kind.includes(node.kind)) {
            return node;
        }
        node = node.parent;
    }
    return null;
}
exports.getClosestParentOfAnyType = getClosestParentOfAnyType;
function getClosestParentOfTypeWithFlag(node, kind, flags, store) {
    node = node.parent; // Don't count current node!
    var _loop_1 = function () {
        var nodeFlags = store.get(node);
        if (nodeFlags &&
            kind === node.kind &&
            // this checks that element's flags have values according to all passed flags
            Object.keys(flags).reduce(function (acc, key) { return acc && flags[key] === nodeFlags[key]; }, true)) {
            return { value: node };
        }
        node = node.parent;
    };
    while (node.kind !== ts.SyntaxKind.SourceFile) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return null;
}
exports.getClosestParentOfTypeWithFlag = getClosestParentOfTypeWithFlag;
/**
 * Find node by type chain in children tree.
 * If target type is array of types, first found type will be taken.
 * @param node
 * @param types
 */
function getChildChainByType(node, types) {
    var intermediateNode = node;
    var _loop_2 = function (typeIndex) {
        var t_1 = types[typeIndex];
        intermediateNode = intermediateNode.getChildren().find(function (c) {
            if (Array.isArray(t_1)) {
                return t_1.includes(c.kind);
            }
            return c.kind === types[typeIndex];
        });
        if (!intermediateNode) {
            return { value: void 0 };
        }
    };
    for (var typeIndex = 0; typeIndex < types.length; typeIndex++) {
        var state_2 = _loop_2(typeIndex);
        if (typeof state_2 === "object")
            return state_2.value;
    }
    return intermediateNode;
}
exports.getChildChainByType = getChildChainByType;
exports.RightHandExpressionLike = [
    ts.SyntaxKind.ArrayLiteralExpression,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.BinaryExpression,
    ts.SyntaxKind.Block,
    ts.SyntaxKind.CallExpression,
    ts.SyntaxKind.ElementAccessExpression,
    ts.SyntaxKind.FalseKeyword,
    ts.SyntaxKind.Identifier,
    ts.SyntaxKind.NullKeyword,
    ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.ConditionalExpression,
    ts.SyntaxKind.ObjectLiteralExpression,
    ts.SyntaxKind.PostfixUnaryExpression,
    ts.SyntaxKind.PrefixUnaryExpression,
    ts.SyntaxKind.PropertyAccessExpression,
    ts.SyntaxKind.ParenthesizedExpression,
    ts.SyntaxKind.StringLiteral,
    ts.SyntaxKind.TemplateExpression,
    ts.SyntaxKind.TrueKeyword,
    ts.SyntaxKind.JsxFragment,
    ts.SyntaxKind.JsxElement,
    ts.SyntaxKind.JsxSelfClosingElement
    // TODO: more expressions?
];
function getCallExpressionLeftSide(node) {
    return getChildChainByType(node, [
        ts.SyntaxKind.PropertyAccessExpression,
        exports.RightHandExpressionLike
    ]);
}
exports.getCallExpressionLeftSide = getCallExpressionLeftSide;
function getCallExpressionArg(node) {
    return getChildChainByType(node, [
        ts.SyntaxKind.SyntaxList,
        exports.RightHandExpressionLike
    ]);
}
exports.getCallExpressionArg = getCallExpressionArg;
function getCallExpressionCallbackArg(node) {
    return getChildChainByType(node, [
        ts.SyntaxKind.SyntaxList,
        [
            ts.SyntaxKind.FunctionExpression,
            ts.SyntaxKind.ArrowFunction
        ]
    ]);
}
exports.getCallExpressionCallbackArg = getCallExpressionCallbackArg;
function getClosestOrigParentOfType(node, type) {
    var info = node;
    while (info) {
        if (type === info.kind) {
            return info;
        }
        info = info.parent;
    }
    return null;
}
exports.getClosestOrigParentOfType = getClosestOrigParentOfType;
function getClosestOrigParentByPredicate(node, predicate) {
    var info = node;
    while (info) {
        if (predicate(info)) {
            return info;
        }
        info = info.parent;
    }
    return null;
}
exports.getClosestOrigParentByPredicate = getClosestOrigParentByPredicate;
function isExportedVar(node) {
    var varStmt = getClosestOrigParentOfType(node, ts.SyntaxKind.VariableStatement);
    if (!varStmt) {
        return false;
    }
    return varStmt.modifiers && varStmt.modifiers.some(function (m) { return m.kind === ts.SyntaxKind.ExportKeyword; });
}
exports.isExportedVar = isExportedVar;
function isExportedFun(node) {
    var varStmt = getClosestOrigParentOfType(node, ts.SyntaxKind.FunctionDeclaration);
    if (!varStmt) {
        return false;
    }
    return varStmt.modifiers && varStmt.modifiers.some(function (m) { return m.kind === ts.SyntaxKind.ExportKeyword; });
}
exports.isExportedFun = isExportedFun;
