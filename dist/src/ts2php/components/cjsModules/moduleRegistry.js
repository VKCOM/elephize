"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commonjsModule_1 = require("./commonjsModule");
var log_1 = require("../../utils/log");
var reactModule_1 = require("./reactModule");
var pathsAndNames_1 = require("../../utils/pathsAndNames");
var ModuleRegistry = /** @class */ (function () {
    function ModuleRegistry(_baseDir, _aliases, _tsPaths, _namespaces) {
        this._baseDir = _baseDir;
        this._aliases = _aliases;
        this._tsPaths = _tsPaths;
        this._namespaces = _namespaces;
        /**
         * Set for making unique class names for derived components
         */
        this._registeredModuleClasses = new Set();
        /**
         * Mapping of source file name to all original and derived modules
         */
        this._sourceFilenameToModule = new Map();
        /**
         * Mapping of target file name to module instance
         */
        this._targetFilenameToModule = new Map();
        this._derivedComponentsPathMap = new Map();
        /**
         * Set for determining if a variable in module is a derived component or not;
         * We place here entries like FilePath__varName which identify the component function.
         */
        this._registeredComponents = new Set();
    }
    ModuleRegistry.prototype.clearClasses = function () {
        this._registeredModuleClasses = new Set();
    };
    ModuleRegistry.prototype.forEachModule = function (cb) {
        this._targetFilenameToModule.forEach(cb);
    };
    ModuleRegistry.prototype.getExportedIdentifier = function (forModule, targetFilename, identifier, rewriteCase) {
        if (rewriteCase === void 0) { rewriteCase = false; }
        if (!targetFilename) {
            // Dropped or ignored import
            log_1.log("Attempt to reach dropped or ignored module: " + identifier + " \n\t@ " + forModule.sourceFileName, log_1.LogSeverity.ERROR);
            return 'null';
        }
        var instance = this._getInstance(targetFilename, identifier);
        if (!instance) {
            return 'null';
        }
        forModule.registerRequiredFile(targetFilename, forModule.targetFileName, this._targetFilenameToModule.get(targetFilename));
        return instance + "->" + (rewriteCase ? pathsAndNames_1.snakify(identifier) : identifier);
    };
    ModuleRegistry.prototype.callExportedCallable = function (forModule, targetFilename, identifier, args) {
        if (!targetFilename) {
            // Dropped or ignored import
            log_1.log("Attempt to reach dropped or ignored module: " + identifier + " \n\t@ " + forModule.sourceFileName, log_1.LogSeverity.ERROR);
            return 'null';
        }
        var instance = this._getInstance(targetFilename, identifier);
        if (!instance) {
            return 'null';
        }
        forModule.registerRequiredFile(targetFilename, forModule.targetFileName, this._targetFilenameToModule.get(targetFilename));
        return instance + "->" + identifier + "(" + args.join(', ') + ")";
    };
    ModuleRegistry.prototype.getExportedComponent = function (forModule, targetFilename, identifier) {
        if (!targetFilename) {
            // Dropped or ignored import
            log_1.log("Attempt to reach dropped or ignored module: " + identifier + " \n\t@ " + forModule.sourceFileName, log_1.LogSeverity.ERROR);
            return 'null';
        }
        // component should be in another file, use derived table to determine it
        var derived = this._derivedComponentsPathMap.get(targetFilename);
        var module;
        if (derived) {
            module = this._targetFilenameToModule.get(derived);
        }
        else {
            // if targetFilename contains php module path
            module = this._targetFilenameToModule.get(targetFilename);
        }
        if (!module) {
            log_1.log("No exported component found for filename " + targetFilename, log_1.LogSeverity.WARN);
        }
        else {
            if (!derived) { // if targetFilename contains php module path
                derived = targetFilename;
            }
            forModule.registerRequiredFile(derived, forModule.targetFileName, module);
        }
        return this._getInstance(derived || targetFilename, identifier);
    };
    ModuleRegistry.prototype.registerClass = function (filepath) {
        var fullyQualifiedSourceFilename = pathsAndNames_1.resolveAliasesAndPaths(filepath, '', this._baseDir, this._tsPaths, this._aliases);
        if (!fullyQualifiedSourceFilename) {
            log_1.log("Failed to lookup file " + filepath + " [#1]", log_1.LogSeverity.ERROR);
            return null;
        }
        var className = pathsAndNames_1.classNameFromPath(fullyQualifiedSourceFilename);
        className = this._makeUniqueClassName(className);
        var newFilename = this._makeNewFileName(fullyQualifiedSourceFilename, className);
        this._registeredModuleClasses.add(className);
        var moduleDescriptor = new commonjsModule_1.CommonjsModule(className, fullyQualifiedSourceFilename, newFilename, this._namespaces);
        var mods = (this._sourceFilenameToModule.get(fullyQualifiedSourceFilename) || []).concat(moduleDescriptor);
        this._sourceFilenameToModule.set(fullyQualifiedSourceFilename, mods);
        this._targetFilenameToModule.set(newFilename, moduleDescriptor);
        return moduleDescriptor;
    };
    ModuleRegistry.prototype.isDerivedComponent = function (sourceFileName, varName) {
        return this._registeredComponents.has(sourceFileName + "__" + varName);
    };
    ModuleRegistry.prototype.deriveReactComponent = function (className, originalModule) {
        var originalIdent = className;
        this._registeredComponents.add(originalModule.sourceFileName + "__" + originalIdent);
        className = this._makeUniqueClassName(className);
        var newFilename = this._makeNewFileName(originalModule.sourceFileName, className, true);
        this._registeredModuleClasses.add(className);
        this._derivedComponentsPathMap.set(originalModule.sourceFileName, newFilename);
        var moduleDescriptor = new reactModule_1.ReactModule(className, originalModule.sourceFileName, newFilename, this._namespaces, originalIdent, originalModule);
        moduleDescriptor._specialVars = originalModule._specialVars;
        var mods = (this._sourceFilenameToModule.get(originalModule.sourceFileName) || []).concat(moduleDescriptor);
        this._sourceFilenameToModule.set(originalModule.sourceFileName, mods);
        this._targetFilenameToModule.set(newFilename, moduleDescriptor);
        return moduleDescriptor;
    };
    ModuleRegistry.prototype._makeNewFileName = function (fullyQualifiedFilename, className, addDir) {
        if (addDir === void 0) { addDir = false; }
        var name = pathsAndNames_1.normalizeFileExt(pathsAndNames_1.normalizeBasePath(fullyQualifiedFilename, this._baseDir, this._aliases));
        var pieces = name.split('/');
        var filename = (pieces.pop() || '').replace(/\.php$/, '');
        if (addDir) {
            pieces.push(filename);
        }
        pieces.push(className + '.php');
        return pieces.join('/');
    };
    ModuleRegistry.prototype._makeUniqueClassName = function (className) {
        className = pathsAndNames_1.capitalize(pathsAndNames_1.camelize(className));
        if (this._registeredModuleClasses.has(className)) {
            var ctr = 1;
            while (this._registeredModuleClasses.has(className + ctr.toString())) {
                ctr++;
            }
            return className + ctr.toString();
        }
        return className;
    };
    ModuleRegistry.prototype.toTargetPath = function (sourcePath, searchForComponent) {
        var mods = this._sourceFilenameToModule.get(sourcePath) || [];
        for (var i = 0; i < mods.length; i++) {
            if (!searchForComponent && !mods[i].isDerived) {
                return mods[i].targetFileName;
            }
            if (searchForComponent && mods[i].originalIdentName === searchForComponent) {
                return mods[i].targetFileName;
            }
        }
        return undefined;
    };
    ModuleRegistry.prototype._getInstance = function (filename, identifier) {
        var _a;
        if (!this._targetFilenameToModule.has(filename)) {
            log_1.log("Module not registered: " + filename + ", when trying to reach property " + identifier, log_1.LogSeverity.ERROR);
            return '';
        }
        return ((_a = this._targetFilenameToModule.get(filename)) === null || _a === void 0 ? void 0 : _a.className) + "::getInstance()";
    };
    return ModuleRegistry;
}());
exports.ModuleRegistry = ModuleRegistry;
