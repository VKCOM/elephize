import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';

export function tSpreadAssignment(node: ts.SpreadAssignment): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => renderSupportedNodes(self.children, context)[0]
  };
}
