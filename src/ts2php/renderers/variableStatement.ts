import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';
import { hasExport } from '../utils/hasExport';
import { getChildByType } from '../utils/ast';

export function tVariableStatement(node: ts.VariableStatement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const exported = hasExport(node);
      const declList = getChildByType(self, ts.SyntaxKind.VariableDeclarationList);

      if (exported) {
        declList?.node.gen(declList, context);

        return [
          ...self.flags.addExpressions || []
        ].join('\n');
      }

      self.flags.localsData = { regStatements: [] };

      let content = declList?.node.gen(declList, context);
      if (!content || content.length === 0) {
        return '';
      }

      const additionalExpressions = (self.flags.addExpressions || []).join('\n');
      return (additionalExpressions ? additionalExpressions + '\n' : '') + content + ';';
    }
  };
}