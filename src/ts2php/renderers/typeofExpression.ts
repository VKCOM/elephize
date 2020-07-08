import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { ctx, log, LogSeverity } from '../utils/log';

export function tTypeofExpression(node: ts.TypeOfExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const type = context.checker.getTypeAtLocation(node.expression);
      const evaluatedType = context.checker.typeToString(type, node.expression, ts.TypeFormatFlags.None);
      if (type.getCallSignatures().length === 0 && evaluatedType !== 'any' && evaluatedType !== 'unknown') {
        const [exp] = renderSupportedNodes(self.children, context);
        return `Stdlib::typeof(${exp})`;
      }

      log('Typeof operator does not support `any`/`unknown` and functional arguments ' +
        '(and expressions returning functional types). Ensure that your expression evaluates to ' +
        'non-callable explicit type.', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
  };
}
