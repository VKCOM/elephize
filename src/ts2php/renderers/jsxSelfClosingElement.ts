import * as ts from 'typescript';
import { Declaration, DeclFlag, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';
import { ctx, log, LogSeverity } from '../utils/log';
import { intrinsicElements } from '../internalConfig/intrinsicElements';

export function tJsxSelfClosingElement(node: ts.JsxSelfClosingElement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const [/* brace */, /* ident */, attrsNode] = self.children;
      const [attrs] = renderSupportedNodes([attrsNode], context);
      if (node.tagName.kind !== ts.SyntaxKind.Identifier) {
        log('Non-identifiers are not supported as jsx elements', LogSeverity.ERROR, ctx(node));
        return 'null';
      }

      if (intrinsicElements[node.tagName.getText()]) {
        return `$this->h(IntrinsicElement::get("${node.tagName.getText()}"), ${attrs || '[]'}, [])`;
      } else {
        const decl = context.scope.findByIdent(node.tagName.getText());
        if (!decl) {
          log('Component identifier not declared: ' + node.tagName.getText(), LogSeverity.ERROR, ctx(node));
          return 'null';
        }
        const [declaration] = decl;

        let component;
        if (declaration.flags & DeclFlag.External || declaration.flags & DeclFlag.DereferencedImport) {
          component = context.registry.getExportedComponent(context.moduleDescriptor, declaration.targetModulePath!, node.tagName.getText());
        } else {
          log('Components should be extracted to separate single-class files. If this is not case, something wrong happened :(', LogSeverity.ERROR, ctx(node));
          component = '';
        }
        return `$this->h(${component}, ${attrs || '[]'}, [])`;
      }
    }
  };
}
