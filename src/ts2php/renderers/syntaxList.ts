import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { fetchAllBindingIdents, flagParentOfType, getClosestParentOfType } from '../utils/ast';
import { Context } from '../components/context';

export function tSyntaxList(node: ts.SyntaxList): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      self.flags.elIndex = 1; // reset index for params
      // This block is only for callback argument list!
      let parentNode = getClosestParentOfType(self, ts.SyntaxKind.CallExpression);

      if (self.parent?.node.kind === ts.SyntaxKind.FunctionExpression || self.parent?.node.kind === ts.SyntaxKind.ArrowFunction) {
        const children = node.getChildren().filter((el) => el.kind !== ts.SyntaxKind.CommaToken);
        switch (parentNode?.flags.name) {
          case 'array_map':
          case 'array_reduce':
          case 'array_filter':
          case 'array_some':
          case 'array_find':
            flagParentOfType(self, [ts.SyntaxKind.CallExpression], { childCount: children.length });
            break;
          case 'array_foreach':
            flagParentOfType(self, [ts.SyntaxKind.CallExpression], { rawNodes: children });
            break;
          default:
        }
      }

      if (parentNode?.flags.name === 'string_split') { // Separate klutch, it should not be under function expression check
        const children = node.getChildren().filter((el) => el.kind !== ts.SyntaxKind.CommaToken);
        flagParentOfType(self, [ts.SyntaxKind.CallExpression], { rawNodes: children });
      }

      // Declare all parameters
      if (node.parent.kind === ts.SyntaxKind.FunctionDeclaration ||
        node.parent.kind === ts.SyntaxKind.FunctionExpression ||
        node.parent.kind === ts.SyntaxKind.ArrowFunction
      ) {
        node._children.map(fetchAllBindingIdents)
          .reduce((acc, val) => acc.concat(val), []) // flatten;
          .forEach((ident) => context.scope.addDeclaration(ident.getText(), [], { terminateLocally: true, dryRun: context.dryRun }));
      }

      let nodes = renderSupportedNodes(self.children, context);

      let delimiter = '\n';
      if (node.parent.kind === ts.SyntaxKind.CallExpression ||
        node.parent.kind === ts.SyntaxKind.ArrayLiteralExpression ||
        node.parent.kind === ts.SyntaxKind.VariableDeclarationList ||
        node.parent.kind === ts.SyntaxKind.FunctionDeclaration ||
        node.parent.kind === ts.SyntaxKind.FunctionExpression ||
        node.parent.kind === ts.SyntaxKind.ArrowFunction ||
        node.parent.kind === ts.SyntaxKind.JsxElement
      ) {
        delimiter = ', ';
      }

      if (node.parent.kind === ts.SyntaxKind.TemplateExpression) {
        delimiter = ' . ';
      }

      if (self.parent?.node.kind === ts.SyntaxKind.VariableDeclarationList && self.parent.flags.forceType === 'split') {
        delimiter = ';\n';
      }

      if (node.parent.kind === ts.SyntaxKind.ObjectLiteralExpression || node.parent.kind === ts.SyntaxKind.JsxFragment) {
        delimiter = ',\n';
      }

      return nodes.join(delimiter);
    }
  };
}
