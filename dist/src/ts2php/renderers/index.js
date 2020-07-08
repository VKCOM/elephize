"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var functionDeclaration_1 = require("./functionDeclaration");
var functionExpression_1 = require("./functionExpression");
var expressionStatement_1 = require("./expressionStatement");
var binaryExpression_1 = require("./binaryExpression");
var prefixUnaryExpression_1 = require("./prefixUnaryExpression");
var postfixUnaryExpression_1 = require("./postfixUnaryExpression");
var propertyAccessExpression_1 = require("./propertyAccessExpression");
var identifier_1 = require("./identifier");
var _primitives_1 = require("./_primitives");
var stringLiteral_1 = require("./stringLiteral");
var variableStatement_1 = require("./variableStatement");
var variableDeclarationList_1 = require("./variableDeclarationList");
var variableDeclaration_1 = require("./variableDeclaration");
var callExpression_1 = require("./callExpression");
var block_1 = require("./block");
var ifStatement_1 = require("./ifStatement");
var elementAccessExpression_1 = require("./elementAccessExpression");
var numericLiteral_1 = require("./numericLiteral");
var returnStatement_1 = require("./returnStatement");
var parenthesizedExpression_1 = require("./parenthesizedExpression");
var objectLiteralExpression_1 = require("./objectLiteralExpression");
var propertyAssignment_1 = require("./propertyAssignment");
var syntaxList_1 = require("./syntaxList");
var parameterDeclaration_1 = require("./parameterDeclaration");
var arrayLiteralExpression_1 = require("./arrayLiteralExpression");
var ternaryOperator_1 = require("./ternaryOperator");
var caseBlock_1 = require("./caseBlock");
var caseClause_1 = require("./caseClause");
var defaultClause_1 = require("./defaultClause");
var switchStatement_1 = require("./switchStatement");
var forStatement_1 = require("./forStatement");
var forInStatement_1 = require("./forInStatement");
var whileStatement_1 = require("./whileStatement");
var doWhileStatement_1 = require("./doWhileStatement");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var regularExpressionLiteral_1 = require("./regularExpressionLiteral");
var forOfStatement_1 = require("./forOfStatement");
var arrowFunction_1 = require("./arrowFunction");
var arrayBindingPattern_1 = require("./arrayBindingPattern");
var objectBindingPattern_1 = require("./objectBindingPattern");
var spreadElement_1 = require("./spreadElement");
var spreadAssignment_1 = require("./spreadAssignment");
var templateString_1 = require("./templateString");
var jsxText_1 = require("./jsxText");
var jsxFragment_1 = require("./jsxFragment");
var jsxAttributes_1 = require("./jsxAttributes");
var jsxAttribute_1 = require("./jsxAttribute");
var jsxExpression_1 = require("./jsxExpression");
var jsxElement_1 = require("./jsxElement");
var imports_1 = require("./imports");
var jsxSelfClosingElement_1 = require("./jsxSelfClosingElement");
var typeofExpression_1 = require("./typeofExpression");
var shorthandPropertyAssignment_1 = require("./shorthandPropertyAssignment");
var asExpression_1 = require("./asExpression");
var typeAssertionExpression_1 = require("./typeAssertionExpression");
function getNodeInfo(node) {
    if (ts.isFunctionDeclaration(node))
        return functionDeclaration_1.tFunctionDeclaration(node);
    if (ts.isFunctionExpression(node))
        return functionExpression_1.tFunctionExpression(node);
    if (ts.isArrowFunction(node))
        return arrowFunction_1.tArrowFunction(node);
    if (ts.isExpressionStatement(node))
        return expressionStatement_1.tExpressionStatement(node);
    if (ts.isBinaryExpression(node))
        return binaryExpression_1.tBinaryExpression(node);
    if (ts.isPrefixUnaryExpression(node))
        return prefixUnaryExpression_1.tPrefixUnaryExpression(node);
    if (ts.isPostfixUnaryExpression(node))
        return postfixUnaryExpression_1.tPostfixUnaryExpression(node);
    if (ts.isPropertyAccessExpression(node))
        return propertyAccessExpression_1.tPropertyAccessExpression(node);
    if (ts.isIdentifier(node))
        return identifier_1.tIdentifier(node);
    if (ts.isStringLiteral(node))
        return stringLiteral_1.tStringLiteral(node);
    if (ts.isVariableStatement(node))
        return variableStatement_1.tVariableStatement(node);
    if (ts.isVariableDeclarationList(node))
        return variableDeclarationList_1.tVariableDeclarationList(node);
    if (ts.isVariableDeclaration(node))
        return variableDeclaration_1.tVariableDeclaration(node);
    if (ts.isCallExpression(node))
        return callExpression_1.tCallExpression(node);
    if (ts.isBlock(node))
        return block_1.tBlock(node);
    if (ts.isElementAccessExpression(node))
        return elementAccessExpression_1.tElementAccessExpression(node);
    if (ts.isNumericLiteral(node))
        return numericLiteral_1.tNumericLiteral(node);
    if (ts.isReturnStatement(node))
        return returnStatement_1.tReturnStatement(node);
    if (ts.isParenthesizedExpression(node))
        return parenthesizedExpression_1.tParenthesizedExpression(node);
    if (ts.isArrayLiteralExpression(node))
        return arrayLiteralExpression_1.tArrayLiteralExpression(node);
    if (ts.isObjectLiteralExpression(node))
        return objectLiteralExpression_1.tObjectLiteralExpression(node);
    if (ts.isPropertyAssignment(node))
        return propertyAssignment_1.tPropertyAssignment(node);
    if (ts.isParameter(node))
        return parameterDeclaration_1.tParameterDeclaration(node);
    if (ts.isConditionalExpression(node))
        return ternaryOperator_1.tTernaryOperator(node);
    if (ts.isIfStatement(node))
        return ifStatement_1.tIfStatement(node);
    if (ts.isSwitchStatement(node))
        return switchStatement_1.tSwitchStatement(node);
    if (ts.isForStatement(node))
        return forStatement_1.tForStatement(node);
    if (ts.isForInStatement(node))
        return forInStatement_1.tForInStatement(node);
    if (ts.isForOfStatement(node))
        return forOfStatement_1.tForOfStatement(node);
    if (ts.isWhileStatement(node))
        return whileStatement_1.tWhileStatement(node);
    if (ts.isDoStatement(node))
        return doWhileStatement_1.tDoWhileStatement(node);
    if (ts.isRegularExpressionLiteral(node))
        return regularExpressionLiteral_1.tRegularExpressionLiteral(node);
    if (ts.isArrayBindingPattern(node))
        return arrayBindingPattern_1.tArrayBindingPattern(node);
    if (ts.isObjectBindingPattern(node))
        return objectBindingPattern_1.tObjectBindingPattern(node);
    if (ts.isSpreadElement(node))
        return spreadElement_1.tSpreadElement(node);
    if (ts.isShorthandPropertyAssignment(node))
        return shorthandPropertyAssignment_1.tShorthandPropertyAssignment(node);
    if (ts.isSpreadAssignment(node))
        return spreadAssignment_1.tSpreadAssignment(node);
    if (ts.isTemplateExpression(node))
        return templateString_1.tTemplateExpression(node);
    if (ts.isTemplateHead(node) || ts.isTemplateMiddleOrTemplateTail(node) || ts.isNoSubstitutionTemplateLiteral(node))
        return templateString_1.tTemplateStatic(node);
    if (ts.isTemplateSpan(node))
        return templateString_1.tTemplateSpan(node);
    if (ts.isJsxElement(node))
        return jsxElement_1.tJsxElement(node);
    if (ts.isJsxSelfClosingElement(node))
        return jsxSelfClosingElement_1.tJsxSelfClosingElement(node);
    if (ts.isJsxFragment(node))
        return jsxFragment_1.tJsxFragment(node);
    if (ts.isJsxAttributes(node))
        return jsxAttributes_1.tJsxAttributes(node);
    if (ts.isJsxAttribute(node))
        return jsxAttribute_1.tJsxAttribute(node);
    if (ts.isJsxExpression(node))
        return jsxExpression_1.tJsxExpression(node);
    if (ts.isJsxText(node))
        return jsxText_1.tJsxText(node);
    if (ts.isImportDeclaration(node))
        return imports_1.tImportDeclaration(node);
    if (ts.isImportClause(node))
        return imports_1.tImportClause(node);
    if (ts.isNamedImports(node))
        return imports_1.tNamedImports(node);
    if (ts.isImportSpecifier(node))
        return imports_1.tImportSpecifier(node);
    if (ts.isNamespaceImport(node))
        return imports_1.tNamespaceImport(node);
    if (ts.isTypeOfExpression(node))
        return typeofExpression_1.tTypeofExpression(node);
    if (ts.isAsExpression(node))
        return asExpression_1.tAsExpression(node);
    if (node.kind === ts.SyntaxKind.AsteriskToken)
        return _primitives_1.tAsteriskToken(node);
    if (node.kind === ts.SyntaxKind.GreaterThanEqualsToken)
        return _primitives_1.tEqualsGreaterThanToken(node);
    if (node.kind === ts.SyntaxKind.LessThanEqualsToken)
        return _primitives_1.tEqualsLessThanToken(node);
    if (node.kind === ts.SyntaxKind.GreaterThanToken)
        return _primitives_1.tGreaterThanToken(node);
    if (node.kind === ts.SyntaxKind.LessThanToken)
        return _primitives_1.tLessThanToken(node);
    if (node.kind === ts.SyntaxKind.MinusToken)
        return _primitives_1.tMinusToken(node);
    if (node.kind === ts.SyntaxKind.PercentToken)
        return _primitives_1.tPercentToken(node);
    if (node.kind === ts.SyntaxKind.SlashToken)
        return _primitives_1.tSlashToken(node);
    if (node.kind === ts.SyntaxKind.EqualsToken)
        return _primitives_1.tEqualsToken(node);
    if (node.kind === ts.SyntaxKind.EqualsEqualsToken)
        return _primitives_1.tEqualsEqualsToken(node);
    if (node.kind === ts.SyntaxKind.EqualsEqualsEqualsToken)
        return _primitives_1.tEqualsEqualsStrictToken(node);
    if (node.kind === ts.SyntaxKind.ExclamationEqualsToken)
        return _primitives_1.tNotEqualsToken(node);
    if (node.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken)
        return _primitives_1.tNotEqualsStrictToken(node);
    if (node.kind === ts.SyntaxKind.TrueKeyword)
        return _primitives_1.tTrueKeyword(node);
    if (node.kind === ts.SyntaxKind.FalseKeyword)
        return _primitives_1.tFalseKeyword(node);
    if (node.kind === ts.SyntaxKind.NullKeyword)
        return _primitives_1.tNullLiteral(node);
    if (node.kind === ts.SyntaxKind.UndefinedKeyword)
        return _primitives_1.tUndefinedLiteral(node);
    if (node.kind === ts.SyntaxKind.PlusToken)
        return _primitives_1.tPlusToken(node);
    if (node.kind === ts.SyntaxKind.EndOfFileToken)
        return _primitives_1.tEndOfFileToken(node);
    if (node.kind === ts.SyntaxKind.SyntaxList)
        return syntaxList_1.tSyntaxList(node);
    if (node.kind === ts.SyntaxKind.AsteriskEqualsToken)
        return _primitives_1.tAsteriskEqToken(node);
    if (node.kind === ts.SyntaxKind.SlashEqualsToken)
        return _primitives_1.tSlashEqToken(node);
    if (node.kind === ts.SyntaxKind.MinusEqualsToken)
        return _primitives_1.tMinusEqToken(node);
    if (node.kind === ts.SyntaxKind.PlusEqualsToken)
        return _primitives_1.tPlusEqToken(node);
    if (node.kind === ts.SyntaxKind.PercentEqualsToken)
        return _primitives_1.tPercentEqToken(node);
    if (node.kind === ts.SyntaxKind.AmpersandAmpersandToken)
        return _primitives_1.tLogicAndToken(node);
    if (node.kind === ts.SyntaxKind.AmpersandToken)
        return _primitives_1.tBinaryAndToken(node);
    if (node.kind === ts.SyntaxKind.AmpersandEqualsToken)
        return _primitives_1.tBinaryAndEqToken(node);
    if (node.kind === ts.SyntaxKind.BarBarToken)
        return _primitives_1.tLogicOrToken(node);
    if (node.kind === ts.SyntaxKind.BarToken)
        return _primitives_1.tBinaryOrToken(node);
    if (node.kind === ts.SyntaxKind.BarEqualsToken)
        return _primitives_1.tBinaryOrEqToken(node);
    if (node.kind === ts.SyntaxKind.PlusPlusToken)
        return _primitives_1.tPlusPlusToken(node);
    if (node.kind === ts.SyntaxKind.MinusMinusToken)
        return _primitives_1.tMinusMinusToken(node);
    if (node.kind === ts.SyntaxKind.ExclamationToken)
        return _primitives_1.tNotToken(node);
    if (node.kind === ts.SyntaxKind.CaseBlock)
        return caseBlock_1.tCaseBlock(node);
    if (node.kind === ts.SyntaxKind.CaseClause)
        return caseClause_1.tCaseClause(node);
    if (node.kind === ts.SyntaxKind.DefaultClause)
        return defaultClause_1.tDefaultClause(node);
    if (node.kind === ts.SyntaxKind.BreakStatement)
        return _primitives_1.tBreakStatement(node);
    if (node.kind === ts.SyntaxKind.ContinueStatement)
        return _primitives_1.tContinueStatement(node);
    if (node.kind === ts.SyntaxKind.TypeAssertionExpression)
        return typeAssertionExpression_1.tTypeAssertionExpression(node);
    return {
        kind: node.kind,
        kindDescription: ts.SyntaxKind[node.kind],
        supported: false,
        gen: function (self, context) {
            return renderSupportedNodes_1.renderSupportedNodes(self.children, context).join('\n');
            //throw new Error('Unsupported node type: ' + ts.SyntaxKind[node.kind]);
        }
    };
}
exports.getNodeInfo = getNodeInfo;
