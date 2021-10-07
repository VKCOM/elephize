import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import * as attrs from '../../../data/domattrs.json';
import { getClosestParentOfTypeWithFlag } from '../utils/ast';
import { intrinsicElements } from '../internalConfig/intrinsicElements';
import { normalizeVarName, snakify } from '../utils/pathsAndNames';
import { renderNode } from '../components/codegen/renderNodes';
import { checkModificationInNestedScope } from '../components/functionScope';

export function tShorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, context: Context<Declaration>) {
  // This check should be strictly before render! Otherwise it won't work well with var reference count / unused vars elimination
  const parentCall = getClosestParentOfTypeWithFlag(node, ts.SyntaxKind.CallExpression, { name: 'ReactCreateElement' }, context.nodeFlagsStore);
  if (parentCall !== null) {
    if (attrs.includes(node.name.getText())) {
      return '!null'; // special value to omit expression, see renderSupportedNodes
    }
    const flags = context.nodeFlagsStore.get(parentCall);
    const intrinsicElAttrs = flags?.elementName && intrinsicElements[flags.elementName];
    if (intrinsicElAttrs && !intrinsicElAttrs.includes(node.name.getText())) {
      return '!null'; // special value to omit expression, see renderSupportedNodes
    }
  }

  let name = renderNode(node.name, context);
  name = normalizeVarName(name);
  const decl = checkModificationInNestedScope(node.name, context);

  if ((decl?.flags || {}).HoistedToModule) {
    return `"${name}" => $this->${snakify(name)}`;
  }
  return `"${name}" => $${snakify(name)}`;
}
