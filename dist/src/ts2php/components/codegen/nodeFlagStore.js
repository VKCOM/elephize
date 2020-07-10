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
var NodeFlagStore = /** @class */ (function () {
    function NodeFlagStore() {
        this._store = new WeakMap();
    }
    NodeFlagStore.prototype.clear = function () {
        this._store = new WeakMap();
    };
    NodeFlagStore.prototype.get = function (node) {
        return this._store.get(node);
    };
    NodeFlagStore.prototype.upsert = function (node, flagsToAdd) {
        var val = this._store.get(node);
        if (!val) {
            val = __assign({}, flagsToAdd);
        }
        else {
            val = __assign(__assign({}, val), flagsToAdd);
        }
        this._store.set(node, val);
        return val;
    };
    return NodeFlagStore;
}());
exports.NodeFlagStore = NodeFlagStore;
