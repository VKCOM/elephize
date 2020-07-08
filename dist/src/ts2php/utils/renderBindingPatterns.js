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
var pathsAndNames_1 = require("./pathsAndNames");
var isTopLevel_1 = require("./isTopLevel");
exports.renderPattern = function (placeholder, node, elements, identList, context) { return elements
    .filter(function (el) { return !!el; })
    .map(function (el) {
    return __assign(__assign({}, el), { initializer: el.initializer.replace(/%placeholder%/g, "$" + pathsAndNames_1.snakify(placeholder)) });
})
    .map(function (el) {
    identList.push(el.identifier);
    var ident = pathsAndNames_1.snakify(el.identifier.getText());
    if (isTopLevel_1.isTopLevel(node, context)) { // Top-level declarations transform to properties and construction initializers
        context.moduleDescriptor.addProperty('$' + ident, 'public');
        context.moduleDescriptor.addStatement("$this->" + ident + " = " + el.initializer + ";");
        return null;
    }
    else {
        return "$" + ident + " = " + el.initializer;
    }
})
    .filter(function (el) { return !!el; })
    .map(function (stmt) { return stmt + ';'; })
    .join('\n'); };
