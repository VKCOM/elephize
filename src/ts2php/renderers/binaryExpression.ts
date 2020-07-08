import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';
import { getLeftExpr } from '../utils/ast';
import { assertLocalModification } from './stdlib/_assert';
import { Scope } from '../components/unusedCodeElimination/usageGraph';

export function tBinaryExpression(node: ts.BinaryExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const children = self.children;

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
        assertLocalModification(node.left as ts.Identifier, context);
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
        assertLocalModification(getLeftExpr(node.left) as ts.Identifier, context);
      }

      let replaceLiteral: string | null = null;
      if (children[1].node.kind === ts.SyntaxKind.PlusToken) {
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
      if (children[1].node.kind === ts.SyntaxKind.BarBarToken) {
        let typeRight = context.checker.getTypeAtLocation(node.right);
        if (context.checker.typeToString(typeRight, node.right, ts.TypeFormatFlags.None) !== 'boolean') {
          let kind = self.parent?.node.kind;
          if (kind === ts.SyntaxKind.SyntaxList) {
            kind = self.parent?.parent?.node.kind;
          }
          if (kind) {
            if (kind === ts.SyntaxKind.BinaryExpression && self.parent?.children[1].node.kind === ts.SyntaxKind.EqualsToken) {
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
      if (children[1].node.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
        let typeRight = context.checker.getTypeAtLocation(node.right);
        if (context.checker.typeToString(typeRight, node.right, ts.TypeFormatFlags.None) !== 'boolean') {
          let kind = self.parent?.node.kind;
          if (kind === ts.SyntaxKind.SyntaxList) {
            kind = self.parent?.parent?.node.kind;
          }
          if (kind) {
            if (
              kind === ts.SyntaxKind.BinaryExpression && self.parent?.children[1].node.kind === ts.SyntaxKind.EqualsToken ||
              [
                ts.SyntaxKind.VariableDeclaration,
                ts.SyntaxKind.ParenthesizedExpression,
                ts.SyntaxKind.JsxExpression,
                ts.SyntaxKind.CallExpression
              ].includes(kind)
            ) {

              const [usedVars, onUsage] = startVarsCollecting(node, context) || [];
              let [leftExpr, /*operator*/, rightExpr] = renderSupportedNodes(children, context, false);
              markVarsUsage(node, usedVars || new Set(), onUsage || (() => new Set()), context);
              return `${leftExpr} ? ${rightExpr} : ${leftExpr}`;
            }
          }
        }

        // TODO: more specific cases?
        // TODO: describe these cases in documentation
      }

      if (node.operatorToken.kind === ts.SyntaxKind.InKeyword) {
        const [usedVars, onUsage] = startVarsCollecting(node, context) || [];
        let [leftExpr, /*operator*/, rightExpr] = renderSupportedNodes(children, context, false);
        markVarsUsage(node, usedVars || new Set(), onUsage || (() => new Set()), context);
        return `isset(${rightExpr}[${leftExpr}])`;
      }

      const [usedVars, onUsage] = startVarsCollecting(node, context) || [];
      let [leftExpr, operator, rightExpr] = renderSupportedNodes(children, context);
      markVarsUsage(node, usedVars || new Set(), onUsage || (() => new Set()), context);
      if (replaceLiteral) { // replace + with . for string-based operations
        operator = replaceLiteral;
      }

      if (self.flags.forceType && node.left.kind === ts.SyntaxKind.Identifier) {
        const [decl] = context.scope.findByIdent(node.left.getText()) || [];
        if (decl) {
          decl.forcedType = self.flags.forceType;
        }
      }

      return `${leftExpr} ${operator} ${rightExpr}`;
    }
  };
}

const stopOperators = [
  ts.SyntaxKind.EqualsToken,
  ts.SyntaxKind.PlusEqualsToken,
  ts.SyntaxKind.MinusEqualsToken,
  ts.SyntaxKind.AsteriskEqualsToken,
  ts.SyntaxKind.SlashEqualsToken,
  ts.SyntaxKind.AmpersandEqualsToken,
  ts.SyntaxKind.BarEqualsToken,
];

function startVarsCollecting(expr: ts.BinaryExpression, context: Context<Declaration>): [Set<string>, (ident: string) => Set<string>] | undefined {
  if (stopOperators.includes(expr.operatorToken.kind)) {
    return;
  }
  const usedVars = new Set<string>();
  const onUsage = (ident: string) => usedVars.add(ident);
  context.scope.addEventListener(Scope.EV_USAGE, onUsage);
  return [usedVars, onUsage];
}

function markVarsUsage(expr: ts.BinaryExpression, usedVars: Set<string>, onUsage: (ident: string) => Set<string>, context: Context<Declaration>) {
  if (stopOperators.includes(expr.operatorToken.kind)) {
    return;
  }

  context.scope.removeEventListener(Scope.EV_USAGE, onUsage);
  const leftVal = getLeftExpr(expr.left);
  if (leftVal) {
    // also connect all used vars to varname node as side-effect usage
    for (let ident of Array.from(usedVars)) {
      context.scope.terminateCall(ident, { traceSourceIdent: leftVal.getText(), dryRun: context.dryRun });
    }
  }
}