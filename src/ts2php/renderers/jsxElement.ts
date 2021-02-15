import * as ts from 'typescript';
import { Declaration, DeclFlag } from '../types';
import { Context } from '../components/context';
import { ctx } from '../utils/log';
import { intrinsicElements } from '../internalConfig/intrinsicElements';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';

export function tJsxElement(node: ts.JsxElement, context: Context<Declaration>) {
  // opening element
  const attrs = renderNode(node.openingElement.attributes, context);

  // support for dangerouslySetInnerHtml; don't render children if we have some prerendered data for node
  const innerhtml = context.nodeFlagsStore.get(node.openingElement)?.prerenderedData;

  // child nodes
  const childrenRendered = innerhtml
    ? innerhtml
    : renderNodes([...node.children], context);

  const children = childrenRendered && childrenRendered.length
    ? '[' + childrenRendered.join(', ') + ']'
    : '[]';

  if (node.openingElement.tagName.kind !== ts.SyntaxKind.Identifier) {
    context.log.error('Non-identifiers are not supported as jsx elements', [], ctx(node));
    return 'null';
  }

  if (intrinsicElements[node.openingElement.tagName.getText()]) {
    return `IntrinsicElement::get("${node.openingElement.tagName.getText().toLowerCase()}")->render(${attrs || '[]'}, ${children || '[]'})`;
  } else {
    const declData = context.scope.findByIdent(node.openingElement.tagName.getText());
    if (!declData) {
      context.log.error('Component identifier not declared: %s', [node.openingElement.tagName.getText()], ctx(node));
      return 'null';
    }
    const [declaration] = declData;
    let component;
    if (declaration.flags & DeclFlag.External || declaration.flags & DeclFlag.DereferencedImport) {
      component = context.registry.getExportedComponent(context.moduleDescriptor, declaration.targetModulePath, node.openingElement.tagName.getText());
    } else {
      component = context.registry.getLocalComponent(context.moduleDescriptor, node.openingElement.tagName.getText());
    }

    if (!component) {
      context.log.error('Component not found neither in exports, nor in local scope: %s', [node.openingElement.tagName.getText()], ctx(node));
      return '';
    }
    return `${component}->render(${attrs || '[]'}, ${children || '[]'})`;
  }
}
