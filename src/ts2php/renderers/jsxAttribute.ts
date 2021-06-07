import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { intrinsicElements } from '../internalConfig/intrinsicElements';
import * as callbackAttrs from '../../../data/domattrs.json';
import { renderNode } from '../components/codegen/renderNodes';
import { getPhpPrimitiveType } from '../components/typeInference/basicTypes';

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

  if (node.name.getText() === 'ref') { // We don't support react refs on server side
    return '';
  }

  if (!node.initializer) { // react boolean attribute
    return `"${node.name.getText()}" => true`;
  }

  const jsxel = node.parent.parent; // opening jsx / self-closing jsx
  if (intrinsicElements[jsxel.tagName.getText()] && node.name.getText() !== 'style' && !callbackAttrs.includes(node.name.getText())) {
    // validate intrinsic attributes: now we support only strings, with exception of 'object' for 'style' attr
    const attrInitializer = (node.initializer as any).expression || node.initializer; // 1st for attr={'test'}, 2nd for attr="test"
    const attrType = getPhpPrimitiveType(attrInitializer, context.checker, context.log);
    if (attrType.includes('[]') || attrType.includes('mixed')) {
      context.log.error(
        'Unsupported type of attribute %s: inferred type is %s, but only scalars are supported',
        [jsxel.tagName.getText() + '::' + node.getText(), attrType],
        context.log.ctx(node)
      );
    }
  }

  const expr = renderNode(node.initializer, context);
  return `"${node.name.getText()}" => ${expr}`;
}
