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
 * @param info
 * @param kind
 * @param flags
 */
function flagParentOfType(info, kind, flags) {
    while (info) {
        if (kind.includes(info.node.kind)) {
            info.flags = __assign(__assign({}, info.flags), flags);
            return;
        }
        info = info.parent;
    }
}
exports.flagParentOfType = flagParentOfType;
function getClosestParentOfType(info, kind, includeSelf) {
    if (includeSelf === void 0) { includeSelf = false; }
    if (!includeSelf) {
        info = info.parent;
    }
    while (info) {
        if (kind === info.node.kind) {
            return info;
        }
        info = info.parent;
    }
    return null;
}
exports.getClosestParentOfType = getClosestParentOfType;
function getClosestParentOfAnyType(info, kind, includeSelf) {
    if (includeSelf === void 0) { includeSelf = false; }
    if (!includeSelf) {
        info = info.parent;
    }
    while (info) {
        if (kind.includes(info.node.kind)) {
            return info;
        }
        info = info.parent;
    }
    return null;
}
exports.getClosestParentOfAnyType = getClosestParentOfAnyType;
function getClosestParentOfTypeWithFlag(info, kind, flags) {
    info = info.parent; // Don't count current node!
    while (info) {
        if (kind === info.node.kind &&
            // this checks that element's flags have values according to all passed flags
            Object.keys(flags).reduce(function (acc, key) { return acc && flags[key] === info.flags[key]; }, true)) {
            return info;
        }
        info = info.parent;
    }
    return null;
}
exports.getClosestParentOfTypeWithFlag = getClosestParentOfTypeWithFlag;
/**
 * Return first child of given type
 *
 * @param node
 * @param type
 * @return NodeInfo | undefined
 */
function getChildByType(node, type) {
    return node.children.find(function (c) { return c.node.kind === type; });
}
exports.getChildByType = getChildByType;
/**
 * Find node by type chain in children tree.
 * If target type is array of types, first found type will be taken.
 * @param node
 * @param types
 */
function getChildChainByType(node, types) {
    var intermediateNode = node;
    var _loop_1 = function (typeIndex) {
        var t_1 = types[typeIndex];
        intermediateNode = intermediateNode.children.find(function (c) {
            if (Array.isArray(t_1)) {
                return t_1.includes(c.node.kind);
            }
            return c.node.kind === types[typeIndex];
        });
        if (!intermediateNode) {
            return { value: void 0 };
        }
    };
    for (var typeIndex = 0; typeIndex < types.length; typeIndex++) {
        var state_1 = _loop_1(typeIndex);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return intermediateNode;
}
exports.getChildChainByType = getChildChainByType;
/**
 * Return naive array of children of given types
 *
 * @param node
 * @param types
 * @return Array<NodeInfo>
 */
function getChildrenByTypes(node, types) {
    var ret = [];
    var typeIndex = 0;
    for (var i = 0; i < node.children.length; i++) {
        if (node.children[i].node.kind === types[typeIndex]) {
            ret.push(node.children[i]);
            typeIndex++;
        }
    }
    return ret;
}
exports.getChildrenByTypes = getChildrenByTypes;
/**
 * Return child matching one of selected types
 *
 * @param node
 * @param types
 * @return NodeInfo | undefined
 */
function getChildByAnyType(node, types) {
    for (var i = 0; i < node.children.length; i++) {
        if (types.includes(node.children[i].node.kind)) {
            return node.children[i];
        }
    }
    return undefined;
}
exports.getChildByAnyType = getChildByAnyType;
/**
 * Return child matching one of selected types following the specified type of child
 * @param node
 * @param marker
 * @param types
 * @return NodeInfo | undefined
 */
function getChildOfAnyTypeAfterSelected(node, marker, types) {
    for (var i = 0; i < node.children.length; i++) {
        if (types.includes(node.children[i].node.kind) && (node.children[i - 1] && node.children[i - 1].node.kind === marker)) {
            return node.children[i];
        }
    }
    return undefined;
}
exports.getChildOfAnyTypeAfterSelected = getChildOfAnyTypeAfterSelected;
/**
 * Get nodes from tree by tree-like selector
 * See example in unit-tests.
 *
 * @param node
 * @param selector
 */
function getChildrenByTree(node, selector) {
    var nextIndexToSeek = 0;
    var ret = [];
    for (var i = 0; i < selector.length; i++) {
        var t_2 = selector[i];
        if (Array.isArray(t_2)) { // tuple, drill down
            var childType = t_2[0], nestedSelector = t_2[1];
            for (var i_1 = nextIndexToSeek; i_1 < node.children.length; i_1++) {
                if (node.children[i_1].node.kind === childType) {
                    ret.push(getChildrenByTree(node.children[i_1], nestedSelector));
                    nextIndexToSeek = i_1 + 1;
                    break;
                }
            }
        }
        else {
            for (var i_2 = nextIndexToSeek; i_2 < node.children.length; i_2++) {
                if (node.children[i_2].node.kind === t_2) {
                    ret.push(node.children[i_2]);
                    nextIndexToSeek = i_2 + 1;
                    break;
                }
            }
        }
    }
    return ret;
}
exports.getChildrenByTree = getChildrenByTree;
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
function getCallExpressionLeftSide(self) {
    return getChildChainByType(self, [
        ts.SyntaxKind.PropertyAccessExpression,
        exports.RightHandExpressionLike
    ]);
}
exports.getCallExpressionLeftSide = getCallExpressionLeftSide;
function getCallExpressionArg(self) {
    return getChildChainByType(self, [
        ts.SyntaxKind.SyntaxList,
        exports.RightHandExpressionLike
    ]);
}
exports.getCallExpressionArg = getCallExpressionArg;
function getCallExpressionCallbackArg(self) {
    return getChildChainByType(self, [
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
/**
 * Debug only dumper
 *
 * @param node
 * @param index
 * @param level
 */
function dumpKindTree(node, index, level) {
    if (index === void 0) { index = -1; }
    if (level === void 0) { level = 1; }
    if (level === 1) {
        process.stdout.write('---------' + '\n');
    }
    process.stdout.write('> '.repeat(level) + ts.SyntaxKind[node.node.kind] + ("[" + (index || '0') + "] \n"));
    node.children.forEach(function (child, index) { return dumpKindTree(child, index, level + 1); });
}
exports.dumpKindTree = dumpKindTree;
