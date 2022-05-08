import * as ts from 'typescript';
import { Context } from '../components/context';
import { Declaration } from '../types';
import { ClassModule } from '../components/cjsModules/classModule';
import { flagParentOfType } from '../utils/ast';

export const tThis = (node: ts.Node, context: Context<Declaration>) => {
  if (context.moduleDescriptor instanceof ClassModule) {
    return '$this';
  } else {
    // Disallow usage of `this`: we don't support classes and scope binding.
    context.log.error('Keyword `this` is not supported for transpilation', [], context.log.ctx(node));
    flagParentOfType(node, [
      ts.SyntaxKind.ExpressionStatement,
      ts.SyntaxKind.VariableDeclaration,
      ts.SyntaxKind.IfStatement,
    ], { drop: true, dropReplacement: '/* ERROR: `this` keyword used in expression */' }, context.nodeFlagsStore);
    return '';
  }
};
