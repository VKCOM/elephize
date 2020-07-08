import * as ts from 'typescript';
import { Declaration, DeclFlag, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';
import { ctx, log, LogSeverity } from '../utils/log';
import { intrinsicElements } from '../internalConfig/intrinsicElements';

export function tJsxElement(node: ts.JsxElement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      // opening element
      const [/* brace */, /* ident */, attrsNode] = self.children[0].children;
      const [attrs] = renderSupportedNodes([attrsNode], context);
      // child nodes
      const childrenRendered = renderSupportedNodes(self.children[1].children, context);
      const children = childrenRendered && childrenRendered.length
        ? '[' + childrenRendered.join(', ') + ']'
        : '[]';

      if (node.openingElement.tagName.kind !== ts.SyntaxKind.Identifier) {
        log('Non-identifiers are not supported as jsx elements', LogSeverity.ERROR, ctx(node));
        return 'null';
      }

      if (intrinsicElements[node.openingElement.tagName.getText()]) {
        return `$this->h(IntrinsicElement::get("${node.openingElement.tagName.getText().toLowerCase()}"), ${attrs || '[]'}, ${children || '[]'})`;
      } else {
        const declData = context.scope.findByIdent(node.openingElement.tagName.getText());
        if (!declData) {
          log('Component identifier not declared: ' + node.openingElement.tagName.getText(), LogSeverity.ERROR, ctx(node));
          return 'null';
        }
        const [declaration] = declData;
        let component;
        if (declaration.flags & DeclFlag.External || declaration.flags & DeclFlag.DereferencedImport) {
          component = context.registry.getExportedComponent(context.moduleDescriptor, declaration.targetModulePath!, node.openingElement.tagName.getText());
        } else {
          log('Components should be extracted to separate single-class files. If this is not case, something wrong happened :(', LogSeverity.ERROR, ctx(node));
          component = '';
        }
        return `$this->h(${component}, ${attrs || '[]'}, ${children || '[]'})`;
      }
    }
  };
}
