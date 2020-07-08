import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';

export function tJsxAttribute(node: ts.JsxAttribute): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const [/* ident */, /* eq */, exprNode] = self.children;
      const [expr] = renderSupportedNodes([exprNode], context);
      return `"${node.name.getText()}" => ${expr}`;
    }
  };
}
