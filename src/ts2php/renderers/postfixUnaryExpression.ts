import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';
import { ctx, log, LogSeverity } from '../utils/log';
import { assertLocalModification } from './stdlib/_assert';

export function tPostfixUnaryExpression(node: ts.PostfixUnaryExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      if (node.operand.kind === ts.SyntaxKind.Identifier) {
        assertLocalModification(node.operand as ts.Identifier, context);
        let type = context.checker.getTypeAtLocation(node.operand);
        if (context.checker.typeToString(type, node.operand, ts.TypeFormatFlags.None) !== 'number') {
          log('Trying to apply unary inc/dec operator to non-number variable. This is probably an error.', LogSeverity.ERROR, ctx(node));
        }
      }

      let [content, operator] = renderSupportedNodes(self.children, context);
      return `${content}${operator}`;
    }
  };
}
