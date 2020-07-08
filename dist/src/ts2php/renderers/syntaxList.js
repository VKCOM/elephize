"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var ast_1 = require("../utils/ast");
function tSyntaxList(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a, _b, _c;
            self.flags.elIndex = 1; // reset index for params
            // This block is only for callback argument list!
            var parentNode = ast_1.getClosestParentOfType(self, ts.SyntaxKind.CallExpression);
            if (((_a = self.parent) === null || _a === void 0 ? void 0 : _a.node.kind) === ts.SyntaxKind.FunctionExpression || ((_b = self.parent) === null || _b === void 0 ? void 0 : _b.node.kind) === ts.SyntaxKind.ArrowFunction) {
                var children = node.getChildren().filter(function (el) { return el.kind !== ts.SyntaxKind.CommaToken; });
                switch (parentNode === null || parentNode === void 0 ? void 0 : parentNode.flags.name) {
                    case 'array_map':
                    case 'array_reduce':
                    case 'array_filter':
                    case 'array_some':
                    case 'array_find':
                        ast_1.flagParentOfType(self, [ts.SyntaxKind.CallExpression], { childCount: children.length });
                        break;
                    case 'array_foreach':
                        ast_1.flagParentOfType(self, [ts.SyntaxKind.CallExpression], { rawNodes: children });
                        break;
                    default:
                }
            }
            if ((parentNode === null || parentNode === void 0 ? void 0 : parentNode.flags.name) === 'string_split') { // Separate klutch, it should not be under function expression check
                var children = node.getChildren().filter(function (el) { return el.kind !== ts.SyntaxKind.CommaToken; });
                ast_1.flagParentOfType(self, [ts.SyntaxKind.CallExpression], { rawNodes: children });
            }
            // Declare all parameters
            if (node.parent.kind === ts.SyntaxKind.FunctionDeclaration ||
                node.parent.kind === ts.SyntaxKind.FunctionExpression ||
                node.parent.kind === ts.SyntaxKind.ArrowFunction) {
                node._children.map(ast_1.fetchAllBindingIdents)
                    .reduce(function (acc, val) { return acc.concat(val); }, []) // flatten;
                    .forEach(function (ident) { return context.scope.addDeclaration(ident.getText(), [], { terminateLocally: true, dryRun: context.dryRun }); });
            }
            var nodes = renderSupportedNodes_1.renderSupportedNodes(self.children, context);
            var delimiter = '\n';
            if (node.parent.kind === ts.SyntaxKind.CallExpression ||
                node.parent.kind === ts.SyntaxKind.ArrayLiteralExpression ||
                node.parent.kind === ts.SyntaxKind.VariableDeclarationList ||
                node.parent.kind === ts.SyntaxKind.FunctionDeclaration ||
                node.parent.kind === ts.SyntaxKind.FunctionExpression ||
                node.parent.kind === ts.SyntaxKind.ArrowFunction ||
                node.parent.kind === ts.SyntaxKind.JsxElement) {
                delimiter = ', ';
            }
            if (node.parent.kind === ts.SyntaxKind.TemplateExpression) {
                delimiter = ' . ';
            }
            if (((_c = self.parent) === null || _c === void 0 ? void 0 : _c.node.kind) === ts.SyntaxKind.VariableDeclarationList && self.parent.flags.forceType === 'split') {
                delimiter = ';\n';
            }
            if (node.parent.kind === ts.SyntaxKind.ObjectLiteralExpression || node.parent.kind === ts.SyntaxKind.JsxFragment) {
                delimiter = ',\n';
            }
            return nodes.join(delimiter);
        }
    };
}
exports.tSyntaxList = tSyntaxList;
