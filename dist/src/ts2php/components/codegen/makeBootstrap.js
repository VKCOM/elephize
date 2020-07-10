"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pathsAndNames_1 = require("../../utils/pathsAndNames");
function makeBootstrap(registry, baseDir, aliases) {
    var names = [];
    registry.forEachModule(function (m) {
        if (!m.isEmpty()) {
            names.push(m.targetFileName);
        }
    });
    var deps = names.map(function (fn) {
        var path = fn.replace(baseDir, '');
        var modPath = pathsAndNames_1.normalizeFileExt(pathsAndNames_1.normalizeBasePath(path, baseDir, aliases));
        return "require_once __DIR__ . \"/" + modPath + "\";";
    });
    return "<?php\nrequire_once __DIR__ . \"/builtins.php\";\n" + deps.join('\n') + "\n\n";
}
exports.makeBootstrap = makeBootstrap;
