import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';

export function tJsxFragment(node: ts.JsxFragment): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => '$this->frg([\n' + renderSupportedNodes(self.children, context).join(',\n') + '\n])'
  };
}
