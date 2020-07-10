"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../utils/log");
var Context = /** @class */ (function () {
    function Context(_scope, checker, nodeFlagsStore, compilerOptions, moduleDescriptor, dryRun, baseDir, namespaces, registry, customGlobals) {
        this._scope = _scope;
        this.checker = checker;
        this.nodeFlagsStore = nodeFlagsStore;
        this.compilerOptions = compilerOptions;
        this.moduleDescriptor = moduleDescriptor;
        this.dryRun = dryRun;
        this.baseDir = baseDir;
        this.namespaces = namespaces;
        this.registry = registry;
        this.customGlobals = customGlobals;
    }
    Object.defineProperty(Context.prototype, "scope", {
        get: function () {
            return this._scope;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.pushScope = function (ownerIdent) {
        var node = this._scope.declarations.get(ownerIdent);
        if (node && node.ownedScope && this.dryRun) {
            log_1.log('Reassignment of functional scopes is not supported: ' + ownerIdent, log_1.LogSeverity.ERROR, log_1.shortCtx(this.moduleDescriptor.sourceFileName));
        }
        if (!node || node.homeScope !== this._scope) {
            return;
        }
        this._scope = node.spawnScope(this.moduleDescriptor.sourceFileName, this.dryRun);
    };
    Context.prototype.popScope = function () {
        if (!this._scope.parentScope) {
            throw new Error('Call stack got out of bounds: this should not happen and probably is a bug in transpiler');
        }
        this._scope = this._scope.parentScope;
    };
    return Context;
}());
exports.Context = Context;
