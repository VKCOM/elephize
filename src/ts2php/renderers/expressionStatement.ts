import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';

export function tExpressionStatement(node: ts.ExpressionStatement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const children = self.children;
      let content = children[0].node.gen(children[0], context);
      if (self.flags.drop || content.length === 0) {
        return '';
      }

      const additionalExpressions = (self.flags.addExpressions || []).join('\n');
      const expr = (additionalExpressions ? additionalExpressions + '\n' : '') +
        content + (self.flags.passthrough ? '' : ';');

      if (isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
      }
      return expr;
    }
  };
}