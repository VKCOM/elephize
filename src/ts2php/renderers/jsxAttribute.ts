import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode } from '../components/codegen/renderNodes';
import { JsxExpression } from 'typescript';
import { ObjectLiteralExpression, PropertyAssignment } from 'typescript/lib/tsserverlibrary';
import { ctx, log, LogSeverity } from '../utils/log';

export function tJsxAttribute(node: ts.JsxAttribute, context: Context<Declaration>) {
  if (node.name.getText() === 'dangerouslySetInnerHTML') {
    const expr = (node?.initializer as JsxExpression)?.expression as ObjectLiteralExpression;
    const [prop] = expr?.properties;
    if (!prop?.name || prop?.name.getText() !== '__html') {
      log('Wrong use of dangerouslySetInnerHtml: __html property not found', LogSeverity.ERROR, ctx(node));
      return '';
    }

    const value = (prop as PropertyAssignment).initializer;
    const renderedValue = renderNode(value, context);
    const parentJsxElement = node.parent.parent;
    context.nodeFlagsStore.upsert(parentJsxElement, { prerenderedData: [renderedValue] });
    return '';
  }

  const expr = renderNode(node.initializer, context);
  return `"${node.name.getText()}" => ${expr}`;
}
