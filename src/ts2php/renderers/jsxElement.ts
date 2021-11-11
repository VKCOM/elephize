import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { intrinsicElements } from '../internalConfig/intrinsicElements';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';

export function tJsxElement(node: ts.JsxElement, context: Context<Declaration>) {
  // opening element
  const attrs = renderNode(node.openingElement.attributes, context);

  // support for dangerouslySetInnerHtml; don't render children if we have some prerendered data for node
  const innerhtml = context.nodeFlagsStore.get(node.openingElement)?.prerenderedData;

  context.jsxPush(node.openingElement.tagName.getText());
  // child nodes
  const childrenRendered = innerhtml ?
    innerhtml :
    renderNodes([...node.children], context);
  context.jsxPop(node.openingElement.tagName.getText());

  const children = childrenRendered && childrenRendered.length ?
    '[' + childrenRendered.join(', ') + ']' :
    '[]';

  if (node.openingElement.tagName.kind === ts.SyntaxKind.PropertyAccessExpression) {
    // Probably react context provider?
    if (
      node.openingElement.tagName.name.getText() === 'Provider' &&
      context.checker.getTypeAtLocation(node.openingElement.tagName.expression)?.symbol.escapedName === 'Context'
    ) {
      const contextValue = renderNode(
        node.openingElement.attributes.properties
          .find<ts.JsxAttribute>((prop): prop is ts.JsxAttribute => {
          return prop.kind === ts.SyntaxKind.JsxAttribute && prop.name?.getText() === 'value';
        })?.initializer,
        context
      );
      const contextNode = renderNode(node.openingElement.tagName.expression, context);
      const ctxChildren = renderNodes(Array.from(node.children), context, true).join(', ');
      return `\\${context.namespaces.builtins}\\ReactContextSynthetic::spawn()
        ->pushContext(${contextNode}, ${contextValue})
        ->render([${ctxChildren}])
        ->popContext(${contextNode})`;
    }
  }

  if (node.openingElement.tagName.kind !== ts.SyntaxKind.Identifier) {
    context.log.error('Non-identifiers are not supported as jsx elements', [], context.log.ctx(node));
    return 'null';
  }

  if (intrinsicElements[node.openingElement.tagName.getText()]) {
    return `\\${context.namespaces.builtins}\\IntrinsicElement::get("${node.openingElement.tagName.getText().toLowerCase()}")->render(${attrs || '[]'}, ${children || '[]'})`;
  } else {
    const declData = context.scope.findByIdent(node.openingElement.tagName.getText());
    if (!declData) {
      context.log.error('Component identifier not declared: %s', [node.openingElement.tagName.getText()], context.log.ctx(node));
      return 'null';
    }
    const [declaration] = declData;
    let component;
    if (declaration.flags.External || declaration.flags.DereferencedImport) {
      component = context.registry.getExportedComponent(context.moduleDescriptor, declaration.targetModulePath, node.openingElement.tagName.getText());
    } else {
      component = context.registry.getLocalComponent(context.moduleDescriptor, node.openingElement.tagName.getText());
    }

    if (!component) {
      context.log.error('Component not found neither in exports, nor in local scope: %s', [node.openingElement.tagName.getText()], context.log.ctx(node));
      return '';
    }
    return `${component}->render(${attrs || '[]'}, ${children || '[]'})`;
  }
}
