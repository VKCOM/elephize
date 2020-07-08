"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tNotToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '!'; }
    };
}
exports.tNotToken = tNotToken;
function tPlusPlusToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '++'; }
    };
}
exports.tPlusPlusToken = tPlusPlusToken;
function tMinusMinusToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '--'; }
    };
}
exports.tMinusMinusToken = tMinusMinusToken;
function tPlusToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '+'; }
    };
}
exports.tPlusToken = tPlusToken;
function tMinusToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '-'; }
    };
}
exports.tMinusToken = tMinusToken;
function tAsteriskToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '*'; }
    };
}
exports.tAsteriskToken = tAsteriskToken;
function tSlashToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '/'; }
    };
}
exports.tSlashToken = tSlashToken;
function tPercentToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '%'; }
    };
}
exports.tPercentToken = tPercentToken;
function tLogicOrToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '||'; }
    };
}
exports.tLogicOrToken = tLogicOrToken;
function tLogicAndToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '&&'; }
    };
}
exports.tLogicAndToken = tLogicAndToken;
function tBinaryOrToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '|'; }
    };
}
exports.tBinaryOrToken = tBinaryOrToken;
function tBinaryAndToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '&'; }
    };
}
exports.tBinaryAndToken = tBinaryAndToken;
function tPlusEqToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '+='; }
    };
}
exports.tPlusEqToken = tPlusEqToken;
function tMinusEqToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '-='; }
    };
}
exports.tMinusEqToken = tMinusEqToken;
function tAsteriskEqToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '*='; }
    };
}
exports.tAsteriskEqToken = tAsteriskEqToken;
function tSlashEqToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '/='; }
    };
}
exports.tSlashEqToken = tSlashEqToken;
function tPercentEqToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '%='; }
    };
}
exports.tPercentEqToken = tPercentEqToken;
function tBinaryOrEqToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '|='; }
    };
}
exports.tBinaryOrEqToken = tBinaryOrEqToken;
function tBinaryAndEqToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '&='; }
    };
}
exports.tBinaryAndEqToken = tBinaryAndEqToken;
function tEqualsGreaterThanToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '>='; }
    };
}
exports.tEqualsGreaterThanToken = tEqualsGreaterThanToken;
function tEqualsLessThanToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '<='; }
    };
}
exports.tEqualsLessThanToken = tEqualsLessThanToken;
function tGreaterThanToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '>'; }
    };
}
exports.tGreaterThanToken = tGreaterThanToken;
function tLessThanToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '<'; }
    };
}
exports.tLessThanToken = tLessThanToken;
function tEqualsToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '='; }
    };
}
exports.tEqualsToken = tEqualsToken;
function tEqualsEqualsToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '=='; }
    };
}
exports.tEqualsEqualsToken = tEqualsEqualsToken;
function tEqualsEqualsStrictToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '==='; }
    };
}
exports.tEqualsEqualsStrictToken = tEqualsEqualsStrictToken;
function tNotEqualsToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '!='; }
    };
}
exports.tNotEqualsToken = tNotEqualsToken;
function tNotEqualsStrictToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '!=='; }
    };
}
exports.tNotEqualsStrictToken = tNotEqualsStrictToken;
function tTrueKeyword(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return 'true'; }
    };
}
exports.tTrueKeyword = tTrueKeyword;
function tFalseKeyword(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return 'false'; }
    };
}
exports.tFalseKeyword = tFalseKeyword;
function tNullLiteral(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return 'null'; }
    };
}
exports.tNullLiteral = tNullLiteral;
function tUndefinedLiteral(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return 'null'; }
    };
}
exports.tUndefinedLiteral = tUndefinedLiteral;
function tBreakStatement(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return 'break;'; }
    };
}
exports.tBreakStatement = tBreakStatement;
function tContinueStatement(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return 'continue;'; }
    };
}
exports.tContinueStatement = tContinueStatement;
function tEndOfFileToken(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return '\n'; }
    };
}
exports.tEndOfFileToken = tEndOfFileToken;
