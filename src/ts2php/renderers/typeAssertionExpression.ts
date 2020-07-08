import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';

export function tTypeAssertionExpression(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      // Type assertion is always 3 elements (e.g. <, any, >), and 4th is expression to evaluate:
      return renderSupportedNodes([self.children[3]], context)[0];
    }
  };
}
