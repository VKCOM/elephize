import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';

export function tJsxAttributes(node: ts.JsxAttributes): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      let synList: string[] = [];
      let toRender: NodeInfo[] = [];
      const [syntaxList] = self.children;
      for (let i = 0; i < syntaxList.children.length; i++) {
        if (syntaxList.children[i].node.kind === ts.SyntaxKind.JsxSpreadAttribute) {
          const rendered = renderSupportedNodes(toRender, context);
          if (rendered.length > 0) {
            synList = synList.concat('[' + rendered.join(', ') + ']');
            toRender = [];
          }
          synList.push(renderSupportedNodes(syntaxList.children[i].children, context)[0]);
        } else {
          // We suppose that indexes of children match strictly in original tree and render tree!
          const attr = node.properties[i];
          if (attr.kind === ts.SyntaxKind.JsxAttribute && !attr.name.text.startsWith('on') /* remove event handlers */) {
            toRender.push(syntaxList.children[i]);
          }
        }
      }

      const rendered = renderSupportedNodes(toRender, context);
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
  };
}
