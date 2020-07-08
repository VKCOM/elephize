"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types_1 = require("../types");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var log_1 = require("../utils/log");
var ast_1 = require("../utils/ast");
var isTopLevel_1 = require("../utils/isTopLevel");
var nodeData_1 = require("../components/unusedCodeElimination/usageGraph/nodeData");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
var renderBindingPatterns_1 = require("../utils/renderBindingPatterns");
function renderBindingElement(el, index, destructured, context) {
    if (el.kind === ts.SyntaxKind.OmittedExpression) {
        return null;
    }
    if (!el.dotDotDotToken) {
        destructured.add((el.propertyName || el.name).getText());
    }
    if (!context.dryRun && !context.scope.checkUsage(el.name.getText())) {
        // Remove unused vars declarations
        log_1.log("Dropped unused var $" + el.name.getText() + " from [out]/" + context.moduleDescriptor.targetFileName, log_1.LogSeverity.INFO);
        return null;
    }
    if (el.name.kind !== ts.SyntaxKind.Identifier) {
        log_1.log("Nested bindings are not supported: " + el.name.getText(), log_1.LogSeverity.ERROR, log_1.ctx(el));
        return null;
    }
    if (el.dotDotDotToken) {
        return {
            identifier: el.name,
            initializer: "Stdlib::objectOmit(%placeholder%, [" + Array.from(destructured.values()).map(function (el) { return "\"" + el + "\""; }).join(', ') + "])"
        };
    }
    else {
        if (el.name.getText() === 'children' && nodeData_1.insideComponent(context.scope)) {
            // We should add declaration to usage graph
            context.scope.addDeclaration('children', [], { dryRun: context.dryRun });
            // But children are passed explicitly as argument to ->render at server, so we don't render them.
            return null;
        }
        return {
            identifier: el.name,
            initializer: "%placeholder%[\"" + (el.propertyName || el.name).getText() + "\"]"
        };
    }
}
function renderElements(node, placeholder, context) {
    var destructured = new Set();
    var identList = [];
    var els = node.elements.map(function (el, index) { return renderBindingElement(el, index, destructured, context); });
    var renderedString = renderBindingPatterns_1.renderPattern(placeholder, node, els, identList, context);
    return { renderedString: renderedString, identList: identList };
}
exports.renderElements = renderElements;
function tObjectBindingPattern(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a, _b;
            var varDecl = node.parent;
            if (varDecl.kind === ts.SyntaxKind.VariableDeclaration) {
                if (((_a = varDecl.initializer) === null || _a === void 0 ? void 0 : _a.kind) === ts.SyntaxKind.Identifier) {
                    // Simple identifier, ok
                    var init = (_b = varDecl.initializer) === null || _b === void 0 ? void 0 : _b.getText();
                    if (init) {
                        var decl = (context.scope.findByIdent(init) || [])[0];
                        if (decl && decl.flags & types_1.DeclFlag.HoistedToModule) {
                            init = 'this->' + init;
                        }
                    }
                    var _c = renderElements(node, init || '[compilation error!]', context), renderedString = _c.renderedString, identList = _c.identList;
                    identList.forEach(function (ident) {
                        var _a;
                        var decl = context.scope.addDeclaration(ident.getText(), [(_a = varDecl.initializer) === null || _a === void 0 ? void 0 : _a.getText()], { terminateGlobally: ast_1.isExportedVar(ident), dryRun: context.dryRun });
                        if (decl) {
                            decl.data.flags = isTopLevel_1.isTopLevel(ident, context) ? types_1.DeclFlag.HoistedToModule : 0;
                        }
                    });
                    return renderedString;
                }
                else {
                    // Expression, make dummy var
                    var derefIdent_1 = nodeData_1.identifyAnonymousNode(node.parent.initializer);
                    var expr = ast_1.getChildChainByType(self.parent, [ast_1.RightHandExpressionLike]);
                    var usedIdents_1 = new Set();
                    var addIdent = function (ident) { return usedIdents_1.add(ident); };
                    context.scope.addEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
                    var assignment = "$" + derefIdent_1 + " = " + renderSupportedNodes_1.renderSupportedNodes([expr], context) + ";";
                    context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
                    context.scope.addDeclaration(derefIdent_1, Array.from(usedIdents_1), { dryRun: context.dryRun });
                    if (isTopLevel_1.isTopLevel(node, context)) {
                        // Must add assignment to descriptor before rendering elements to preserve dereferencing order
                        context.moduleDescriptor.addStatement(assignment);
                    }
                    var _d = renderElements(node, derefIdent_1, context), renderedString = _d.renderedString, identList = _d.identList;
                    identList.forEach(function (ident) {
                        var decl = context.scope.addDeclaration(ident.getText(), [derefIdent_1], { terminateGlobally: ast_1.isExportedVar(ident), dryRun: context.dryRun });
                        if (decl) {
                            decl.data.flags = isTopLevel_1.isTopLevel(ident, context) ? types_1.DeclFlag.HoistedToModule : 0;
                        }
                    });
                    if (isTopLevel_1.isTopLevel(node, context)) {
                        return 'null';
                    }
                    else {
                        return assignment + '\n' + renderedString;
                    }
                }
            }
            return '';
        }
    };
}
exports.tObjectBindingPattern = tObjectBindingPattern;
