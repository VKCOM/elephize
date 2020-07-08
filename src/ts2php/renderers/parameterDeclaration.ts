import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';
import { flagParentOfType, getClosestParentOfAnyType, getClosestParentOfType } from '../utils/ast';
import { renderElements as renderObjectBinding } from './objectBindingPattern';
import { renderElements as renderArrayBinding } from './arrayBindingPattern';
import { snakify } from '../utils/pathsAndNames';

export function tParameterDeclaration(node: ts.ParameterDeclaration): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      // Object/array destructuring
      if (node.name.kind === ts.SyntaxKind.ObjectBindingPattern || node.name.kind === ts.SyntaxKind.ArrayBindingPattern) {
        // Expression, make dummy var
        const index = getClosestParentOfType(self, ts.SyntaxKind.SyntaxList)?.flags.elIndex || 0;
        const varName = `__param_destruct_${index}`;
        flagParentOfType(self, [ts.SyntaxKind.SyntaxList], { elIndex: index + 1 });
        const { renderedString, identList } = node.name.kind === ts.SyntaxKind.ObjectBindingPattern
          ? renderObjectBinding(node.name, varName, context)
          : renderArrayBinding(node.name, varName, context);

        identList.forEach((ident) => context.scope.addDeclaration(ident.getText(), [], { dryRun: context.dryRun }));

        // renderedVars may be non-empty if there are more than 1 destructured parameter
        const vars = getClosestParentOfAnyType(self, [
          ts.SyntaxKind.FunctionExpression,
          ts.SyntaxKind.FunctionDeclaration,
          ts.SyntaxKind.ArrowFunction
        ])?.flags.destructuringInfo?.vars || '';

        flagParentOfType(self, [
          ts.SyntaxKind.FunctionExpression,
          ts.SyntaxKind.FunctionDeclaration,
          ts.SyntaxKind.ArrowFunction
        ], { destructuringInfo: { vars: [vars, renderedString].filter((el) => !!el).join('\n') }});

        return `$${snakify(varName)}`;
      }

      if (node.dotDotDotToken) {
        return `...$${node.name.getText()}`;
      }
      return `$${snakify(node.name.getText())}`;
    }
  };
}
