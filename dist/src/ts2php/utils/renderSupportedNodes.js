"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderSupportedNodes(nodes, context, filterEmpty) {
    if (filterEmpty === void 0) { filterEmpty = true; }
    var list = nodes.map(function (child) {
        var _a;
        return ((_a = child === null || child === void 0 ? void 0 : child.node) === null || _a === void 0 ? void 0 : _a.supported) ? child.node.gen(child, context) : null;
    });
    if (filterEmpty) {
        return list.filter(function (child) {
            return !!child && child !== '!null';
        });
    }
    else {
        return list.map(function (child) {
            if (!child || child === '!null') {
                child = '';
            }
            return child;
        });
    }
}
exports.renderSupportedNodes = renderSupportedNodes;
