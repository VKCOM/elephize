import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode } from '../components/codegen/renderNodes';
import { escapeExprLiteral } from '../utils/escapeString';
import { getClosestParentOfAnyType } from '../utils/ast';
import { intrinsicElements } from '../internalConfig/intrinsicElements';
import { hasType } from '../components/typeInference/basicTypes';

export const tJsxExpression = (node: ts.JsxExpression, context: Context<Declaration>) => {
  // We should add forced escaping only in intrinsic elements attributes and direct children
  const tag = getClosestParentOfAnyType(node, [ts.SyntaxKind.JsxSelfClosingElement, ts.SyntaxKind.JsxOpeningElement]) as ts.JsxOpeningElement | ts.JsxSelfClosingElement | null;
  const tagName = tag?.tagName.getText() || context.jsxPeak(); // Don't do toLowerCase here, or custom module names may interfere with intrinsic tag names.
  if (tagName && intrinsicElements[tagName]) {
    if (node.parent.kind === ts.SyntaxKind.JsxAttribute && node.expression?.kind === ts.SyntaxKind.StringLiteral) {
      return `\\${context.namespaces.builtins}\\IntrinsicElement::escape(` + escapeExprLiteral((node.expression as ts.StringLiteral).text) + ')';
    }
    if (shouldEscape(node.expression, context)) {
      return `\\${context.namespaces.builtins}\\IntrinsicElement::escape(` + renderNode(node.expression, context) + ')';
    }
  }

  // Just render nodes for all other components
  return renderNode(node.expression, context);
};

// Check if jsx expression should be html-escaped while rendering on server side
function shouldEscape(node: ts.Expression | undefined, context: Context<Declaration>) {
  if (!node) {
    return false;
  }

  if (ts.isLiteralExpression(node) || ts.isNumericLiteral(node) || ts.isStringLiteral(node)) {
    return false;
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword || node.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }

  if (node.kind === ts.SyntaxKind.CallExpression) {
    const sig = context.checker.getResolvedSignature(node as ts.CallExpression);
    if (sig) {
      const retType = context.checker.getReturnTypeOfSignature(sig);
      if (!checkExprType(retType, context.checker)) {
        return false;
      }
    }
  }

  // Don't escape style attribute, it's safety should be checked by client
  if (node.parent.parent.kind === ts.SyntaxKind.JsxAttribute && (node.parent.parent as ts.JsxAttribute).name.getText() === 'style') {
    return false;
  }

  // Workaround. Escape children only it's a string or a string array. TODO: Add more precise check somehow
  if (node.getText() === 'children') {
    if (hasType(node, context.checker, 'string') || hasType(node, context.checker, 'string[]')) {
      return true;
    }
  }

  // Finally, check expressions and identifiers
  const nodeType = context.checker.getTypeAtLocation(node);
  if (!checkExprType(nodeType, context.checker)) {
    return false;
  }

  return true;
}

function checkExprType(type: ts.Type | undefined, checker: ts.TypeChecker): boolean {
  let typeSymbol: ts.Symbol | undefined;
  if (type?.getSymbol()?.escapedName === 'Array') {
    const typeArg = checker.getTypeArguments(type as ts.TypeReference /* <- may be incorrect! */)[0];
    typeSymbol = typeArg.getSymbol() || typeArg.aliasSymbol;
  } else {
    typeSymbol = type?.getSymbol() || type?.aliasSymbol;
    if (!typeSymbol && type) { // try getting apparent type
      typeSymbol = checker.getApparentType(type)?.getSymbol();
    }
  }

  if (typeSymbol?.escapedName === 'Number' || typeSymbol?.escapedName === 'Boolean') {
    return false; // Do not escape simple types
  }

  const parentSymbol: ts.Symbol | undefined = (typeSymbol as any)?.parent;

  if (parentSymbol?.escapedName === 'JSX' && typeSymbol?.escapedName === 'Element') {
    return false; // Do not escape components and intrinsic tags
  }

  if (parentSymbol?.escapedName === 'React' && (
    typeSymbol?.escapedName === 'ReactNode' || typeSymbol?.escapedName === 'ReactElement'
  )) {
    return false;
  }

  return true;
}
