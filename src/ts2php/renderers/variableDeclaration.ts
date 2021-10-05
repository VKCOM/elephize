import * as ts from 'typescript';
import { Declaration } from '../types';
import { checkReactAssignment } from '../components/react/reactHooks';
import { Context } from '../components/context';
import { getClosestParentOfType, isExportedVar } from '../utils/ast';
import { isTopLevel, isTopLevelComponent } from '../utils/isTopLevel';
import { generateFunctionElements } from '../components/functionScope';
import { Scope } from '../components/unusedCodeElimination/usageGraph';
import { BoundNode } from '../components/unusedCodeElimination/usageGraph/node';
import { snakify } from '../utils/pathsAndNames';
import { renderNodes, renderNode } from '../components/codegen/renderNodes';
import { getPhpPrimitiveType, getPhpPrimitiveTypeForFunc } from '../components/typeInference/basicTypes';

export function tVariableDeclaration(node: ts.VariableDeclaration, context: Context<Declaration>) {
  const identifierNode = node.name;
  const initializerNode = node.initializer;

  if (checkReactAssignment(node, context)) {
    return '';
  }

  // TODO: don't support `export const { ... } = {}` for now, but maybe later...
  if (node.name.kind === ts.SyntaxKind.ArrayBindingPattern || node.name.kind === ts.SyntaxKind.ObjectBindingPattern) {
    return renderNodes([identifierNode], context)[0]; // render only binding form, it will take all names from parent
  }

  const [identifier] = renderNodes([identifierNode], context);
  const parentStatement = getClosestParentOfType(node, ts.SyntaxKind.VariableStatement);

  const isTop = isTopLevel(node, context);
  const isFuncDeclaration = [ts.SyntaxKind.FunctionExpression, ts.SyntaxKind.ArrowFunction].includes(node.initializer?.kind || 1);

  const usedIdents = new Set<string>();
  const addIdent = (ident: string) => usedIdents.add(ident);
  context.scope.addEventListener(Scope.EV_USAGE, addIdent);

  // Register local vars for use inside non-closure usages, like class methods
  if (parentStatement && isTop) {
    return topStatements(node, initializerNode, addIdent, usedIdents, !!isFuncDeclaration, context);
  }

  // Declaration-only
  if (!node.initializer) { // Single var declaration without initialization
    const decl = context.scope.addDeclaration(
      node.name.getText(), [],
      { terminateGlobally: isExportedVar(node.name), dryRun: context.dryRun }
    );
    if (decl) {
      decl.data.targetModulePath = context.moduleDescriptor.targetFileName;
    }
    return `${identifier}`;
  }

  // If we reach here, we have full declaration with initializer that's not in top scope.

  const initializer = renderNode(initializerNode, context);
  context.scope.removeEventListener(Scope.EV_USAGE, addIdent);

  const flags = context.nodeFlagsStore.get(node);
  if (flags?.drop) {
    return flags?.dropReplacement || '';
  }

  let decl: BoundNode<Declaration> | null = null;
  if (!isFuncDeclaration) {
    if (isExportedVar(node.name)) {
      context.moduleDescriptor.registerExport(context.moduleDescriptor.sourceFileName, node.name.getText());
    }
    decl = context.scope.addDeclaration(
      node.name.getText(), [],
      { terminateGlobally: isExportedVar(node.name), dryRun: context.dryRun }
    );
  } else {
    const [, declScope] = context.scope.findByIdent(node.name.getText()) || [];
    if (declScope) {
      decl = declScope.declarations.get(node.name.getText()) as BoundNode<Declaration>;
    }
  }

  if (decl) {
    if (isFuncDeclaration) {
      decl.data.flags = { ...decl.data.flags, Callable: true };
    }
    decl.data.targetModulePath = context.moduleDescriptor.targetFileName;
  }

  if (!isFuncDeclaration) {
    context.scope.addUsage(node.name.getText(), Array.from(usedIdents), { dryRun: context.dryRun });
  }

  if (!isFuncDeclaration) {
    context.scope.addUsage(node.name.getText(), Array.from(usedIdents), { dryRun: context.dryRun });
  }

  return `${identifier} = ${initializer}`;
}

function topStatements(
  node: ts.VariableDeclaration,
  initializerNode: ts.Node | undefined,
  addIdent: (ident: string) => Set<string>,
  usedIdents: Set<string>,
  isFuncDeclaration: boolean,
  context: Context<Declaration>
) {
  if (!node.initializer) {
    context.scope.removeEventListener(Scope.EV_USAGE, addIdent);
    context.log.error('Module scope variables should have initializers to ensure proper type detection', [], context.log.ctx(node));
    return 'null';
  }

  // Declaration of arrow func / func expression, NOT CALL
  if (isFuncDeclaration) {
    const expr = node.initializer;
    if (expr) {
      const els = generateFunctionElements({
        expr: node.initializer as ts.FunctionExpression,
        nodeIdent: node.name.getText(),
        context,
        origDecl: node,
        origStatement: node.initializer,
      });

      // Previous call sets isComponent flag, so it's required for this check to be exactly after generate..()
      if (isTopLevelComponent(expr, context.nodeFlagsStore) || !els) {
        context.scope.removeEventListener(Scope.EV_USAGE, addIdent);
        // Don't render component function in current module
        return '';
      }

      const { syntaxList, block } = els;
      const flags = context.nodeFlagsStore.get(node);

      const isExportedFuncExp = !!(node.name.kind === ts.SyntaxKind.Identifier && isExportedVar(node.name));
      if (!context.dryRun && (context.scope.checkUsage(node.name.getText()) || isExportedFuncExp) && !flags?.drop) {
        context.moduleDescriptor.addMethod(
          node.name.getText(), block, syntaxList.join(', '),
          getPhpPrimitiveTypeForFunc(node.initializer as ts.FunctionExpression, syntaxList, context.checker, context.log),
          'public'
        );
      }
    }
  } else {
    const [initializer] = renderNodes([initializerNode], context);

    const nameIdent = node.name;
    // We expect plain identifier as name here
    if (nameIdent.kind !== ts.SyntaxKind.Identifier) {
      context.log.error('Top-level variable identifier should not be a binding expression', [], context.log.ctx(node));
      context.scope.removeEventListener(Scope.EV_USAGE, addIdent);
      return '';
    }

    const ident = snakify(nameIdent.getText());
    const flags = context.nodeFlagsStore.get(node);
    if (!context.dryRun && context.scope.checkUsage(nameIdent.getText()) && !flags?.drop) {
      context.moduleDescriptor.addProperty('$' + ident, getPhpPrimitiveType(nameIdent, context.checker, context.log), 'public');
      context.moduleDescriptor.addStatement(`$this->${ident} = ${initializer};`);
    }
  }

  const flags = context.nodeFlagsStore.get(node);
  if (flags?.drop) {
    context.scope.removeEventListener(Scope.EV_USAGE, addIdent);
    return flags?.dropReplacement || '';
  }

  let boundNode: BoundNode<Declaration> | null = null;
  if (!isFuncDeclaration) {
    boundNode = context.scope.addDeclaration(
      node.name.getText(), [],
      { terminateGlobally: isExportedVar(node.name as ts.Identifier), dryRun: context.dryRun }
    );
  } else {
    const [, declScope] = context.scope.findByIdent(node.name.getText()) || [];
    if (declScope) {
      boundNode = declScope.declarations.get(node.name.getText()) as BoundNode<Declaration>;
    }
  }

  if (boundNode) {
    if (isFuncDeclaration) {
      boundNode.data.flags = { ...boundNode.data.flags, Callable: true };
    }
    boundNode.data.flags = { ...boundNode.data.flags, HoistedToModule: true };
    boundNode.data.targetModulePath = context.moduleDescriptor.targetFileName;
    if (isExportedVar(node.name)) {
      context.scope.terminateCall(node.name.getText(), { dryRun: context.dryRun });
    }
  }

  context.scope.removeEventListener(Scope.EV_USAGE, addIdent);
  if (!isFuncDeclaration) {
    context.scope.addUsage(node.name.getText(), Array.from(usedIdents), { dryRun: context.dryRun });
  }

  return '';
}
