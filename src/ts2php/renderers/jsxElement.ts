import * as ts from 'typescript';
import { Declaration, DeclFlag } from '../types';
import { Context } from '../components/context';
import { ctx, log, LogSeverity } from '../utils/log';
import { intrinsicElements } from '../internalConfig/intrinsicElements';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';

export function tJsxElement(node: ts.JsxElement, context: Context<Declaration>) {
  // opening element
  const attrs = renderNode(node.openingElement.attributes, context);
  // child nodes
  const childrenRendered = renderNodes([...node.children], context);
  const children = childrenRendered && childrenRendered.length
    ? '[' + childrenRendered.join(', ') + ']'
    : '[]';

  if (node.openingElement.tagName.kind !== ts.SyntaxKind.Identifier) {
    log('Non-identifiers are not supported as jsx elements', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  if (intrinsicElements[node.openingElement.tagName.getText()]) {
    return `IntrinsicElement::get("${node.openingElement.tagName.getText().toLowerCase()}")->render(${attrs || '[]'}, ${children || '[]'})`;
  } else {
    const declData = context.scope.findByIdent(node.openingElement.tagName.getText());
    if (!declData) {
      log('Component identifier not declared: ' + node.openingElement.tagName.getText(), LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    const [declaration] = declData;
    let component;
    if (declaration.flags & DeclFlag.External || declaration.flags & DeclFlag.DereferencedImport) {
      component = context.registry.getExportedComponent(context.moduleDescriptor, declaration.targetModulePath, node.openingElement.tagName.getText());
    } else {
      log('Components should be extracted to separate single-class files. If this is not case, something wrong happened :(', LogSeverity.ERROR, ctx(node));
      component = '';
    }
    return `${component}->render(${attrs || '[]'}, ${children || '[]'})`;
  }
}
