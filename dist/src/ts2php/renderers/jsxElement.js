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
var log_1 = require("../utils/log");
var intrinsicElements_1 = require("../internalConfig/intrinsicElements");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tJsxElement(node, context) {
    // opening element
    var attrs = renderNodes_1.renderNode(node.openingElement.attributes, context);
    // child nodes
    var childrenRendered = renderNodes_1.renderNodes(__spreadArrays(node.children), context);
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
exports.tJsxElement = tJsxElement;
