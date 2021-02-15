import * as ts from 'typescript';
import { Declaration, DeclFlag } from '../types';
import { Context } from '../components/context';
import { ctx, LogSeverity } from '../utils/log';
import { intrinsicElements } from '../internalConfig/intrinsicElements';
import { renderNode } from '../components/codegen/renderNodes';

export function tJsxSelfClosingElement(node: ts.JsxSelfClosingElement, context: Context<Declaration>) {
  const attrs = renderNode(node.attributes, context);
  if (node.tagName.kind !== ts.SyntaxKind.Identifier) {
    context.log('Non-identifiers are not supported as jsx elements', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  if (intrinsicElements[node.tagName.getText()]) {
    return `IntrinsicElement::get("${node.tagName.getText()}")->render(${attrs || '[]'}, [])`;
  } else {
    const decl = context.scope.findByIdent(node.tagName.getText());
    if (!decl) {
      context.log('Component identifier not declared: ' + node.tagName.getText(), LogSeverity.ERROR, ctx(node));
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
      context.log(`Component not found neither in exports, nor in local scope: ${node.tagName.getText()}`, LogSeverity.ERROR, ctx(node));
      return '';
    }
    return `${component}->render(${attrs || '[]'}, [])`;
  }
}