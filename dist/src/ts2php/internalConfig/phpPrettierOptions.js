"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var phpPlugin = require("@prettier/plugin-php/standalone");
exports.phpPrettierOptions = {
    plugins: [phpPlugin],
    parser: 'php',
    printWidth: 120,
    braceStyle: '1tbs'
};
