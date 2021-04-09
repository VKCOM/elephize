import * as ts from 'typescript';
import { ExpressionHook, Declaration } from '../../types';
import { propNameIs } from './_propName';
import { hasType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import { renderNode } from '../../components/codegen/renderNodes';
import { extractRegexFlags } from '../../utils/regexFlags';

/**
 * String.prototype.match support
 *
 * @param node
 * @param context
 */
export const stringMatch: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('match', node)) {
    return undefined;
  }

  if (!hasType(node.expression, context.checker, 'string')) {
    context.log.error('Left-hand expression must have string inferred type', [], context.log.ctx(node));
    return 'null';
  }
  context.nodeFlagsStore.upsert(node, { name: 'string_match' });
  const varNameNode = (node.expression as ts.PropertyAccessExpression).expression;
  const pattern = renderNode(node.arguments[0], context);

  const varName = renderNode(varNameNode, context);
  const nd: ts.Node = node.arguments[0];
  if (nd.kind === ts.SyntaxKind.RegularExpressionLiteral) { // we support only regexp literals as pattern
    const reInfo = extractRegexFlags(pattern, context.log, nd);
    const uFlag = context.encoding.includes('utf') ? 'u' : ''; // always append unicode flag if we're outputting unicode
    if (reInfo.globalSearch) {
      context.log.warn('Global search flag with String.prototype.match may output unexpected results. Check your code.', [], context.log.ctx(node));
      return `Stdlib::strMatchG("/${reInfo.expression}/${reInfo.phpFlags}${uFlag}", ${varName})`;
    } else {
      return `Stdlib::strMatch("/${reInfo.expression}/${reInfo.phpFlags}${uFlag}", ${varName})`;
    }
  } else {
    context.log.error('String.prototype.match: Non-string and non-regexp-literal patterns are not supported by transpiler.', [], context.log.ctx(node));
    return 'null';
  }
};
