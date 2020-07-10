"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayFilter_1 = require("./arrayFilter");
var arrayFind_1 = require("./arrayFind");
var arrayForEach_1 = require("./arrayForEach");
var arrayJoin_1 = require("./arrayJoin");
var arrayMap_1 = require("./arrayMap");
var arrayPop_1 = require("./arrayPop");
var arrayPush_1 = require("./arrayPush");
var arrayReduce_1 = require("./arrayReduce");
var arraySome_1 = require("./arraySome");
var arraySplice_1 = require("./arraySplice");
var arrayStringIncludes_1 = require("./arrayStringIncludes");
var arrayStringLastIndexOf_1 = require("./arrayStringLastIndexOf");
var arrayStringIndexOf_1 = require("./arrayStringIndexOf");
var arrayStringSlice_1 = require("./arrayStringSlice");
var math_1 = require("./math");
var toString_1 = require("./toString");
var objectKeys_1 = require("./objectKeys");
var typecastConstructors_1 = require("./typecastConstructors");
var stringSplit_1 = require("./stringSplit");
var stringStartsWith_1 = require("./stringStartsWith");
var stringSubstr_1 = require("./stringSubstr");
var stringTrim_1 = require("./stringTrim");
var arrayIsArray_1 = require("./arrayIsArray");
var usageGraph_1 = require("../../components/unusedCodeElimination/usageGraph");
var varsUsage_1 = require("../../components/unusedCodeElimination/varsUsage");
var ast_1 = require("../../utils/ast");
var stdlibHooks = [
    arrayFilter_1.arrayFilter, arrayFind_1.arrayFind, arrayForEach_1.arrayForeach, arrayJoin_1.arrayJoin, arrayMap_1.arrayMap,
    arrayPop_1.arrayPop, arrayPush_1.arrayPush, arrayReduce_1.arrayReduce, arraySome_1.arraySome, arraySplice_1.arraySplice,
    arrayStringIncludes_1.arrayStringIncludes, arrayStringLastIndexOf_1.arrayStringLastIndexOf, arrayStringIndexOf_1.arrayStringIndexOf, arrayStringSlice_1.arrayStringSlice,
    math_1.math, objectKeys_1.objectKeys, toString_1.toString, stringSplit_1.stringSplit, stringStartsWith_1.stringStartsWith, stringSubstr_1.stringSubstr, stringTrim_1.stringTrim,
    arrayIsArray_1.arrayIsArray, typecastConstructors_1.typecastConstructors
];
exports.hookStdlib = function (node, context) {
    var result = undefined;
    var lExp = ast_1.getLeftExpr(node.expression);
    if (!lExp) {
        return undefined; // will be checked in base callExpression handler
    }
    var usedVars = new Set();
    var onUsage = function (ident) { return usedVars.add(ident); };
    context.scope.addEventListener(usageGraph_1.Scope.EV_USAGE, onUsage);
    stdlibHooks.some(function (hook) {
        usedVars.clear();
        result = hook(node, context);
        if (result !== undefined) {
            return true;
        }
    });
    context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, onUsage);
    varsUsage_1.markUsedVars(node, lExp, usedVars, context);
    return result;
};
