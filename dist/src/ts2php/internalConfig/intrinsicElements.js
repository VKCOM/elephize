"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iel = require("../../../data/intrinsicElements.json");
exports.intrinsicElements = {};
for (var i = 0; i < iel.length; i++) {
    exports.intrinsicElements[iel[i].tagName] = iel[i].props;
}
