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
Object.defineProperty(exports, "__esModule", { value: true });
var commonjsModule_1 = require("./commonjsModule");
var log_1 = require("../../utils/log");
var ReactModule = /** @class */ (function (_super) {
    __extends(ReactModule, _super);
    function ReactModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDerived = true;
        _this._phpdoc = [];
        return _this;
    }
    ReactModule.prototype.setArgs = function (args) {
        // Support different var name for props:
        if (args === '') {
            args = '$props'; // Fallback: we should have props at out render method to comply with base class
            this._phpdoc = ['\t * @param array $props'];
        }
        else {
            this._phpdoc = args.split(', ').map(function (v) { return "\t * @param array " + v; });
            if (this._phpdoc.length > 1) {
                // We dont support react context
                log_1.log('React context is not supported (passed as 2nd argument)', log_1.LogSeverity.ERROR, log_1.shortCtx(this.sourceFileName));
            }
        }
        this.args = args;
    };
    ReactModule.prototype.setBlock = function (block) {
        this.block = block;
    };
    ReactModule.prototype.isEmpty = function () {
        return false; // block is never empty
    };
    ReactModule.prototype.generateContent = function () {
        return "<?php\nuse " + this._namespaces.builtins + "\\RenderableComponent;\nuse " + this._namespaces.builtins + "\\IntrinsicElement;\nuse " + this._namespaces.builtins + "\\Stdlib;\n\n" + this._getRequiredFiles() + "\n\nclass " + this.className + " extends RenderableComponent {\n    /**\n     * @var " + this.className + " $_mod\n     */\n    private static $_mod;\n    public static function getInstance(): " + this.className + " {\n        if (!self::$_mod) {\n            self::$_mod = new " + this.className + "();\n        }\n        return self::$_mod;\n    }\n    \n    " + Array.from(this._hoistedContent.values()).join('\n') + "\n    \n    private function __construct() {\n        " + this._constructorStatements.join('\n') + "\n    }\n    \n    /**\n    " + this._phpdoc.join('\n') + "\n     * @param array $children\n     * @return string\n     */\n    public function render(array " + this.args + ", array $children) " + this.block + "\n}\n";
    };
    return ReactModule;
}(commonjsModule_1.CommonjsModule));
exports.ReactModule = ReactModule;
