import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';

export function tBlock(node: ts.Block): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      // Don't support block-scoped vars for now, as we transpile to es3 first.
      const children = self.children;
      return ['{', ...renderSupportedNodes(children, context), '}'].join('\n');
    }
  };
}