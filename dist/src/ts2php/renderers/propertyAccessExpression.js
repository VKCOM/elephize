"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types_1 = require("../types");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var log_1 = require("../utils/log");
var ast_1 = require("../utils/ast");
var nodeData_1 = require("../components/unusedCodeElimination/usageGraph/nodeData");
var math_1 = require("./stdlib/math");
function tPropertyAccessExpression(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var children = self.children;
            var _a = renderSupportedNodes_1.renderSupportedNodes(self.children, context), ident = _a[0], accessor = _a[1];
            if (ident === '$React' && accessor === 'createElement') {
                return '$this->h';
            }
            if (ident === '$exports' && !context.scope.getClosure().has('exports')) {
                log_1.log('You should use `export` instead of `module.exports = `', log_1.LogSeverity.ERROR, log_1.ctx(node));
                return '';
            }
            var lExp = ast_1.getLeftExpr(node.expression);
            if (lExp) {
                var decl = (context.scope.findByIdent(lExp.getText()) || [])[0];
                if (decl && decl.flags & types_1.DeclFlag.External) {
                    return context.registry.getExportedIdentifier(context.moduleDescriptor, decl.targetModulePath, node.name.text);
                }
            }
            if (accessor === 'length' && node.parent.kind !== ts.SyntaxKind.PropertyAccessExpression) {
                var type = context.checker.getTypeAtLocation(node.expression);
                if (type.isStringLiteral()
                    || context.checker.typeToString(type, node.expression, ts.TypeFormatFlags.None) === 'string') {
                    log_1.log('Converting .length to strlen(): check your encodings!', log_1.LogSeverity.WARN);
                    return "strlen(" + ident + ")";
                }
                return "count(" + ident + ")";
            }
            if (ident === '$Math') {
                switch (accessor) {
                    case 'E':
                    case 'LN2':
                    case 'LN10':
                    case 'LOG2E':
                    case 'LOG10E':
                    case 'PI':
                    case 'SQRT1_2':
                    case 'SQRT2':
                        return 'M_' + accessor;
                    default:
                        if (!math_1.supportedMathMethods.includes(accessor)) {
                            log_1.log("Math: unsupported property (" + accessor + ")", log_1.LogSeverity.ERROR, log_1.ctx(node));
                        }
                        return 'null';
                }
            }
            if (children[0].node.supported && children[0].node.builtin) {
                return ident + "::" + accessor;
            }
            if (accessor === 'children' && nodeData_1.insideComponent(context.scope)) {
                log_1.log("Accessing " + ident + ".children inside react component function: note that accessing props.children" +
                    ' won\'t work on server! Use object dereferencing instead.', log_1.LogSeverity.WARN, log_1.ctx(node));
            }
            return ident + "[\"" + accessor + "\"]";
        }
    };
}
exports.tPropertyAccessExpression = tPropertyAccessExpression;
