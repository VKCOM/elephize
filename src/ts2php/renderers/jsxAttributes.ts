import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';
import { hasType } from '../components/typeInference/basicTypes';

export function tJsxAttributes(node: ts.JsxAttributes, context: Context<Declaration>) {
  let synList: string[] = [];
  let toRender: ts.Node[] = [];
  for (let i = 0; i < node.properties.length; i++) {
    if (node.properties[i].kind === ts.SyntaxKind.JsxSpreadAttribute) {
      const rendered = renderNodes(toRender, context);
      if (rendered.length > 0) {
        synList = synList.concat('[' + rendered.join(', ') + ']');
        toRender = [];
      }
      synList.push(renderNode(node.properties[i], context));
    } else {
      // We suppose that indexes of children match strictly in original tree and render tree!
      const attr = node.properties[i];

      if (attr.kind === ts.SyntaxKind.JsxAttribute) {
        const value = attr.initializer;

        const isStringValue = value && (value.kind === ts.SyntaxKind.StringLiteral || hasType(value, context.checker, 'string'));
        const isEventListener = attr.name.text.startsWith('on');

        /* remove event handlers */
        if (
          !isEventListener ||
          (
            context.jsxPreferences?.allowStringEvents && isStringValue
          )
        ) {
          toRender.push(node.properties[i]);
        }
      }
    }
  }

  const rendered = renderNodes(toRender, context);
  if (rendered.length > 0) {
    synList = synList.concat('[' + rendered.join(', ') + ']');
  }

  if (synList.length === 0) {
    return '[]';
  }

  if (synList.length === 1) {
    return synList[0];
  }

  return `array_merge(${synList.join(', ')})`;
}
