"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var scope_1 = require("./scope");
var log_1 = require("../../../utils/log");
exports.isBound = function (node) { return node._type === 'early_bound'; };
exports.isPending = function (node) { return node._type === 'late_bound'; };
var ScopeNode = /** @class */ (function () {
    function ScopeNode(ident, homeScope, data) {
        this._type = 'abstract';
        /**
         * Edges list: contains nodes connected to current node. Directed.
         */
        this._edges = new Set();
        /**
         * Traverse mark: common flag, used in DFS
         */
        this._traverseMark = false;
        /**
         * Flag for usage mark
         * True if current identifier is used by some other identifier or by terminal node
         */
        this._usageMark = false;
        this.ident = ident;
        this.homeScope = homeScope;
        this.data = __assign({}, data);
    }
    ScopeNode.prototype.spawnScope = function (sourceFile, dryRun) {
        throw new Error((dryRun ? '[dry]' : '') + 'Can\'t spawn new scope on unbound node!');
    };
    /**
     *
     * @param node
     * @private
     */
    ScopeNode.prototype._genCharString = function (node) {
        return node.ident + "[" + (node._type === 'early_bound' ? 'B' : 'b') + (node.used ? 'U' : 'u') + "]";
    };
    /**
     * Small letters indicate false boolean flag, capitals indicate true
     * B: bound
     * U: used
     */
    ScopeNode.prototype.toString = function () {
        var _this = this;
        return this._genCharString(this) +
            ("\n\t-> [ " + Array.from(this._edges).map(function (n) { return _this._genCharString(n); }).join(', ') + " ]");
    };
    /**
     * Add dependency: current node depends on given node (uses it somehow).
     * @param node
     */
    ScopeNode.prototype.addEdgeTo = function (node) {
        if (exports.isBound(node) && node._ownedScope) {
            this._edges.add(node._ownedScope.localTerminalNode); // for proper handling of return instructions
        }
        if (exports.isPending(node)) {
            node.revdep(this);
        }
        this._edges.add(node);
    };
    /**
     * Remove dependency of this node on some another node
     * @param node
     */
    ScopeNode.prototype.removeEdgeTo = function (node) {
        if (exports.isBound(node) && node._ownedScope) {
            this._edges.delete(node._ownedScope.localTerminalNode); // for proper handling of return instructions
        }
        this._edges.delete(node);
    };
    /**
     * Simple DFS with marks
     * @param cb
     * @param traversedNodeList
     * @param bailOnUnbound
     * @private
     */
    ScopeNode.prototype._traverse = function (cb, traversedNodeList, bailOnUnbound) {
        var _this = this;
        this._edges.forEach(function (node) {
            if (bailOnUnbound && !exports.isBound(node)) {
                log_1.log("Identifier \"" + node.ident + "\" was used but was never declared. This is compile error", log_1.LogSeverity.ERROR, log_1.shortCtx(_this.homeScope.sourceFile));
                return;
            }
            if (node._traverseMark) {
                return;
            }
            node._traverseMark = true;
            traversedNodeList.add(node);
            if (cb(node)) {
                node._traverse(cb, traversedNodeList, bailOnUnbound);
            }
        });
    };
    /**
     * Traverse usage graph with DFS and then reset traverse
     * marks to ensure proper work of following traversals.
     * @param cb
     * @param bail
     */
    ScopeNode.prototype.traverse = function (cb, bail) {
        if (bail === void 0) { bail = true; }
        var nodeList = new Set();
        this._traverse(cb, nodeList, bail);
        nodeList.forEach(function (node) { return node._traverseMark = false; }); // reset traverse marks
    };
    ScopeNode.prototype._dump = function (printer) {
        if (printer === void 0) { printer = console.log; }
        printer(this.toString());
        return this.traverse(function (node) {
            printer(node.toString());
            return true;
        }, false);
    };
    Object.defineProperty(ScopeNode.prototype, "used", {
        get: function () { return this._usageMark; },
        enumerable: true,
        configurable: true
    });
    ScopeNode.prototype._markUsed = function () {
        if (log_1.log.verbosity & log_1.LogVerbosity.WITH_USAGE_GRAPH_DUMP) {
            log_1.log('Marking node as used: ' + this.ident, log_1.LogSeverity.INFO);
        }
        this._usageMark = true;
    };
    ScopeNode.prototype.reset = function () {
        if (log_1.log.verbosity & log_1.LogVerbosity.WITH_USAGE_GRAPH_DUMP) {
            log_1.log('Resetting node usage: ' + this.ident, log_1.LogSeverity.INFO);
        }
        this._usageMark = false;
    };
    /**
     * Call this method on terminal node to travers and mark all used identifiers in all scopes.
     * Use homeScope.reset() to uncheck usage marks
     */
    ScopeNode.prototype.markUsage = function () {
        var _this = this;
        if (this.ident !== scope_1.Scope.tNode) {
            log_1.log('Mark usage method is not expected to be applied to non-terminal nodes', log_1.LogSeverity.ERROR, log_1.shortCtx(this.homeScope.sourceFile));
            return;
        }
        if (exports.isBound(this)) {
            this._markUsed();
        }
        else {
            log_1.log("Undeclared or dropped identifier encountered: " + this.ident, log_1.LogSeverity.ERROR, log_1.shortCtx(this.homeScope.sourceFile));
        }
        this.traverse(function (node) {
            if (exports.isBound(node)) {
                node._markUsed();
            }
            else {
                log_1.log("Undeclared or dropped identifier encountered: " + node.ident, log_1.LogSeverity.ERROR, log_1.shortCtx(_this.homeScope.sourceFile));
            }
            return true;
        });
    };
    return ScopeNode;
}());
exports.ScopeNode = ScopeNode;
var BoundNode = /** @class */ (function (_super) {
    __extends(BoundNode, _super);
    function BoundNode(ident, homeScope, data, traceTargetNodes) {
        if (traceTargetNodes === void 0) { traceTargetNodes = []; }
        var _this = _super.call(this, ident, homeScope, data) || this;
        _this._type = 'early_bound';
        traceTargetNodes.forEach(function (node) { return _this.addEdgeTo(node); });
        return _this;
    }
    Object.defineProperty(BoundNode.prototype, "ownedScope", {
        /**
         * Get scope created by this identifier
         */
        get: function () {
            return this._ownedScope;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create scope for this identifier.
     * Equivalent to adding new stack frame to the call stack.
     */
    BoundNode.prototype.spawnScope = function (sourceFile, dryRun) {
        if (dryRun) {
            this._ownedScope = this.homeScope._addChildScope(sourceFile, this);
        } // else: owned scope is expected to already exist
        if (!this._ownedScope) {
            throw new Error('Failed to get owned scope!');
        }
        return this._ownedScope;
    };
    return BoundNode;
}(ScopeNode));
exports.BoundNode = BoundNode;
// Late-bound graph node
var BindPendingNode = /** @class */ (function (_super) {
    __extends(BindPendingNode, _super);
    function BindPendingNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._type = 'late_bound';
        _this._tmpTraceTargetNodes = new Set();
        return _this;
    }
    BindPendingNode.prototype.revdep = function (node) {
        this._tmpTraceTargetNodes.add(node);
    };
    BindPendingNode.prototype.latebind = function (traceTargetNodes) {
        var _this = this;
        var node = new BoundNode(this.ident, this.homeScope, this.data, Array.from(this._edges).concat(traceTargetNodes));
        this._tmpTraceTargetNodes.forEach(function (n) {
            n.removeEdgeTo(_this);
            n.addEdgeTo(node);
        });
        return node;
    };
    return BindPendingNode;
}(ScopeNode));
exports.BindPendingNode = BindPendingNode;
