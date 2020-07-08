import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { getClosestParentOfTypeWithFlag } from '../utils/ast';
import { Context } from '../components/context';
import { normalizeVarName } from '../utils/pathsAndNames';
import * as attrs from '../../../data/domattrs.json';
import { intrinsicElements } from '../internalConfig/intrinsicElements';

export function tPropertyAssignment(node: ts.PropertyAssignment): NodeDescription {
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

      let [name, initializer] = renderSupportedNodes(self.children, context);
      if (!name) {
        throw new Error('Name identifier cannot be empty');
      }

      // Remove quotes - we don't need it in general, but add them back for all except numeric literals.
      name = name.replace(/^["']|["']$/g, '');
      if (!name.match(/^[0-9.]+$/)) {
        name = `"${normalizeVarName(name)}"`;
      }
      return `${name} => ${initializer}`;
    }
  };
}