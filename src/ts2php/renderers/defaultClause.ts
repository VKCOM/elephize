import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';

export function tDefaultClause(node: ts.DefaultClause): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      let expressions = renderSupportedNodes(self.children, context);
      return `default:\n${expressions.join('\n')}`;
    }
  };
}