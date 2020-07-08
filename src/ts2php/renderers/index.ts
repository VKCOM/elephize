import * as ts from 'typescript';

import { Declaration, NodeDescription, NodeInfo, UnsupportedNode } from '../types';
import { tFunctionDeclaration } from './functionDeclaration';
import { tFunctionExpression } from './functionExpression';
import { tExpressionStatement } from './expressionStatement';
import { tBinaryExpression } from './binaryExpression';
import { tPrefixUnaryExpression } from './prefixUnaryExpression';
import { tPostfixUnaryExpression } from './postfixUnaryExpression';
import { tPropertyAccessExpression } from './propertyAccessExpression';
import { tIdentifier } from './identifier';
import {
  tEqualsToken, tTrueKeyword, tNullLiteral, tPlusToken,
  tAsteriskToken, tEqualsGreaterThanToken, tEqualsLessThanToken,
  tGreaterThanToken, tLessThanToken, tMinusToken, tPercentToken,
  tSlashToken, tAsteriskEqToken, tBinaryAndEqToken, tBinaryAndToken,
  tBinaryOrEqToken, tBinaryOrToken, tEqualsEqualsStrictToken,
  tEqualsEqualsToken, tFalseKeyword, tLogicAndToken, tLogicOrToken,
  tMinusEqToken, tPercentEqToken, tPlusEqToken, tSlashEqToken,
  tMinusMinusToken, tPlusPlusToken, tNotToken, tNotEqualsToken,
  tNotEqualsStrictToken, tBreakStatement, tContinueStatement,
  tEndOfFileToken, tUndefinedLiteral } from './_primitives';
import { tStringLiteral } from './stringLiteral';
import { tVariableStatement } from './variableStatement';
import { tVariableDeclarationList } from './variableDeclarationList';
import { tVariableDeclaration } from './variableDeclaration';
import { tCallExpression } from './callExpression';
import { tBlock } from './block';
import { tIfStatement } from './ifStatement';
import { tElementAccessExpression } from './elementAccessExpression';
import { tNumericLiteral } from './numericLiteral';
import { tReturnStatement } from './returnStatement';
import { tParenthesizedExpression } from './parenthesizedExpression';
import { tObjectLiteralExpression } from './objectLiteralExpression';
import { tPropertyAssignment } from './propertyAssignment';
import { tSyntaxList } from './syntaxList';
import { tParameterDeclaration } from './parameterDeclaration';
import { tArrayLiteralExpression } from './arrayLiteralExpression';
import { tTernaryOperator } from './ternaryOperator';
import { tCaseBlock } from './caseBlock';
import { tCaseClause } from './caseClause';
import { tDefaultClause } from './defaultClause';
import { tSwitchStatement } from './switchStatement';
import { tForStatement } from './forStatement';
import { tForInStatement } from './forInStatement';
import { tWhileStatement } from './whileStatement';
import { tDoWhileStatement } from './doWhileStatement';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { tRegularExpressionLiteral } from './regularExpressionLiteral';
import { Context } from '../components/context';
import { tForOfStatement } from './forOfStatement';
import { tArrowFunction } from './arrowFunction';
import { tArrayBindingPattern } from './arrayBindingPattern';
import { tObjectBindingPattern } from './objectBindingPattern';
import { tSpreadElement } from './spreadElement';
import { tSpreadAssignment } from './spreadAssignment';
import { tTemplateExpression, tTemplateSpan, tTemplateStatic } from './templateString';
import { tJsxText } from './jsxText';
import { tJsxFragment } from './jsxFragment';
import { tJsxAttributes } from './jsxAttributes';
import { tJsxAttribute } from './jsxAttribute';
import { tJsxExpression } from './jsxExpression';
import { tJsxElement } from './jsxElement';
import {
  tImportClause, tImportDeclaration, tImportSpecifier,
  tNamedImports, tNamespaceImport } from './imports';
import { tJsxSelfClosingElement } from './jsxSelfClosingElement';
import { tTypeofExpression } from './typeofExpression';
import { tShorthandPropertyAssignment } from './shorthandPropertyAssignment';
import { tAsExpression } from './asExpression';
import { tTypeAssertionExpression } from './typeAssertionExpression';

export function getNodeInfo(node: ts.Node): NodeDescription | UnsupportedNode {
  if (ts.isFunctionDeclaration(node)) return tFunctionDeclaration(node);
  if (ts.isFunctionExpression(node)) return tFunctionExpression(node);
  if (ts.isArrowFunction(node)) return tArrowFunction(node);
  if (ts.isExpressionStatement(node)) return tExpressionStatement(node);
  if (ts.isBinaryExpression(node)) return tBinaryExpression(node);
  if (ts.isPrefixUnaryExpression(node)) return tPrefixUnaryExpression(node);
  if (ts.isPostfixUnaryExpression(node)) return tPostfixUnaryExpression(node);
  if (ts.isPropertyAccessExpression(node)) return tPropertyAccessExpression(node);
  if (ts.isIdentifier(node)) return tIdentifier(node);
  if (ts.isStringLiteral(node)) return tStringLiteral(node);
  if (ts.isVariableStatement(node)) return tVariableStatement(node);
  if (ts.isVariableDeclarationList(node)) return tVariableDeclarationList(node);
  if (ts.isVariableDeclaration(node)) return tVariableDeclaration(node);
  if (ts.isCallExpression(node)) return tCallExpression(node);
  if (ts.isBlock(node)) return tBlock(node);
  if (ts.isElementAccessExpression(node)) return tElementAccessExpression(node);
  if (ts.isNumericLiteral(node)) return tNumericLiteral(node);
  if (ts.isReturnStatement(node)) return tReturnStatement(node);
  if (ts.isParenthesizedExpression(node)) return tParenthesizedExpression(node);
  if (ts.isArrayLiteralExpression(node)) return tArrayLiteralExpression(node);
  if (ts.isObjectLiteralExpression(node)) return tObjectLiteralExpression(node);
  if (ts.isPropertyAssignment(node)) return tPropertyAssignment(node);
  if (ts.isParameter(node)) return tParameterDeclaration(node);
  if (ts.isConditionalExpression(node)) return tTernaryOperator(node);
  if (ts.isIfStatement(node)) return tIfStatement(node);
  if (ts.isSwitchStatement(node)) return tSwitchStatement(node);
  if (ts.isForStatement(node)) return tForStatement(node);
  if (ts.isForInStatement(node)) return tForInStatement(node);
  if (ts.isForOfStatement(node)) return tForOfStatement(node);
  if (ts.isWhileStatement(node)) return tWhileStatement(node);
  if (ts.isDoStatement(node)) return tDoWhileStatement(node);
  if (ts.isRegularExpressionLiteral(node)) return tRegularExpressionLiteral(node);
  if (ts.isArrayBindingPattern(node)) return tArrayBindingPattern(node);
  if (ts.isObjectBindingPattern(node)) return tObjectBindingPattern(node);
  if (ts.isSpreadElement(node)) return tSpreadElement(node);
  if (ts.isShorthandPropertyAssignment(node)) return tShorthandPropertyAssignment(node);
  if (ts.isSpreadAssignment(node)) return tSpreadAssignment(node);
  if (ts.isTemplateExpression(node)) return tTemplateExpression(node);
  if (ts.isTemplateHead(node) || ts.isTemplateMiddleOrTemplateTail(node) || ts.isNoSubstitutionTemplateLiteral(node)) return tTemplateStatic(node);
  if (ts.isTemplateSpan(node)) return tTemplateSpan(node);
  if (ts.isJsxElement(node)) return tJsxElement(node);
  if (ts.isJsxSelfClosingElement(node)) return tJsxSelfClosingElement(node);
  if (ts.isJsxFragment(node)) return tJsxFragment(node);
  if (ts.isJsxAttributes(node)) return tJsxAttributes(node);
  if (ts.isJsxAttribute(node)) return tJsxAttribute(node);
  if (ts.isJsxExpression(node)) return tJsxExpression(node);
  if (ts.isJsxText(node)) return tJsxText(node);
  if (ts.isImportDeclaration(node)) return tImportDeclaration(node);
  if (ts.isImportClause(node)) return tImportClause(node);
  if (ts.isNamedImports(node)) return tNamedImports(node);
  if (ts.isImportSpecifier(node)) return tImportSpecifier(node);
  if (ts.isNamespaceImport(node)) return tNamespaceImport(node);
  if (ts.isTypeOfExpression(node)) return tTypeofExpression(node);
  if (ts.isAsExpression(node)) return tAsExpression(node);

  if (node.kind === ts.SyntaxKind.AsteriskToken) return tAsteriskToken(node as ts.AsteriskToken);
  if (node.kind === ts.SyntaxKind.GreaterThanEqualsToken) return tEqualsGreaterThanToken(node);
  if (node.kind === ts.SyntaxKind.LessThanEqualsToken) return tEqualsLessThanToken(node);
  if (node.kind === ts.SyntaxKind.GreaterThanToken) return tGreaterThanToken(node);
  if (node.kind === ts.SyntaxKind.LessThanToken) return tLessThanToken(node);
  if (node.kind === ts.SyntaxKind.MinusToken) return tMinusToken(node as ts.MinusToken);
  if (node.kind === ts.SyntaxKind.PercentToken) return tPercentToken(node);
  if (node.kind === ts.SyntaxKind.SlashToken) return tSlashToken(node);
  if (node.kind === ts.SyntaxKind.EqualsToken) return tEqualsToken(node as ts.EqualsToken);
  if (node.kind === ts.SyntaxKind.EqualsEqualsToken) return tEqualsEqualsToken(node);
  if (node.kind === ts.SyntaxKind.EqualsEqualsEqualsToken) return tEqualsEqualsStrictToken(node);
  if (node.kind === ts.SyntaxKind.ExclamationEqualsToken) return tNotEqualsToken(node);
  if (node.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken) return tNotEqualsStrictToken(node);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return tTrueKeyword(node as ts.BooleanLiteral);
  if (node.kind === ts.SyntaxKind.FalseKeyword) return tFalseKeyword(node as ts.BooleanLiteral);
  if (node.kind === ts.SyntaxKind.NullKeyword) return tNullLiteral(node as ts.NullLiteral);
  if (node.kind === ts.SyntaxKind.UndefinedKeyword) return tUndefinedLiteral(node);
  if (node.kind === ts.SyntaxKind.PlusToken) return tPlusToken(node as ts.PlusToken);
  if (node.kind === ts.SyntaxKind.EndOfFileToken) return tEndOfFileToken(node as ts.EndOfFileToken);
  if (node.kind === ts.SyntaxKind.SyntaxList) return tSyntaxList(node as ts.SyntaxList);
  if (node.kind === ts.SyntaxKind.AsteriskEqualsToken) return tAsteriskEqToken(node);
  if (node.kind === ts.SyntaxKind.SlashEqualsToken) return tSlashEqToken(node);
  if (node.kind === ts.SyntaxKind.MinusEqualsToken) return tMinusEqToken(node);
  if (node.kind === ts.SyntaxKind.PlusEqualsToken) return tPlusEqToken(node);
  if (node.kind === ts.SyntaxKind.PercentEqualsToken) return tPercentEqToken(node);
  if (node.kind === ts.SyntaxKind.AmpersandAmpersandToken) return tLogicAndToken(node);
  if (node.kind === ts.SyntaxKind.AmpersandToken) return tBinaryAndToken(node);
  if (node.kind === ts.SyntaxKind.AmpersandEqualsToken) return tBinaryAndEqToken(node);
  if (node.kind === ts.SyntaxKind.BarBarToken) return tLogicOrToken(node);
  if (node.kind === ts.SyntaxKind.BarToken) return tBinaryOrToken(node);
  if (node.kind === ts.SyntaxKind.BarEqualsToken) return tBinaryOrEqToken(node);
  if (node.kind === ts.SyntaxKind.PlusPlusToken) return tPlusPlusToken(node);
  if (node.kind === ts.SyntaxKind.MinusMinusToken) return tMinusMinusToken(node);
  if (node.kind === ts.SyntaxKind.ExclamationToken) return tNotToken(node);
  if (node.kind === ts.SyntaxKind.CaseBlock) return tCaseBlock(node as ts.CaseBlock);
  if (node.kind === ts.SyntaxKind.CaseClause) return tCaseClause(node as ts.CaseClause);
  if (node.kind === ts.SyntaxKind.DefaultClause) return tDefaultClause(node as ts.DefaultClause);
  if (node.kind === ts.SyntaxKind.BreakStatement) return tBreakStatement(node as ts.BreakStatement);
  if (node.kind === ts.SyntaxKind.ContinueStatement) return tContinueStatement(node as ts.ContinueStatement);
  if (node.kind === ts.SyntaxKind.TypeAssertionExpression) return tTypeAssertionExpression(node);

  return {
    kind: node.kind,
    kindDescription: ts.SyntaxKind[node.kind],
    supported: false,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      return renderSupportedNodes(self.children, context).join('\n');
      //throw new Error('Unsupported node type: ' + ts.SyntaxKind[node.kind]);
    }
  };
}
