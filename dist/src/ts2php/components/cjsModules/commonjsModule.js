"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var log_1 = require("../../utils/log");
var CommonjsModule = /** @class */ (function () {
    function CommonjsModule(className, sourceFileName, targetFileName, _namespaces, originalIdentName, ancestorModule) {
        this.className = className;
        this.sourceFileName = sourceFileName;
        this.targetFileName = targetFileName;
        this._namespaces = _namespaces;
        this.originalIdentName = originalIdentName;
        this.ancestorModule = ancestorModule;
        this.isDerived = false;
        this._hoistedContent = new Set();
        this._requiredFiles = new Map();
        this._constructorStatements = [];
        this._specialVars = {};
    }
    // For removing dupes during second pass of codegen
    // TODO: maybe we can do it some other way than two-pass?
    CommonjsModule.prototype.clearStatements = function () {
        this._constructorStatements = [];
        this._hoistedContent = new Set();
        this._specialVars = {};
    };
    CommonjsModule.prototype.addProperty = function (identifier, visibility) {
        if (visibility === void 0) { visibility = 'public'; }
        this._hoistedContent.add(visibility + " " + identifier + ";");
    };
    CommonjsModule.prototype.addMethod = function (identifier, block, args, visibility) {
        if (visibility === void 0) { visibility = 'public'; }
        this._hoistedContent.add(visibility + " function " + identifier + "(" + args + ") " + block);
    };
    CommonjsModule.prototype.addStatement = function (statement) {
        this._constructorStatements.push(statement);
    };
    CommonjsModule.prototype.registerSpecialVar = function (kind, name, node) {
        if (this._specialVars[kind] && this._specialVars[kind] !== name) {
            log_1.log("Duplicate special variable assignment: " + kind + " := " + name, log_1.LogSeverity.ERROR, node && log_1.ctx(node));
        }
        this._specialVars[kind] = name;
    };
    CommonjsModule.prototype.registerRequiredFile = function (path, currentModulePath, originalModule) {
        if (path === currentModulePath || !originalModule) {
            return;
        }
        path = path.replace(/\.[jt]sx?$/, '.php');
        currentModulePath = currentModulePath.replace(/\.[jt]sx?$/, '.php');
        // Normalize relative path first
        var piecesTarget = path.split('/');
        var piecesCurrent = currentModulePath.split('/');
        while (piecesTarget[0] === piecesCurrent[0]) {
            piecesTarget.shift();
            piecesCurrent.shift();
        }
        var relpath;
        if (piecesCurrent.length === 1 && piecesTarget.length === 1) {
            // Files in same folder
            relpath = piecesTarget[0];
        }
        else {
            relpath = '../'.repeat(piecesCurrent.length - 1) + piecesTarget.join('/');
        }
        this._requiredFiles.set(relpath, originalModule);
    };
    CommonjsModule.prototype.checkSpecialVarIdentifier = function (node, kind) {
        return !!(node && node.kind === ts.SyntaxKind.Identifier && this._specialVars[kind] === node.getText());
    };
    CommonjsModule.prototype.isEmpty = function () {
        return this._hoistedContent.size === 0 && this._constructorStatements.length === 0;
    };
    CommonjsModule.prototype._getRequiredFiles = function () {
        var requires = [];
        this._requiredFiles.forEach(function (mod, filename) {
            if (!mod.isEmpty()) {
                requires.push(filename);
            }
        });
        return requires.map(function (f) { return "require_once __DIR__ . '/" + f + "';"; }).join('\n');
    };
    CommonjsModule.prototype.generateContent = function () {
        return "<?php\nuse " + this._namespaces.builtins + "\\Stdlib;\nuse " + this._namespaces.builtins + "\\CJSModule;\n\n" + this._getRequiredFiles() + "\n\nclass " + this.className + " extends CJSModule {\n    /**\n     * @var " + this.className + " $_mod\n     */\n    private static $_mod;\n    public static function getInstance(): " + this.className + " {\n        if (!self::$_mod) {\n            self::$_mod = new " + this.className + "();\n        }\n        return self::$_mod;\n    }\n    \n    " + Array.from(this._hoistedContent.values()).join('\n') + "\n    \n    private function __construct() {\n        " + this._constructorStatements.join('\n') + "\n    }\n}\n";
    };
    return CommonjsModule;
}());
exports.CommonjsModule = CommonjsModule;
