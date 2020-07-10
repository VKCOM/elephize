"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var functionDeclaration_1 = require("../../renderers/functionDeclaration");
var functionExpression_1 = require("../../renderers/functionExpression");
var expressionStatement_1 = require("../../renderers/expressionStatement");
var binaryExpression_1 = require("../../renderers/binaryExpression");
var prefixUnaryExpression_1 = require("../../renderers/prefixUnaryExpression");
var postfixUnaryExpression_1 = require("../../renderers/postfixUnaryExpression");
var propertyAccessExpression_1 = require("../../renderers/propertyAccessExpression");
var identifier_1 = require("../../renderers/identifier");
var _primitives_1 = require("../../renderers/_primitives");
var stringLiteral_1 = require("../../renderers/stringLiteral");
var variableStatement_1 = require("../../renderers/variableStatement");
var variableDeclarationList_1 = require("../../renderers/variableDeclarationList");
var variableDeclaration_1 = require("../../renderers/variableDeclaration");
var callExpression_1 = require("../../renderers/callExpression");
var block_1 = require("../../renderers/block");
var ifStatement_1 = require("../../renderers/ifStatement");
var elementAccessExpression_1 = require("../../renderers/elementAccessExpression");
var numericLiteral_1 = require("../../renderers/numericLiteral");
var returnStatement_1 = require("../../renderers/returnStatement");
var parenthesizedExpression_1 = require("../../renderers/parenthesizedExpression");
var objectLiteralExpression_1 = require("../../renderers/objectLiteralExpression");
var propertyAssignment_1 = require("../../renderers/propertyAssignment");
var parameterDeclaration_1 = require("../../renderers/parameterDeclaration");
var arrayLiteralExpression_1 = require("../../renderers/arrayLiteralExpression");
var ternaryOperator_1 = require("../../renderers/ternaryOperator");
var caseBlock_1 = require("../../renderers/caseBlock");
var caseClause_1 = require("../../renderers/caseClause");
var defaultClause_1 = require("../../renderers/defaultClause");
var switchStatement_1 = require("../../renderers/switchStatement");
var forStatement_1 = require("../../renderers/forStatement");
var forInStatement_1 = require("../../renderers/forInStatement");
var whileStatement_1 = require("../../renderers/whileStatement");
var doWhileStatement_1 = require("../../renderers/doWhileStatement");
var regularExpressionLiteral_1 = require("../../renderers/regularExpressionLiteral");
var forOfStatement_1 = require("../../renderers/forOfStatement");
var arrowFunction_1 = require("../../renderers/arrowFunction");
var arrayBindingPattern_1 = require("../../renderers/arrayBindingPattern");
var objectBindingPattern_1 = require("../../renderers/objectBindingPattern");
var spreadElement_1 = require("../../renderers/spreadElement");
var spreadAssignment_1 = require("../../renderers/spreadAssignment");
var templateString_1 = require("../../renderers/templateString");
var jsxText_1 = require("../../renderers/jsxText");
var jsxFragment_1 = require("../../renderers/jsxFragment");
var jsxAttributes_1 = require("../../renderers/jsxAttributes");
var jsxAttribute_1 = require("../../renderers/jsxAttribute");
var jsxExpression_1 = require("../../renderers/jsxExpression");
var jsxElement_1 = require("../../renderers/jsxElement");
var imports_1 = require("../../renderers/imports");
var jsxSelfClosingElement_1 = require("../../renderers/jsxSelfClosingElement");
var typeofExpression_1 = require("../../renderers/typeofExpression");
var shorthandPropertyAssignment_1 = require("../../renderers/shorthandPropertyAssignment");
var asExpression_1 = require("../../renderers/asExpression");
var typeAssertionExpression_1 = require("../../renderers/typeAssertionExpression");
function _renderNode(node, context) {
    if (!node) {
        return '';
    }
    if (ts.isFunctionDeclaration(node))
        return functionDeclaration_1.tFunctionDeclaration(node, context);
    if (ts.isFunctionExpression(node))
        return functionExpression_1.tFunctionExpression(node, context);
    if (ts.isArrowFunction(node))
        return arrowFunction_1.tArrowFunction(node, context);
    if (ts.isExpressionStatement(node))
        return expressionStatement_1.tExpressionStatement(node, context);
    if (ts.isBinaryExpression(node))
        return binaryExpression_1.tBinaryExpression(node, context);
    if (ts.isPrefixUnaryExpression(node))
        return prefixUnaryExpression_1.tPrefixUnaryExpression(node, context);
    if (ts.isPostfixUnaryExpression(node))
        return postfixUnaryExpression_1.tPostfixUnaryExpression(node, context);
    if (ts.isPropertyAccessExpression(node))
        return propertyAccessExpression_1.tPropertyAccessExpression(node, context);
    if (ts.isIdentifier(node))
        return identifier_1.tIdentifier(node, context);
    if (ts.isStringLiteral(node))
        return stringLiteral_1.tStringLiteral(node, context);
    if (ts.isVariableStatement(node))
        return variableStatement_1.tVariableStatement(node, context);
    if (ts.isVariableDeclarationList(node))
        return variableDeclarationList_1.tVariableDeclarationList(node, context);
    if (ts.isVariableDeclaration(node))
        return variableDeclaration_1.tVariableDeclaration(node, context);
    if (ts.isCallExpression(node))
        return callExpression_1.tCallExpression(node, context);
    if (ts.isBlock(node))
        return block_1.tBlock(node, context);
    if (ts.isElementAccessExpression(node))
        return elementAccessExpression_1.tElementAccessExpression(node, context);
    if (ts.isNumericLiteral(node))
        return numericLiteral_1.tNumericLiteral(node);
    if (ts.isReturnStatement(node))
        return returnStatement_1.tReturnStatement(node, context);
    if (ts.isParenthesizedExpression(node))
        return parenthesizedExpression_1.tParenthesizedExpression(node, context);
    if (ts.isArrayLiteralExpression(node))
        return arrayLiteralExpression_1.tArrayLiteralExpression(node, context);
    if (ts.isObjectLiteralExpression(node))
        return objectLiteralExpression_1.tObjectLiteralExpression(node, context);
    if (ts.isPropertyAssignment(node))
        return propertyAssignment_1.tPropertyAssignment(node, context);
    if (ts.isParameter(node))
        return parameterDeclaration_1.tParameterDeclaration(node, context);
    if (ts.isConditionalExpression(node))
        return ternaryOperator_1.tTernaryOperator(node, context);
    if (ts.isIfStatement(node))
        return ifStatement_1.tIfStatement(node, context);
    if (ts.isSwitchStatement(node))
        return switchStatement_1.tSwitchStatement(node, context);
    if (ts.isForStatement(node))
        return forStatement_1.tForStatement(node, context);
    if (ts.isForInStatement(node))
        return forInStatement_1.tForInStatement(node, context);
    if (ts.isForOfStatement(node))
        return forOfStatement_1.tForOfStatement(node, context);
    if (ts.isWhileStatement(node))
        return whileStatement_1.tWhileStatement(node, context);
    if (ts.isDoStatement(node))
        return doWhileStatement_1.tDoWhileStatement(node, context);
    if (ts.isRegularExpressionLiteral(node))
        return regularExpressionLiteral_1.tRegularExpressionLiteral(node);
    if (ts.isArrayBindingPattern(node))
        return arrayBindingPattern_1.tArrayBindingPattern(node, context);
    if (ts.isObjectBindingPattern(node))
        return objectBindingPattern_1.tObjectBindingPattern(node, context);
    if (ts.isSpreadElement(node))
        return spreadElement_1.tSpreadElement(node, context);
    if (ts.isShorthandPropertyAssignment(node))
        return shorthandPropertyAssignment_1.tShorthandPropertyAssignment(node, context);
    if (ts.isSpreadAssignment(node))
        return spreadAssignment_1.tSpreadAssignment(node, context);
    if (ts.isTemplateExpression(node))
        return templateString_1.tTemplateExpression(node, context);
    if (ts.isTemplateHead(node) || ts.isTemplateMiddleOrTemplateTail(node) || ts.isNoSubstitutionTemplateLiteral(node))
        return templateString_1.tTemplateStatic(node);
    if (ts.isTemplateSpan(node))
        return templateString_1.tTemplateSpan(node, context);
    if (ts.isJsxElement(node))
        return jsxElement_1.tJsxElement(node, context);
    if (ts.isJsxSelfClosingElement(node))
        return jsxSelfClosingElement_1.tJsxSelfClosingElement(node, context);
    if (ts.isJsxFragment(node))
        return jsxFragment_1.tJsxFragment(node, context);
    if (ts.isJsxAttributes(node))
        return jsxAttributes_1.tJsxAttributes(node, context);
    if (ts.isJsxAttribute(node))
        return jsxAttribute_1.tJsxAttribute(node, context);
    if (ts.isJsxExpression(node))
        return jsxExpression_1.tJsxExpression(node, context);
    if (ts.isJsxText(node))
        return jsxText_1.tJsxText(node);
    if (ts.isImportDeclaration(node))
        return imports_1.tImportDeclaration(node, context);
    if (ts.isImportClause(node))
        return imports_1.tImportClause(node, context);
    if (ts.isNamedImports(node))
        return imports_1.tNamedImports(node, context);
    if (ts.isTypeOfExpression(node))
        return typeofExpression_1.tTypeofExpression(node, context);
    if (ts.isAsExpression(node))
        return asExpression_1.tAsExpression(node, context);
    if (node.kind === ts.SyntaxKind.AsteriskToken)
        return _primitives_1.tAsteriskToken();
    if (node.kind === ts.SyntaxKind.GreaterThanEqualsToken)
        return _primitives_1.tEqualsGreaterThanToken();
    if (node.kind === ts.SyntaxKind.LessThanEqualsToken)
        return _primitives_1.tEqualsLessThanToken();
    if (node.kind === ts.SyntaxKind.GreaterThanToken)
        return _primitives_1.tGreaterThanToken();
    if (node.kind === ts.SyntaxKind.LessThanToken)
        return _primitives_1.tLessThanToken();
    if (node.kind === ts.SyntaxKind.MinusToken)
        return _primitives_1.tMinusToken();
    if (node.kind === ts.SyntaxKind.PercentToken)
        return _primitives_1.tPercentToken();
    if (node.kind === ts.SyntaxKind.SlashToken)
        return _primitives_1.tSlashToken();
    if (node.kind === ts.SyntaxKind.EqualsToken)
        return _primitives_1.tEqualsToken();
    if (node.kind === ts.SyntaxKind.EqualsEqualsToken)
        return _primitives_1.tEqualsEqualsToken();
    if (node.kind === ts.SyntaxKind.EqualsEqualsEqualsToken)
        return _primitives_1.tEqualsEqualsStrictToken();
    if (node.kind === ts.SyntaxKind.ExclamationEqualsToken)
        return _primitives_1.tNotEqualsToken();
    if (node.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken)
        return _primitives_1.tNotEqualsStrictToken();
    if (node.kind === ts.SyntaxKind.PlusToken)
        return _primitives_1.tPlusToken();
    if (node.kind === ts.SyntaxKind.AsteriskEqualsToken)
        return _primitives_1.tAsteriskEqToken();
    if (node.kind === ts.SyntaxKind.SlashEqualsToken)
        return _primitives_1.tSlashEqToken();
    if (node.kind === ts.SyntaxKind.MinusEqualsToken)
        return _primitives_1.tMinusEqToken();
    if (node.kind === ts.SyntaxKind.PlusEqualsToken)
        return _primitives_1.tPlusEqToken();
    if (node.kind === ts.SyntaxKind.PercentEqualsToken)
        return _primitives_1.tPercentEqToken();
    if (node.kind === ts.SyntaxKind.AmpersandAmpersandToken)
        return _primitives_1.tLogicAndToken();
    if (node.kind === ts.SyntaxKind.AmpersandToken)
        return _primitives_1.tBinaryAndToken();
    if (node.kind === ts.SyntaxKind.AmpersandEqualsToken)
        return _primitives_1.tBinaryAndEqToken();
    if (node.kind === ts.SyntaxKind.BarBarToken)
        return _primitives_1.tLogicOrToken();
    if (node.kind === ts.SyntaxKind.BarToken)
        return _primitives_1.tBinaryOrToken();
    if (node.kind === ts.SyntaxKind.BarEqualsToken)
        return _primitives_1.tBinaryOrEqToken();
    if (node.kind === ts.SyntaxKind.BreakStatement)
        return _primitives_1.tBreakStatement();
    if (node.kind === ts.SyntaxKind.ContinueStatement)
        return _primitives_1.tContinueStatement();
    if (node.kind === ts.SyntaxKind.TrueKeyword)
        return _primitives_1.tTrueKeyword();
    if (node.kind === ts.SyntaxKind.FalseKeyword)
        return _primitives_1.tFalseKeyword();
    if (node.kind === ts.SyntaxKind.NullKeyword)
        return _primitives_1.tNullLiteral();
    if (node.kind === ts.SyntaxKind.UndefinedKeyword)
        return _primitives_1.tUndefinedLiteral();
    if (node.kind === ts.SyntaxKind.EndOfFileToken)
        return _primitives_1.tEndOfFileToken();
    if (node.kind === ts.SyntaxKind.CaseBlock)
        return caseBlock_1.tCaseBlock(node, context);
    if (node.kind === ts.SyntaxKind.CaseClause)
        return caseClause_1.tCaseClause(node, context);
    if (node.kind === ts.SyntaxKind.DefaultClause)
        return defaultClause_1.tDefaultClause(node, context);
    if (node.kind === ts.SyntaxKind.TypeAssertionExpression)
        return typeAssertionExpression_1.tTypeAssertionExpression(node, context);
    return renderNodes(node.getChildren(), context).join('');
}
function renderNodes(nodes, context, filterEmpty) {
    if (filterEmpty === void 0) { filterEmpty = true; }
    var list = nodes.map(function (child) { return _renderNode(child, context); });
    if (filterEmpty) {
        return list.filter(function (child) {
            return !!child && child !== '!null';
        });
    }
    else {
        return list.map(function (child) {
            if (!child || child === '!null') {
                child = '';
            }
            return child;
        });
    }
}
exports.renderNodes = renderNodes;
function renderNode(node, context) {
    var rendered = _renderNode(node, context);
    if (rendered === '!null') {
        rendered = '';
    }
    return rendered;
}
exports.renderNode = renderNode;
