import * as ts from 'typescript';
import { Declaration } from '../types';
import { getClosestParentOfTypeWithFlag } from '../utils/ast';
import { Context } from '../components/context';
import { normalizeVarName } from '../utils/pathsAndNames';
import * as attrs from '../../../data/domattrs.json';
import { intrinsicElements } from '../internalConfig/intrinsicElements';
import { renderNodes } from '../components/codegen/renderNodes';

export function tPropertyAssignment(node: ts.PropertyAssignment, context: Context<Declaration>) {
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

  let [name, initializer] = renderNodes([node.name, node.initializer], context);
  if (!name) {
    throw new Error('Name identifier cannot be empty');
  }

  // Computed props don't require quoting magic
  if (node.name.kind === ts.SyntaxKind.ComputedPropertyName) {
    return `${name} => ${initializer}`;
  }

  // Remove quotes - we don't need it in general, but add them back for all except numeric literals.
  name = name.replace(/^["']|["']$/g, '');
  if (!name.match(/^[0-9.]+$/)) {
    name = `"${normalizeVarName(name)}"`;
  }
  return `${name} => ${initializer}`;
}
