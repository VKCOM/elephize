import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';

export function tSpreadElement(node: ts.SpreadElement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    // Do not add ... here because it's not really needed in some cases
    gen: (self: NodeInfo, context: Context<Declaration>) => renderSupportedNodes(self.children, context)[0]
  };
}
