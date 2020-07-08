"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
function sha1(str) {
    var hash = crypto.createHash('sha1');
    hash.update(str);
    return hash.digest('hex');
}
exports.sha1 = sha1;
