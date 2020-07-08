"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types_1 = require("../types");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var log_1 = require("../utils/log");
var intrinsicElements_1 = require("../internalConfig/intrinsicElements");
function tJsxElement(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            // opening element
            var _a = self.children[0].children, attrsNode = _a[2];
            var attrs = renderSupportedNodes_1.renderSupportedNodes([attrsNode], context)[0];
            // child nodes
            var childrenRendered = renderSupportedNodes_1.renderSupportedNodes(self.children[1].children, context);
            var children = childrenRendered && childrenRendered.length
                ? '[' + childrenRendered.join(', ') + ']'
                : '[]';
            if (node.openingElement.tagName.kind !== ts.SyntaxKind.Identifier) {
                log_1.log('Non-identifiers are not supported as jsx elements', log_1.LogSeverity.ERROR, log_1.ctx(node));
                return 'null';
            }
            if (intrinsicElements_1.intrinsicElements[node.openingElement.tagName.getText()]) {
                return "$this->h(IntrinsicElement::get(\"" + node.openingElement.tagName.getText().toLowerCase() + "\"), " + (attrs || '[]') + ", " + (children || '[]') + ")";
            }
            else {
                var declData = context.scope.findByIdent(node.openingElement.tagName.getText());
                if (!declData) {
                    log_1.log('Component identifier not declared: ' + node.openingElement.tagName.getText(), log_1.LogSeverity.ERROR, log_1.ctx(node));
                    return 'null';
                }
                var declaration = declData[0];
                var component = void 0;
                if (declaration.flags & types_1.DeclFlag.External || declaration.flags & types_1.DeclFlag.DereferencedImport) {
                    component = context.registry.getExportedComponent(context.moduleDescriptor, declaration.targetModulePath, node.openingElement.tagName.getText());
                }
                else {
                    log_1.log('Components should be extracted to separate single-class files. If this is not case, something wrong happened :(', log_1.LogSeverity.ERROR, log_1.ctx(node));
                    component = '';
                }
                return "$this->h(" + component + ", " + (attrs || '[]') + ", " + (children || '[]') + ")";
            }
        }
    };
}
exports.tJsxElement = tJsxElement;
