"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types_1 = require("../../types");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var log_1 = require("../../utils/log");
var ast_1 = require("../../utils/ast");
// Initialize react module name in current scope
function initReact(self, context) {
    if (self.flags.imports && self.flags.imports[0].propName === '*') {
        context.moduleDescriptor.registerSpecialVar('react', self.flags.imports[0].identNode.getText());
        return true;
    }
    return false;
}
exports.initReact = initReact;
var dropRender = function (node, self) {
    ast_1.flagParentOfType(self, [
        ts.SyntaxKind.VariableDeclaration,
        ts.SyntaxKind.BinaryExpression // assignment with no declaration
    ], { drop: true });
    return null;
};
var hookRenderers = {
    'useState': function (node, self, context, nodeIdent) {
        var _a;
        context.scope.addDeclaration(nodeIdent, [], { terminateGlobally: true, dryRun: context.dryRun });
        var val = renderSupportedNodes_1.renderSupportedNodes([
            (_a = self.children.find(function (c) { return c.node.kind === ts.SyntaxKind.SyntaxList; })) === null || _a === void 0 ? void 0 : _a.children[0] // recognize only 1st argument of call
        ], context)[0];
        return "[" + val + "]";
    },
    'useContext': function (node, self, context, nodeIdent) {
        log_1.log('React contexts are not supported in isomorphic components', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return dropRender(node, self, context, nodeIdent);
    },
    'useReducer': function (node, self, context, nodeIdent) {
        var _a;
        context.scope.addDeclaration(nodeIdent, [], { terminateGlobally: true, dryRun: context.dryRun });
        var val = renderSupportedNodes_1.renderSupportedNodes([
            (_a = self.children.find(function (c) { return c.node.kind === ts.SyntaxKind.SyntaxList; })) === null || _a === void 0 ? void 0 : _a.children[2] // recognize only 2nd argument of call, it's initial state
        ], context)[0];
        if (!val) {
            log_1.log('You must provide initial state to useReducer call', log_1.LogSeverity.ERROR, log_1.ctx(node));
        }
        return "[" + val + "]";
    },
    'useCallback': dropRender,
    'useMemo': dropRender,
    'useRef': dropRender,
    'useEffect': function () { return '!null'; },
    'useImperativeHandle': function () { return '!null'; },
    'useLayoutEffect': function () { return '!null'; },
    'useDebugValue': function () { return '!null'; },
};
function reactHooksSupport(context, node, self) {
    if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
        var ex = node.expression;
        var isReactMember = context.moduleDescriptor.checkSpecialVarIdentifier(ex.expression, 'react');
        if (!isReactMember) {
            return false;
        }
        if (types_1.hooksNames.includes(ex.name.getText())) {
            return hookRenderers[ex.name.getText()](node, self, context, ex.name.getText()) || false;
        }
        return false;
    }
    return types_1.hooksNames.reduce(function (acc, hook) {
        if (acc !== false) {
            return acc;
        }
        if (context.moduleDescriptor.checkSpecialVarIdentifier(node.expression, hook)) {
            return hookRenderers[hook](node, self, context, node.expression.getText()) || false;
        }
        return false;
    }, false) || false;
}
exports.reactHooksSupport = reactHooksSupport;
function registerHookInContext(name, expr, context, node) {
    types_1.hooksNames.some(function (hook) {
        if (name === hook) {
            context.moduleDescriptor.registerSpecialVar(hook, expr, node);
            return true;
        }
    });
}
function checkReactAssignment(node, context) {
    var _a;
    // Check dereferenced assignment
    if (context.moduleDescriptor.checkSpecialVarIdentifier(node.initializer, 'react')) {
        if (node.name.kind === ts.SyntaxKind.ObjectBindingPattern) {
            for (var _i = 0, _b = node.name.elements; _i < _b.length; _i++) {
                var n = _b[_i];
                registerHookInContext((n.propertyName || n.name).getText(), n.name.getText(), context, node);
            }
        }
        return true;
    }
    // Check property assignment
    if (((_a = node.initializer) === null || _a === void 0 ? void 0 : _a.kind) === ts.SyntaxKind.PropertyAccessExpression && node.name.kind === ts.SyntaxKind.Identifier) {
        var _c = node.initializer, name_1 = _c.name, expression = _c.expression;
        if (context.moduleDescriptor.checkSpecialVarIdentifier(expression, 'react')) {
            registerHookInContext(name_1.getText(), node.name.getText(), context, node);
            return true;
        }
    }
    return false;
}
exports.checkReactAssignment = checkReactAssignment;
