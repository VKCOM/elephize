import * as ts from 'typescript';
import { Declaration, DeclFlag, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import * as attrs from '../../../data/domattrs.json';
import { getClosestParentOfTypeWithFlag } from '../utils/ast';
import { intrinsicElements } from '../internalConfig/intrinsicElements';
import { normalizeVarName, snakify } from '../utils/pathsAndNames';
import { assertLocalModification } from './stdlib/_assert';

export function tShorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      // This check should be strictly before render! Otherwise it won't work well with var reference count / unused vars elimination
      const parentCall = getClosestParentOfTypeWithFlag(self, ts.SyntaxKind.CallExpression, { name: 'ReactCreateElement'});
      if (parentCall !== null) {
        if (attrs.includes(node.name.getText())) {
          return '!null'; // special value to omit expression, see renderSupportedNodes
        }
        const intrinsicElAttrs = parentCall.flags.elementName && intrinsicElements[parentCall.flags.elementName];
        if (intrinsicElAttrs && !intrinsicElAttrs.includes(node.name.getText())) {
          return '!null'; // special value to omit expression, see renderSupportedNodes
        }
      }

      let [name] = renderSupportedNodes(self.children, context);
      name = normalizeVarName(name);
      const decl = assertLocalModification(node.name, context);

      if ((decl?.flags || 0) & DeclFlag.HoistedToModule) {
        return `"${name}" => $this->${snakify(name)}`;
      }
      return `"${name}" => $${snakify(name)}`;
    }
  };
}
