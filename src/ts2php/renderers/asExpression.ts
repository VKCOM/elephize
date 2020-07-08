import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';

export function tAsExpression(node: ts.AsExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      return renderSupportedNodes([self.children[0]], context)[0];
    }
  };
}
