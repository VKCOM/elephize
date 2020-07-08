import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';

export function tCaseClause(node: ts.CaseClause): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      let [condition, ...expressions] = renderSupportedNodes(self.children, context);
      return `case ${condition}:\n${expressions.join('\n')}`;
    }
  };
}