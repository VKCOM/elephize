"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types_1 = require("../types");
var log_1 = require("../utils/log");
var intrinsicElements_1 = require("../internalConfig/intrinsicElements");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tJsxSelfClosingElement(node, context) {
    var attrs = renderNodes_1.renderNode(node.attributes, context);
    if (node.tagName.kind !== ts.SyntaxKind.Identifier) {
        log_1.log('Non-identifiers are not supported as jsx elements', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    if (intrinsicElements_1.intrinsicElements[node.tagName.getText()]) {
        return "$this->h(IntrinsicElement::get(\"" + node.tagName.getText() + "\"), " + (attrs || '[]') + ", [])";
    }
    else {
        var decl = context.scope.findByIdent(node.tagName.getText());
        if (!decl) {
            log_1.log('Component identifier not declared: ' + node.tagName.getText(), log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
        }
        var declaration = decl[0];
        var component = void 0;
        if (declaration.flags & types_1.DeclFlag.External || declaration.flags & types_1.DeclFlag.DereferencedImport) {
            component = context.registry.getExportedComponent(context.moduleDescriptor, declaration.targetModulePath, node.tagName.getText());
        }
        else {
            log_1.log('Components should be extracted to separate single-class files. If this is not case, something wrong happened :(', log_1.LogSeverity.ERROR, log_1.ctx(node));
            component = '';
        }
        return "$this->h(" + component + ", " + (attrs || '[]') + ", [])";
    }
}
exports.tJsxSelfClosingElement = tJsxSelfClosingElement;
