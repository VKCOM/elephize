import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { getLeftExpr } from '../utils/ast';
import { Scope } from '../components/unusedCodeElimination/usageGraph';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';
import { checkModificationInNestedScope } from '../components/functionScope';

export function tBinaryExpression(node: ts.BinaryExpression, context: Context<Declaration>) {
  // Support for modification of vars inside closure
  if (node.left.kind === ts.SyntaxKind.Identifier && [
    ts.SyntaxKind.EqualsToken,
    ts.SyntaxKind.PlusEqualsToken,
    ts.SyntaxKind.MinusEqualsToken,
    ts.SyntaxKind.AsteriskEqualsToken,
    ts.SyntaxKind.SlashEqualsToken,
    ts.SyntaxKind.PercentEqualsToken,
    ts.SyntaxKind.BarEqualsToken,
    ts.SyntaxKind.AmpersandEqualsToken
  ].includes(node.operatorToken.kind)) {
    checkModificationInNestedScope(node.left as ts.Identifier, context);
  }
  // Support for modification of properties inside closure
  if ((node.left.kind === ts.SyntaxKind.PropertyAccessExpression || node.left.kind === ts.SyntaxKind.ElementAccessExpression) && [
    ts.SyntaxKind.EqualsToken,
    ts.SyntaxKind.PlusEqualsToken,
    ts.SyntaxKind.MinusEqualsToken,
    ts.SyntaxKind.AsteriskEqualsToken,
    ts.SyntaxKind.SlashEqualsToken,
    ts.SyntaxKind.PercentEqualsToken,
    ts.SyntaxKind.BarEqualsToken,
    ts.SyntaxKind.AmpersandEqualsToken
  ].includes(node.operatorToken.kind)) {
    checkModificationInNestedScope(getLeftExpr(node.left) as ts.Identifier, context);
  }

  let replaceLiteral: string | null = null;
  if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    // php needs . for concatenation so we should check inferred types.
    let typeLeft = context.checker.getTypeAtLocation(node.left);
    let typeRight = context.checker.getTypeAtLocation(node.right);
    if (
      typeLeft.isStringLiteral()
      || typeRight.isStringLiteral()
      || context.checker.typeToString(typeLeft, node.left, ts.TypeFormatFlags.None) === 'string'
      || context.checker.typeToString(typeRight, node.right, ts.TypeFormatFlags.None) === 'string'
    ) {
      replaceLiteral = '.';
    }
  }

  // Elvis operator for simple expressions
  if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
    let typeRight = context.checker.getTypeAtLocation(node.right);
    if (context.checker.typeToString(typeRight, node.right, ts.TypeFormatFlags.None) !== 'boolean') {
      let kind = node.parent?.kind;
      if (kind === ts.SyntaxKind.SyntaxList) {
        kind = node.parent?.parent?.kind;
      }
      if (kind) {
        if (kind === ts.SyntaxKind.BinaryExpression && (node.parent as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.EqualsToken) {
          replaceLiteral = '?:';
        } else if ([
          ts.SyntaxKind.VariableDeclaration,
          ts.SyntaxKind.ParenthesizedExpression,
          ts.SyntaxKind.JsxExpression,
          ts.SyntaxKind.CallExpression
        ].includes(kind)) {
          replaceLiteral = '?:';
        }
      }
    }

    // TODO: more specific cases?
    // TODO: describe these cases in documentation
  }

  // Make ternary expression from && operator
  if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
    let typeRight = context.checker.getTypeAtLocation(node.right);
    if (context.checker.typeToString(typeRight, node.right, ts.TypeFormatFlags.None) !== 'boolean') {
      let kind = node.parent?.kind;
      if (kind === ts.SyntaxKind.SyntaxList) {
        kind = node.parent?.parent?.kind;
      }
      if (kind) {
        if (
          kind === ts.SyntaxKind.BinaryExpression && (node.parent as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.EqualsToken ||
          [
            ts.SyntaxKind.VariableDeclaration,
            ts.SyntaxKind.ParenthesizedExpression,
            ts.SyntaxKind.JsxExpression,
            ts.SyntaxKind.CallExpression
          ].includes(kind)
        ) {

          let leftExpr = renderNode(node.left, context);
          const [usedVars, onUsage] = startVarsCollecting(node, context) || [];
          let rightExpr = renderNode(node.right, context);
          markVarsUsage(node, usedVars || new Set(), onUsage || (() => new Set()), context);
          return `${leftExpr} ? ${rightExpr} : ${leftExpr}`;
        }
      }
    }

    // TODO: more specific cases?
    // TODO: describe these cases in documentation
  }

  if (node.operatorToken.kind === ts.SyntaxKind.InKeyword) {
    let leftExpr = renderNode(node.left, context);
    const [usedVars, onUsage] = startVarsCollecting(node, context) || [];
    let rightExpr = renderNode(node.right, context);
    markVarsUsage(node, usedVars || new Set(), onUsage || (() => new Set()), context);
    return `isset(${rightExpr}[${leftExpr}])`;
  }

  let leftExpr = renderNode(node.left, context);
  const [usedVars, onUsage] = startVarsCollecting(node, context) || [];
  let [operator, rightExpr] = renderNodes([node.operatorToken, node.right], context);
  markVarsUsage(node, usedVars || new Set(), onUsage || (() => new Set()), context);
  if (replaceLiteral) { // replace + with . for string-based operations
    operator = replaceLiteral;
  }

  const flags = context.nodeFlagsStore.get(node);
  if (flags?.forceType && node.left.kind === ts.SyntaxKind.Identifier) {
    const [decl] = context.scope.findByIdent(node.left.getText()) || [];
    if (decl) {
      decl.forcedType = flags.forceType;
    }
  }

  return `${leftExpr} ${operator} ${rightExpr}`;
}

function startVarsCollecting(expr: ts.BinaryExpression, context: Context<Declaration>): [Set<string>, (ident: string) => Set<string>] | undefined {
  const usedVars = new Set<string>();
  const onUsage = (ident: string) => usedVars.add(ident);
  context.scope.addEventListener(Scope.EV_USAGE, onUsage);
  return [usedVars, onUsage];
}

function markVarsUsage(expr: ts.BinaryExpression, usedVars: Set<string>, onUsage: (ident: string) => Set<string>, context: Context<Declaration>) {
  context.scope.removeEventListener(Scope.EV_USAGE, onUsage);
  const leftVal = getLeftExpr(expr.left);
  if (leftVal) {
    // also connect all used vars to varname node as side-effect usage
    for (let ident of Array.from(usedVars)) {
      context.scope.terminateCall(ident, { traceSourceIdent: leftVal.getText(), dryRun: context.dryRun });
    }
  }
}