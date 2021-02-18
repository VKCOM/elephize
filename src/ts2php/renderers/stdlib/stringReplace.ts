import * as ts from 'typescript';
import { ExpressionHook, Declaration } from '../../types';
import { propNameIs } from './_propName';
import { hasType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';
import { extractRegexFlags } from '../../utils/regexFlags';

/**
 * String.prototype.replace support
 *
 * @param node
 * @param context
 */
export const stringReplace: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  const propReplace = propNameIs('replace', node);
  const propReplaceAll = propNameIs('replaceAll', node);
  if (!(propReplace || propReplaceAll)) {
    return undefined;
  }

  if (!hasType(node.expression, context.checker, 'string')) {
    context.log.error('Left-hand expression must have string inferred type', [], context.log.ctx(node));
    return 'null';
  }
  context.nodeFlagsStore.upsert(node, { name: 'string_replace' });
  const varNameNode = (node.expression as ts.PropertyAccessExpression).expression;
  const [pattern, replacement] = renderNodes([...node.arguments], context);

  let varName = renderNode(varNameNode, context);
  // replace can use string or regexp as pattern, so we should check inferred type of argument.
  let nd: ts.Node = node.arguments[0];
  let type = context.checker.getTypeAtLocation(nd);
  if (type.isStringLiteral() || context.checker.typeToString(type, nd, ts.TypeFormatFlags.None) === 'string') {
    // string literals as pattern
    if (propReplaceAll) {
      return `str_replace(${pattern}, ${replacement}, ${varName})`;
    } else {
      return `implode(${replacement}, explode(${pattern}, ${varName}, 1))`;
    }
  } else if (nd.kind === ts.SyntaxKind.RegularExpressionLiteral) { // regexp instances as pattern
    const reInfo = extractRegexFlags(pattern, context.log, nd);
    const uFlag = context.encoding.includes('utf') ? 'u' : ''; // always append unicode flag if we're outputting unicode
    if (reInfo.globalSearch) {
      return `preg_replace("/${reInfo.expression}/${reInfo.phpFlags}${uFlag}", ${replacement}, ${varName})`;
    } else {
      return `preg_replace("/${reInfo.expression}/${reInfo.phpFlags}${uFlag}", ${replacement}, ${varName}, 1)`;
    }
  } else {
    context.log.error('String.prototype.replace: Non-string and non-regexp-literal patterns are not supported by transpiler.', [], context.log.ctx(node));
    return 'null';
  }
};
