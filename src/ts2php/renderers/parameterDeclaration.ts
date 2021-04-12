import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { getClosestParentOfAnyType } from '../utils/ast';
import { renderElements as renderObjectBinding } from './objectBindingPattern';
import { renderElements as renderArrayBinding } from './arrayBindingPattern';
import { snakify } from '../utils/pathsAndNames';
import { renderNode } from '../components/codegen/renderNodes';

export function tParameterDeclaration(node: ts.ParameterDeclaration, context: Context<Declaration>) {
  // Object/array destructuring
  if (node.name.kind === ts.SyntaxKind.ObjectBindingPattern || node.name.kind === ts.SyntaxKind.ArrayBindingPattern) {
    const parentFunc = getClosestParentOfAnyType(node, [
      ts.SyntaxKind.FunctionExpression,
      ts.SyntaxKind.FunctionDeclaration,
      ts.SyntaxKind.ArrowFunction,
    ]);

    if (!parentFunc) {
      context.log.error('No function found for parameters declaration: this is unexpected error', [], context.log.ctx(node));
      return '';
    }

    const index = context.nodeFlagsStore.get(parentFunc)?.elIndex || 1;
    const varName = `anon_deref_${index}`;
    context.nodeFlagsStore.upsert(parentFunc, { elIndex: index + 1 });

    const { renderedString, identList } = node.name.kind === ts.SyntaxKind.ObjectBindingPattern ?
      renderObjectBinding(node.name, varName, context) :
      renderArrayBinding(node.name, varName, context);

    identList.forEach((ident) => context.scope.addDeclaration(ident.getText(), [], { dryRun: context.dryRun }));

    const vars = context.nodeFlagsStore.get(parentFunc)?.destructuringInfo?.vars || '';
    context.nodeFlagsStore.upsert(parentFunc, {
      destructuringInfo: { vars: [vars, renderedString].filter((el) => !!el).join('\n') },
    });

    return `$${snakify(varName)}`;
  }

  if (node.dotDotDotToken) {
    return `...$${node.name.getText()}`;
  }

  const defaultValue = node.initializer ? ' = ' + renderNode(node.initializer, context) : '';
  return `$${snakify(node.name.getText()) + defaultValue}`;
}
