import * as ts from 'typescript';
import { Declaration, DeclFlag } from '../types';
import { Context } from '../components/context';
import { intrinsicElements } from '../internalConfig/intrinsicElements';
import { renderNode } from '../components/codegen/renderNodes';

export function tJsxSelfClosingElement(node: ts.JsxSelfClosingElement, context: Context<Declaration>) {
  const attrs = renderNode(node.attributes, context);
  // support for dangerouslySetInnerHtml; don't render children if we have some prerendered data for node
  const innerhtml = context.nodeFlagsStore.get(node)?.prerenderedData || [];

  if (node.tagName.kind !== ts.SyntaxKind.Identifier) {
    context.log.error('Non-identifiers are not supported as jsx elements', [], context.log.ctx(node));
    return 'null';
  }

  if (intrinsicElements[node.tagName.getText()]) {
    return `IntrinsicElement::get("${node.tagName.getText()}")->render(${attrs || '[]'}, [${innerhtml.join(', ')}])`;
  } else {
    const decl = context.scope.findByIdent(node.tagName.getText());
    if (!decl) {
      context.log.error('Component identifier not declared: %s', [node.tagName.getText()], context.log.ctx(node));
      return 'null';
    }
    const [declaration] = decl;

    let component;
    if (declaration.flags & DeclFlag.External || declaration.flags & DeclFlag.DereferencedImport) {
      component = context.registry.getExportedComponent(context.moduleDescriptor, declaration.targetModulePath, node.tagName.getText());
    } else {
      component = context.registry.getLocalComponent(context.moduleDescriptor, node.tagName.getText());
    }

    if (!component) {
      context.log.error('Component not found neither in exports, nor in local scope: %s', [node.tagName.getText()], context.log.ctx(node));
      return '';
    }
    return `${component}->render(${attrs || '[]'}, [${innerhtml.join(', ')}])`;
  }
}