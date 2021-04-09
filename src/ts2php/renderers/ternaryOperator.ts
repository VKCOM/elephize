import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';

export function tTernaryOperator(node: ts.ConditionalExpression, context: Context<Declaration>) {
  if (node.condition.getText() === 'window._elephizeIsServer') { // special variable for conditional rendering!
    return renderNode(node.whenTrue, context);
  }

  const [condition, ifTrue, ifFalse] = renderNodes([node.condition, node.whenTrue, node.whenFalse], context, false);
  return `${condition} ? ${ifTrue} : ${ifFalse}`;
}
