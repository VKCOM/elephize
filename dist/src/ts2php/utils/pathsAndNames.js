"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("./log");
var path = require("path");
var fs = require("fs");
function camelize(ident) {
    return ident.replace(/([a-z])_([a-z])/g, function (substring, let1, let2) { return "" + let1 + let2.toUpperCase(); });
}
exports.camelize = camelize;
function snakify(ident) {
    return ident.replace(/([a-z])([A-Z])/g, function (substring, let1, let2) { return let1 + "_" + let2.toLowerCase(); });
}
exports.snakify = snakify;
function normalizeVarName(ident) {
    return ident.startsWith('$') ? camelize(ident.substr(1)) : ident;
}
exports.normalizeVarName = normalizeVarName;
function normalizeFileExt(filename, replaceWith) {
    if (replaceWith === void 0) { replaceWith = '.php'; }
    return filename.replace(/(\.php)?\.(ts|tsx|js|jsx)$/g, replaceWith);
}
exports.normalizeFileExt = normalizeFileExt;
/**
 * Output: no leading slash!
 *
 * @param filename
 * @param baseDir
 * @param aliases
 */
function normalizeBasePath(filename, baseDir, aliases) {
    var nrm = filename
        .replace(new RegExp('^' + baseDir), '')
        .replace(/^\/+/, '');
    if (aliases) {
        for (var path_1 in aliases) {
            if (!aliases.hasOwnProperty(path_1)) {
                continue;
            }
            var alias = aliases[path_1];
            path_1 = path_1.replace(/^\/+/, '');
            if (nrm.startsWith(path_1)) {
                return nrm.replace(path_1, alias.replace(/^\/+/, ''));
            }
        }
    }
    return nrm;
}
exports.normalizeBasePath = normalizeBasePath;
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
exports.capitalize = capitalize;
function classNameFromPath(normalizedPath) {
    var _a;
    var pieces = normalizedPath.split('/');
    var fn = capitalize(((_a = pieces.pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0]) || '');
    return fn.replace(/\./g, '_') + 'Module';
}
exports.classNameFromPath = classNameFromPath;
function resolveAliasesAndPaths(targetPath, currentDir, baseDir, tsPaths, outputAliases, skipOutputAliases) {
    targetPath = targetPath.replace(/\.[jt]sx?$/, '');
    var _loop_1 = function (pathOrig) {
        if (pathOrig === '*') {
            throw new Error('Asterisk-only aliases are not supported');
        }
        var pathToTry = pathOrig.replace(/\*$/g, '');
        if (targetPath.startsWith(pathToTry)) {
            log_1.log('Trying paths for location: ' + pathToTry, log_1.LogSeverity.INFO);
            return { value: _applyOutputAliases(tsPaths[pathOrig].reduce(function (acc, name) {
                    if (acc) {
                        return acc;
                    }
                    var target = targetPath.replace(pathToTry, name.replace(/\*$/g, ''));
                    var tPath = target.startsWith('/')
                        ? target // absolute path, no need to resolve
                        : path.resolve(baseDir, target);
                    log_1.log('Trying to locate file: ' + tPath, log_1.LogSeverity.INFO);
                    var fn = _lookupFile(tPath);
                    if (fn) {
                        return fn;
                    }
                    return undefined;
                }, undefined), baseDir, outputAliases, skipOutputAliases) };
        }
    };
    for (var pathOrig in tsPaths) {
        var state_1 = _loop_1(pathOrig);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    log_1.log('Trying non-aliased path: ' + targetPath, log_1.LogSeverity.INFO);
    return _applyOutputAliases(_lookupFile(path.resolve(currentDir, targetPath)), baseDir, outputAliases, skipOutputAliases);
}
exports.resolveAliasesAndPaths = resolveAliasesAndPaths;
function _applyOutputAliases(path, baseDir, outputAliases, skip) {
    if (path === void 0) { path = ''; }
    if (!path) {
        return '';
    }
    if (skip) {
        return path;
    }
    return baseDir + Object.keys(outputAliases).reduce(function (acc, aliasKey) {
        if (acc.startsWith(aliasKey)) {
            return acc.replace(aliasKey, outputAliases[aliasKey]);
        }
        return acc;
    }, path.replace(baseDir, ''));
}
function _lookupFile(path) {
    return [
        path + '.js',
        path + '.jsx',
        path + '.ts',
        path + '.tsx',
    ].reduce(function (acc, name) {
        if (acc) {
            return acc;
        }
        if (fs.existsSync(name)) {
            return name;
        }
        return undefined;
    }, undefined);
}
