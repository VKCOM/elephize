import * as ts from 'typescript';
import { Context } from '../components/context';
import { Declaration } from '../types';
import { flagParentOfType } from '../utils/ast';

export const tNewExpression = (node: ts.NewExpression, context: Context<Declaration>) => {
  const [file, ident] = context.moduleDescriptor.findImportedIdentifier(node.expression.getText()) || [];
  if (!file || !ident || !context.registry.isPlainClass(file, ident)) {
    context.log.error('Keyword `new` is supported only for plain classes', [], context.log.ctx(node));
    return '';
  }

  flagParentOfType(node, [ts.SyntaxKind.VariableDeclaration], {
    boundClassInstance: context.registry.getPlainClassName(file, ident),
  }, context.nodeFlagsStore);
  return `new ${context.registry.getPlainClassName(file, ident)}()`;
};
