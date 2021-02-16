import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode } from '../components/codegen/renderNodes';

export function tJsxAttribute(node: ts.JsxAttribute, context: Context<Declaration>) {
  if (node.name.getText() === 'dangerouslySetInnerHTML') {
    const expr = (node?.initializer as ts.JsxExpression)?.expression as ts.ObjectLiteralExpression;
    const [prop] = expr?.properties;
    if (!prop?.name || prop?.name.getText() !== '__html') {
      context.log.error('Wrong use of dangerouslySetInnerHtml: __html property not found', [], context.log.ctx(node));
      return '';
    }

    const value = (prop as ts.PropertyAssignment).initializer;
    const renderedValue = renderNode(value, context);
    const parentJsxElement = node.parent.parent;
    context.nodeFlagsStore.upsert(parentJsxElement, { prerenderedData: [renderedValue] });
    return '';
  }

  const expr = renderNode(node.initializer, context);
  return `"${node.name.getText()}" => ${expr}`;
}
