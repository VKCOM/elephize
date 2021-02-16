import * as ts from 'typescript';

import { tFunctionDeclaration } from '../../renderers/functionDeclaration';
import { tFunctionExpression } from '../../renderers/functionExpression';
import { tExpressionStatement } from '../../renderers/expressionStatement';
import { tBinaryExpression } from '../../renderers/binaryExpression';
import { tPrefixUnaryExpression } from '../../renderers/prefixUnaryExpression';
import { tPostfixUnaryExpression } from '../../renderers/postfixUnaryExpression';
import { tPropertyAccessExpression } from '../../renderers/propertyAccessExpression';
import { tIdentifier } from '../../renderers/identifier';
import {
  tAsteriskEqToken,
  tAsteriskToken,
  tBinaryAndEqToken,
  tBinaryAndToken,
  tBinaryOrEqToken,
  tBinaryOrToken,
  tBreakStatement,
  tContinueStatement,
  tEndOfFileToken,
  tEqualsEqualsStrictToken,
  tEqualsEqualsToken,
  tEqualsGreaterThanToken,
  tEqualsLessThanToken,
  tEqualsToken,
  tFalseKeyword,
  tGreaterThanToken,
  tLessThanToken,
  tLogicAndToken,
  tLogicOrToken,
  tMinusEqToken,
  tMinusToken,
  tNotEqualsStrictToken,
  tNotEqualsToken,
  tNullLiteral,
  tPercentEqToken,
  tPercentToken,
  tPlusEqToken,
  tPlusToken,
  tSlashEqToken,
  tSlashToken,
  tTrueKeyword,
  tUndefinedLiteral
} from '../../renderers/_primitives';
import { tStringLiteral } from '../../renderers/stringLiteral';
import { tVariableStatement } from '../../renderers/variableStatement';
import { tVariableDeclarationList } from '../../renderers/variableDeclarationList';
import { tVariableDeclaration } from '../../renderers/variableDeclaration';
import { tCallExpression } from '../../renderers/callExpression';
import { tBlock } from '../../renderers/block';
import { tIfStatement } from '../../renderers/ifStatement';
import { tElementAccessExpression } from '../../renderers/elementAccessExpression';
import { tNumericLiteral } from '../../renderers/numericLiteral';
import { tReturnStatement } from '../../renderers/returnStatement';
import { tParenthesizedExpression } from '../../renderers/parenthesizedExpression';
import { tObjectLiteralExpression } from '../../renderers/objectLiteralExpression';
import { tPropertyAssignment } from '../../renderers/propertyAssignment';
import { tParameterDeclaration } from '../../renderers/parameterDeclaration';
import { tArrayLiteralExpression } from '../../renderers/arrayLiteralExpression';
import { tTernaryOperator } from '../../renderers/ternaryOperator';
import { tCaseBlock } from '../../renderers/caseBlock';
import { tCaseClause } from '../../renderers/caseClause';
import { tDefaultClause } from '../../renderers/defaultClause';
import { tSwitchStatement } from '../../renderers/switchStatement';
import { tForStatement } from '../../renderers/forStatement';
import { tForInStatement } from '../../renderers/forInStatement';
import { tWhileStatement } from '../../renderers/whileStatement';
import { tDoWhileStatement } from '../../renderers/doWhileStatement';
import { tRegularExpressionLiteral } from '../../renderers/regularExpressionLiteral';
import { tForOfStatement } from '../../renderers/forOfStatement';
import { tArrowFunction } from '../../renderers/arrowFunction';
import { tArrayBindingPattern } from '../../renderers/arrayBindingPattern';
import { tObjectBindingPattern } from '../../renderers/objectBindingPattern';
import { tSpreadElement } from '../../renderers/spreadElement';
import { tSpreadAssignment } from '../../renderers/spreadAssignment';
import { tTemplateExpression, tTemplateSpan, tTemplateStatic } from '../../renderers/templateString';
import { tJsxText } from '../../renderers/jsxText';
import { tJsxFragment } from '../../renderers/jsxFragment';
import { tJsxAttributes } from '../../renderers/jsxAttributes';
import { tJsxAttribute } from '../../renderers/jsxAttribute';
import { tJsxExpression } from '../../renderers/jsxExpression';
import { tJsxElement } from '../../renderers/jsxElement';
import {
  tImportClause,
  tImportDeclaration,
  tNamedImports
} from '../../renderers/imports';
import { tJsxSelfClosingElement } from '../../renderers/jsxSelfClosingElement';
import { tTypeofExpression } from '../../renderers/typeofExpression';
import { tShorthandPropertyAssignment } from '../../renderers/shorthandPropertyAssignment';
import { tAsExpression } from '../../renderers/asExpression';
import { tTypeAssertionExpression } from '../../renderers/typeAssertionExpression';
import { tComputedPropertyName } from '../../renderers/computedPropertyName';
import { tThis } from '../../renderers/this';
import { Declaration } from '../../types';
import { Context } from '../context';

function _renderNode(node: ts.Node | undefined, context: Context<Declaration>): string {
  if (!node) {
    return '';
  }

  if (node.kind === ts.SyntaxKind.InterfaceDeclaration) return '';
  if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) return '';

  if (ts.isFunctionDeclaration(node)) return tFunctionDeclaration(node, context);
  if (ts.isFunctionExpression(node)) return tFunctionExpression(node, context);
  if (ts.isArrowFunction(node)) return tArrowFunction(node, context);
  if (ts.isExpressionStatement(node)) return tExpressionStatement(node, context);
  if (ts.isBinaryExpression(node)) return tBinaryExpression(node, context);
  if (ts.isPrefixUnaryExpression(node)) return tPrefixUnaryExpression(node, context);
  if (ts.isPostfixUnaryExpression(node)) return tPostfixUnaryExpression(node, context);
  if (ts.isPropertyAccessExpression(node)) return tPropertyAccessExpression(node, context);
  if (ts.isIdentifier(node)) return tIdentifier(node, context);
  if (ts.isStringLiteral(node)) return tStringLiteral(node, context);
  if (ts.isVariableStatement(node)) return tVariableStatement(node, context);
  if (ts.isVariableDeclarationList(node)) return tVariableDeclarationList(node, context);
  if (ts.isVariableDeclaration(node)) return tVariableDeclaration(node, context);
  if (ts.isCallExpression(node)) return tCallExpression(node, context);
  if (ts.isBlock(node)) return tBlock(node, context);
  if (ts.isElementAccessExpression(node)) return tElementAccessExpression(node, context);
  if (ts.isNumericLiteral(node)) return tNumericLiteral(node);
  if (ts.isReturnStatement(node)) return tReturnStatement(node, context);
  if (ts.isParenthesizedExpression(node)) return tParenthesizedExpression(node, context);
  if (ts.isArrayLiteralExpression(node)) return tArrayLiteralExpression(node, context);
  if (ts.isObjectLiteralExpression(node)) return tObjectLiteralExpression(node, context);
  if (ts.isPropertyAssignment(node)) return tPropertyAssignment(node, context);
  if (ts.isParameter(node)) return tParameterDeclaration(node, context);
  if (ts.isConditionalExpression(node)) return tTernaryOperator(node, context);
  if (ts.isIfStatement(node)) return tIfStatement(node, context);
  if (ts.isSwitchStatement(node)) return tSwitchStatement(node, context);
  if (ts.isForStatement(node)) return tForStatement(node, context);
  if (ts.isForInStatement(node)) return tForInStatement(node, context);
  if (ts.isForOfStatement(node)) return tForOfStatement(node, context);
  if (ts.isWhileStatement(node)) return tWhileStatement(node, context);
  if (ts.isDoStatement(node)) return tDoWhileStatement(node, context);
  if (ts.isRegularExpressionLiteral(node)) return tRegularExpressionLiteral(node);
  if (ts.isArrayBindingPattern(node)) return tArrayBindingPattern(node, context);
  if (ts.isObjectBindingPattern(node)) return tObjectBindingPattern(node, context);
  if (ts.isSpreadElement(node)) return tSpreadElement(node, context);
  if (ts.isShorthandPropertyAssignment(node)) return tShorthandPropertyAssignment(node, context);
  if (ts.isSpreadAssignment(node)) return tSpreadAssignment(node, context);
  if (ts.isTemplateExpression(node)) return tTemplateExpression(node, context);
  if (ts.isTemplateHead(node) || ts.isTemplateMiddleOrTemplateTail(node) || ts.isNoSubstitutionTemplateLiteral(node)) return tTemplateStatic(node);
  if (ts.isTemplateSpan(node)) return tTemplateSpan(node, context);
  if (ts.isJsxElement(node)) return tJsxElement(node, context);
  if (ts.isJsxSelfClosingElement(node)) return tJsxSelfClosingElement(node, context);
  if (ts.isJsxFragment(node)) return tJsxFragment(node, context);
  if (ts.isJsxAttributes(node)) return tJsxAttributes(node, context);
  if (ts.isJsxAttribute(node)) return tJsxAttribute(node, context);
  if (ts.isJsxExpression(node)) return tJsxExpression(node, context);
  if (ts.isJsxText(node)) return tJsxText(node);
  if (ts.isImportDeclaration(node)) return tImportDeclaration(node, context);
  if (ts.isImportClause(node)) return tImportClause(node, context);
  if (ts.isNamedImports(node)) return tNamedImports(node, context);
  if (ts.isTypeOfExpression(node)) return tTypeofExpression(node, context);
  if (ts.isAsExpression(node)) return tAsExpression(node, context);
  if (ts.isComputedPropertyName(node)) return tComputedPropertyName(node, context);

  if (node.kind === ts.SyntaxKind.AsteriskToken) return tAsteriskToken();
  if (node.kind === ts.SyntaxKind.GreaterThanEqualsToken) return tEqualsGreaterThanToken();
  if (node.kind === ts.SyntaxKind.LessThanEqualsToken) return tEqualsLessThanToken();
  if (node.kind === ts.SyntaxKind.GreaterThanToken) return tGreaterThanToken();
  if (node.kind === ts.SyntaxKind.LessThanToken) return tLessThanToken();
  if (node.kind === ts.SyntaxKind.MinusToken) return tMinusToken();
  if (node.kind === ts.SyntaxKind.PercentToken) return tPercentToken();
  if (node.kind === ts.SyntaxKind.SlashToken) return tSlashToken();
  if (node.kind === ts.SyntaxKind.EqualsToken) return tEqualsToken();
  if (node.kind === ts.SyntaxKind.EqualsEqualsToken) return tEqualsEqualsToken();
  if (node.kind === ts.SyntaxKind.EqualsEqualsEqualsToken) return tEqualsEqualsStrictToken();
  if (node.kind === ts.SyntaxKind.ExclamationEqualsToken) return tNotEqualsToken();
  if (node.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken) return tNotEqualsStrictToken();
  if (node.kind === ts.SyntaxKind.PlusToken) return tPlusToken();
  if (node.kind === ts.SyntaxKind.AsteriskEqualsToken) return tAsteriskEqToken();
  if (node.kind === ts.SyntaxKind.SlashEqualsToken) return tSlashEqToken();
  if (node.kind === ts.SyntaxKind.MinusEqualsToken) return tMinusEqToken();
  if (node.kind === ts.SyntaxKind.PlusEqualsToken) return tPlusEqToken();
  if (node.kind === ts.SyntaxKind.PercentEqualsToken) return tPercentEqToken();
  if (node.kind === ts.SyntaxKind.AmpersandAmpersandToken) return tLogicAndToken();
  if (node.kind === ts.SyntaxKind.AmpersandToken) return tBinaryAndToken();
  if (node.kind === ts.SyntaxKind.AmpersandEqualsToken) return tBinaryAndEqToken();
  if (node.kind === ts.SyntaxKind.BarBarToken) return tLogicOrToken();
  if (node.kind === ts.SyntaxKind.BarToken) return tBinaryOrToken();
  if (node.kind === ts.SyntaxKind.BarEqualsToken) return tBinaryOrEqToken();

  if (node.kind === ts.SyntaxKind.BreakStatement) return tBreakStatement();
  if (node.kind === ts.SyntaxKind.ContinueStatement) return tContinueStatement();
  if (node.kind === ts.SyntaxKind.TrueKeyword) return tTrueKeyword();
  if (node.kind === ts.SyntaxKind.FalseKeyword) return tFalseKeyword();
  if (node.kind === ts.SyntaxKind.NullKeyword) return tNullLiteral();
  if (node.kind === ts.SyntaxKind.UndefinedKeyword) return tUndefinedLiteral();
  if (node.kind === ts.SyntaxKind.EndOfFileToken) return tEndOfFileToken();
  if (node.kind === ts.SyntaxKind.ThisKeyword) return tThis(node as ts.ThisExpression, context);

  if (node.kind === ts.SyntaxKind.CaseBlock) return tCaseBlock(node as ts.CaseBlock, context);
  if (node.kind === ts.SyntaxKind.CaseClause) return tCaseClause(node as ts.CaseClause, context);
  if (node.kind === ts.SyntaxKind.DefaultClause) return tDefaultClause(node as ts.DefaultClause, context);
  if (node.kind === ts.SyntaxKind.TypeAssertionExpression) return tTypeAssertionExpression(node as ts.TypeAssertion, context);

  return renderNodes(node.getChildren(), context).join('');
}

export function renderNodes(nodes: Array<ts.Node | undefined>, context: Context<Declaration>, filterEmpty = true): string[] {
  const list = nodes.map((child) => _renderNode(child, context));

  if (filterEmpty) {
    return list.filter(function (child): child is string {
      return !!child && child !== '!null';
    });
  } else {
    return list.map((child) => {
      if (!child || child === '!null') {
        child = '';
      }
      return child;
    });
  }
}

export function renderNode(node: ts.Node | undefined, context: Context<Declaration>): string {
  let rendered = _renderNode(node, context);
  if (rendered === '!null') {
    rendered = '';
  }

  return rendered;
}