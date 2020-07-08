"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("./node");
var log_1 = require("../../../utils/log");
var Scope = /** @class */ (function () {
    function Scope(sourceFile, nodeDefaultData, parentScope, ownerNode) {
        var _this = this;
        /**
         * Declarations map containing all identifiers declared in current scope.
         * Identifier -> Node
         */
        this.declarations = new Map();
        /**
         * List of child scopes spawned by functional identifiers.
         */
        this.childScopes = new Set();
        /**
         * Usage data of every ident. Needed to determine all vars that should be passed in closure
         */
        this.identsUsed = new Set();
        /**
         * User hooks to collect more precise usage data in upper scopes
         */
        this.listeners = new Map();
        /**
         * Find declaration in current scope or in any of parent scopes
         * @param ident
         * @private
         */
        this._findOrInsertNode = function (ident) {
            var foundNode = (_this._findNode(ident) || [])[0];
            if (foundNode) {
                return foundNode;
            }
            var node = new node_1.BindPendingNode(ident, _this, _this._nodeDefaultData);
            _this.declarations.set(ident, node);
            _this._callListeners(Scope.EV_UNBOUND_CREATED, ident);
            return node;
        };
        this._nodeDefaultData = nodeDefaultData;
        this.parentScope = parentScope;
        this.ownerNode = ownerNode;
        this.sourceFile = sourceFile;
    }
    Object.defineProperty(Scope.prototype, "tNodeLocal", {
        get: function () {
            return this._termNodeLocalName;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Static: create new root scope with new terminal node in it.
     * Typically, you should create new scope for every module (file) being processed.
     *
     * @param nodeDefaultData  Default custom data for declarations (aka graph nodes)
     * @param sourceFile       Path to processed source file
     * @param globalsList      Global vars that should be terminated to global scope
     */
    Scope.newRootScope = function (nodeDefaultData, sourceFile, globalsList) {
        if (globalsList === void 0) { globalsList = []; }
        var scope = new Scope(sourceFile, nodeDefaultData);
        scope._termNodeLocalName = Scope.tNode; // For root scope, local and global termination nodes are the same node.
        var terminalNode = new node_1.BoundNode(Scope.tNode, scope, nodeDefaultData);
        scope.declarations.set(Scope.tNode, terminalNode);
        // Don't set dryRun here, because newRootScope is expected to be called only once before any runs
        globalsList.forEach(function (ident) { return scope.addDeclaration(ident, [], { terminateGlobally: true, dryRun: true }); });
        return scope;
    };
    Scope.prototype.addEventListener = function (event, cb) {
        var _a;
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.add(cb);
    };
    Scope.prototype.removeEventListener = function (event, cb) {
        var _a;
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.delete(cb);
    };
    Scope.prototype._callListeners = function (event, ident) {
        var listeners = this.listeners.get(event);
        if (!listeners) {
            return;
        }
        listeners.forEach(function (cb) { return cb(ident); });
    };
    Scope.prototype.isRoot = function () {
        return this.localTerminalNode === this.terminalNode;
    };
    Scope.prototype.findByIdent = function (ident) {
        var _a = this._findNode(ident) || [], foundNode = _a[0], scope = _a[1];
        if (foundNode && scope) {
            return [foundNode.data, scope, foundNode];
        }
        return null;
    };
    Scope.prototype.getClosure = function () {
        var _this = this;
        var idents = new Map();
        var currentScope = this.parentScope; // Start with parent scope - because we don't need vars declared in current scope.
        while (currentScope) {
            this.identsUsed.forEach(function (node) {
                if (node.homeScope !== _this) {
                    idents.set(node.ident, node.data);
                }
            });
            currentScope = currentScope.parentScope;
        }
        return idents;
    };
    Scope.prototype._findNode = function (ident) {
        var scope = this;
        while (scope) {
            if (scope.declarations.has(ident)) {
                return [scope.declarations.get(ident), scope];
            }
            scope = scope.parentScope;
        }
        return null;
    };
    /**
     * Create new child scope and return it.
     * Should not be used by hand, use Node.spawnScope() instead.
     */
    Scope.prototype._addChildScope = function (sourceFile, ownerNode) {
        var child = new Scope(sourceFile, this._nodeDefaultData, this, ownerNode);
        child._termNodeLocalName = '__#retval@' + ownerNode.ident;
        var terminalNode = new node_1.BoundNode(child.tNodeLocal, child, this._nodeDefaultData);
        child.declarations.set(Scope.tNode, this.terminalNode);
        child.declarations.set(child.tNodeLocal, terminalNode);
        this.childScopes.add(child);
        return child;
    };
    Scope.prototype._logAction = function (action, traceSourceIdent, dryRun, traceTargetIdents, terminateLocally, terminateGlobally) {
        if (!(log_1.log.verbosity & log_1.LogVerbosity.WITH_ELIMINATION_HINTS)) {
            return;
        }
        var tgtIdents = traceTargetIdents.filter(function (id) { return !!id; });
        if (terminateGlobally) {
            tgtIdents.push(Scope.tNode);
        }
        if (terminateLocally) {
            tgtIdents.push(this.tNodeLocal);
        }
        log_1.log("[" + (dryRun ? 'D' : ' ') + "] " + action + ": " + traceSourceIdent + " -> [" + tgtIdents.join(', ') + "]", log_1.LogSeverity.INFO);
    };
    /**
     * Add declaration of identifier to current scope
     *
     * @param traceSourceIdent  Identifier: variable or function name
     * @param traceTargetIdents  What other identifiers are used to compute value.
     *                        All identifiers in expressions, all function args should be here.
     * @param terminateGlobally  Set this to true if variable or function is used in library methods or is exported
     * @param terminateLocally  Set this to true if variable or result of function call is returned as result.
     * @param dryRun  First pass of codegen?
     */
    Scope.prototype.addDeclaration = function (traceSourceIdent, traceTargetIdents, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.terminateGlobally, terminateGlobally = _c === void 0 ? false : _c, _d = _b.terminateLocally, terminateLocally = _d === void 0 ? false : _d, _e = _b.dryRun, dryRun = _e === void 0 ? false : _e;
        var node;
        var pendingNode = this.declarations.get(traceSourceIdent);
        if (dryRun) {
            this._logAction('Add declaration', traceSourceIdent, dryRun, traceTargetIdents, terminateLocally, terminateGlobally);
            if (pendingNode && !node_1.isPending(pendingNode)) {
                log_1.log("Identifier " + traceSourceIdent + " already declared @ " + pendingNode.homeScope.tNodeLocal, log_1.LogSeverity.ERROR, log_1.shortCtx(this.sourceFile));
                return null;
            }
        }
        else {
            if (!pendingNode) {
                log_1.log("No identifier " + traceSourceIdent + " declared while unused vars elimination: it's probably a bug in transpiler", log_1.LogSeverity.ERROR, log_1.shortCtx(this.sourceFile));
                return null;
            }
            if (node_1.isPending(pendingNode)) {
                log_1.log("Node " + traceSourceIdent + " was not bound while unused vars elimination: it's probably a bug in transpiler", log_1.LogSeverity.ERROR, log_1.shortCtx(this.sourceFile));
                return null;
            }
            return pendingNode;
        }
        // We should pass here only in dry run with pending or undefined node
        var traceTargetNodes = traceTargetIdents.filter(function (s) { return !!s; }).map(this._findOrInsertNode);
        if (pendingNode) {
            if (!node_1.isPending(pendingNode)) {
                return pendingNode;
            }
            node = pendingNode.latebind(traceTargetNodes);
            this.identsUsed.delete(pendingNode);
            this.identsUsed.add(node);
            this.declarations.set(traceSourceIdent, node);
            this._callListeners(Scope.EV_BIND_UNBOUND, traceSourceIdent);
        }
        else {
            node = new node_1.BoundNode(traceSourceIdent, this, this._nodeDefaultData, traceTargetNodes);
            this.declarations.set(traceSourceIdent, node);
            this._callListeners(Scope.EV_DECL, traceSourceIdent);
        }
        if (terminateGlobally) {
            this.terminalNode.addEdgeTo(node);
        }
        if (terminateLocally) {
            this.localTerminalNode.addEdgeTo(node);
        }
        return node;
    };
    /**
     * Add usage of identifier to current scope
     *
     * @param traceSourceIdent  Identifier: variable or function name
     * @param traceTargetIdents  What other identifiers are used to compute value.
     *                          All identifiers in expressions, all function args should be here.
     * @param terminateGlobally  Set this to true if variable or function is used in library methods
     * @param terminateLocally  Set this to true if variable or result of function call is returned as result.
     * @param dryRun  First pass of codegen?
     */
    Scope.prototype.addUsage = function (traceSourceIdent, traceTargetIdents, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.terminateGlobally, terminateGlobally = _c === void 0 ? false : _c, _d = _b.terminateLocally, terminateLocally = _d === void 0 ? false : _d, _e = _b.dryRun, dryRun = _e === void 0 ? false : _e;
        if (!dryRun) {
            // We don't add usages on non-dry run, it's pointless
            return;
        }
        this._logAction('Add usage', traceSourceIdent, dryRun, traceTargetIdents, terminateLocally, terminateGlobally);
        var traceSourceNode = this._findOrInsertNode(traceSourceIdent);
        this.identsUsed.add(traceSourceNode);
        this._callListeners(Scope.EV_USAGE, traceSourceIdent);
        if (terminateGlobally) {
            this.terminalNode.addEdgeTo(traceSourceNode);
        }
        if (terminateLocally) {
            this.localTerminalNode.addEdgeTo(traceSourceNode);
        }
        traceTargetIdents
            .map(this._findOrInsertNode)
            .forEach(function (n) { return traceSourceNode.addEdgeTo(n); });
    };
    Scope.prototype.terminateCall = function (traceTargetIdent, _a) {
        var _b = _a === void 0 ? {} : _a, traceSourceIdent = _b.traceSourceIdent, _c = _b.dryRun, dryRun = _c === void 0 ? false : _c;
        if (!dryRun) {
            // We don't add usages on non-dry run, it's pointless
            return;
        }
        if (!traceSourceIdent) {
            traceSourceIdent = this.tNodeLocal;
        }
        this._logAction('Terminate call', traceSourceIdent, dryRun, [traceTargetIdent], false, false);
        var traceTargetNode = this._findOrInsertNode(traceTargetIdent);
        var traceSourceNode = this._findOrInsertNode(traceSourceIdent);
        traceSourceNode.addEdgeTo(traceTargetNode);
    };
    /**
     * Used in components to attach component's return node to parent return node
     * @param dryRun
     */
    Scope.prototype.terminateToParentTerminalNode = function (dryRun) {
        if (dryRun === void 0) { dryRun = false; }
        var _a, _b;
        if (!dryRun) {
            return;
        }
        this._logAction('Terminate scope to local', ((_a = this.parentScope) === null || _a === void 0 ? void 0 : _a.tNodeLocal) || '', dryRun, [this.tNodeLocal], false, false);
        var traceSourceNode = (_b = this.parentScope) === null || _b === void 0 ? void 0 : _b.localTerminalNode;
        if (!traceSourceNode) {
            log_1.log('Trying to terminate root node to upper scope - this is error in transpiler', log_1.LogSeverity.ERROR, log_1.shortCtx(this.sourceFile));
            return;
        }
        var traceTargetNode = this.localTerminalNode;
        traceSourceNode.addEdgeTo(traceTargetNode);
    };
    /**
     * Reset usage flags for all nodes in all child scopes and current scope
     */
    Scope.prototype.reset = function () {
        if (this.parentScope) {
            log_1.log('reset() is not intended to be used with non-root scope', log_1.LogSeverity.ERROR, log_1.shortCtx(this.sourceFile));
            return;
        }
        this.declarations.forEach(function (node) { return node.reset(); });
        this.childScopes.forEach(function (scope) { return scope.reset(); });
    };
    Object.defineProperty(Scope.prototype, "terminalNode", {
        /**
         * Get global terminal node
         * Terminal nodes are always early-bound
         */
        get: function () {
            return this.declarations.get(Scope.tNode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scope.prototype, "localTerminalNode", {
        /**
         * Get local terminal node
         * Terminal nodes are always early-bound
         */
        get: function () {
            return this.declarations.get(this.tNodeLocal);
        },
        enumerable: true,
        configurable: true
    });
    Scope.prototype.checkUsage = function (varName) {
        var _a;
        if (Scope._forceDisableUnusedVarsElimination) {
            return true;
        }
        return !!(this.declarations.has(varName) && ((_a = this.declarations.get(varName)) === null || _a === void 0 ? void 0 : _a.used));
    };
    Scope._forceDisableUnusedVarsElimination = false;
    Scope.EV_USAGE = 'usage';
    Scope.EV_DECL = 'declaration';
    Scope.EV_UNBOUND_CREATED = 'unbound_created';
    Scope.EV_BIND_UNBOUND = 'bind_unbound';
    /**
     * Identifier for terminal node. There should be no other variables or functions with this name.
     * Global terminal node is copied to every child scope by reference.
     */
    Scope.tNode = '__#global_terminal__';
    return Scope;
}());
exports.Scope = Scope;
