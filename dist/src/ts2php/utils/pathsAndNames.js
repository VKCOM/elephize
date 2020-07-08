"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        for (var path in aliases) {
            if (!aliases.hasOwnProperty(path)) {
                continue;
            }
            var alias = aliases[path];
            path = path.replace(/^\/+/, '');
            if (nrm.startsWith(path)) {
                return nrm.replace(path, alias.replace(/^\/+/, ''));
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
