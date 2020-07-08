import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { ExpressionHook, NodeInfo, NodeDescription, Declaration } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { getNodeInfo } from '../index';
import { propNameIs } from './_propName';
import { assertType } from './_assert';
import { Context } from '../../components/context';
import { getChildrenByTree } from '../../utils/ast';

/**
 * String.prototype.split support
 *
 * @param node
 * @param self
 * @param context
 */
export const stringSplit: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('split', node)) {
    return undefined;
  }
  if (!assertType(node.expression, context.checker, 'string')) {
    log('Left-hand expression must have string inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  self.flags.name = 'string_split';
  const [[varNameNode], argsNode]: any = getChildrenByTree(self, [
    [ts.SyntaxKind.PropertyAccessExpression, [ts.SyntaxKind.Identifier]],
    ts.SyntaxKind.SyntaxList
  ]);
  renderSupportedNodes([argsNode], context);
  let args = self.flags.rawNodes as ts.Node[];
  if (!args || !args[0]) {
    log('String.prototype.split: can\'t find separator in call [1].', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  // TODO: Hack
  let [separator, limit] = args[1]
    ? renderSupportedNodes([
      {
        node: getNodeInfo(args[0]) as unknown as NodeDescription,
        checker: context.checker,
        compilerOptions: context.compilerOptions,
        children: [],
        flags: {}
      },
      {
        node: getNodeInfo(args[1]) as unknown as NodeDescription,
        checker: context.checker,
        compilerOptions: context.compilerOptions,
        children: [],
        flags: {}
      }
    ], context)
    : renderSupportedNodes([
      {
        node: getNodeInfo(args[0]) as unknown as NodeDescription,
        checker: context.checker,
        compilerOptions: context.compilerOptions,
        children: [],
        flags: {}
      }
    ], context);

  // split can use string or regexp as separator, so we should check inferred type of argument.
  let nd: ts.Node = args[0];
  let type = context.checker.getTypeAtLocation(nd);
  if (type.isStringLiteral() || context.checker.typeToString(type, nd, ts.TypeFormatFlags.None) === 'string') {
    // string literals as separators
    let [varName] = renderSupportedNodes([varNameNode], context);
    if (limit) {
      return `explode(${separator}, ${varName}, ${limit})`;
    } else {
      return `explode(${separator}, ${varName})`;
    }
  } else if (args[0].kind === ts.SyntaxKind.RegularExpressionLiteral) {
    // regexp instances as separators
    let [varName] = renderSupportedNodes([varNameNode], context);
    if (limit) {
      return `preg_split(${separator}, ${varName}, ${limit})`;
    } else {
      return `preg_split(${separator}, ${varName})`;
    }
  } else {
    log('String.prototype.split: Non-string and non-regexp-literal separators are not supported by transpiler.', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
};
