import * as ts from 'typescript';
import { Declaration, DeclFlag, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { checkReactAssignment } from '../components/react/reactHooks';
import { Context } from '../components/context';
import {
  getChildByAnyType,
  getChildOfAnyTypeAfterSelected,
  getClosestParentOfType,
  isExportedVar,
  RightHandExpressionLike
} from '../utils/ast';
import { ctx, log, LogSeverity } from '../utils/log';
import { isTopLevel, isTopLevelComponent } from '../utils/isTopLevel';
import { generateFunctionElements } from '../components/functionScope';
import { Scope } from '../components/unusedCodeElimination/usageGraph';
import { BoundNode } from '../components/unusedCodeElimination/usageGraph/node';
import { snakify } from '../utils/pathsAndNames';

function isCallable(node: ts.Expression, checker: ts.TypeChecker): boolean {
  return checker.getTypeAtLocation(node).getCallSignatures().length > 0;
}

export function tVariableDeclaration(node: ts.VariableDeclaration): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const [identifierNode] = self.children;
      const initializerNode = getChildOfAnyTypeAfterSelected(self, ts.SyntaxKind.EqualsToken, RightHandExpressionLike);

      if (checkReactAssignment(node, context)) {
        return '';
      }

      // TODO: don't support `export const { ... } = {}` for now, but maybe later...
      if (node.name.kind === ts.SyntaxKind.ArrayBindingPattern || node.name.kind === ts.SyntaxKind.ObjectBindingPattern) {
        return renderSupportedNodes([identifierNode], context)[0]; // render only binding form, it will take all names from parent
      }

      let [identifier] = renderSupportedNodes([identifierNode], context);
      const parentStatement = getClosestParentOfType(self, ts.SyntaxKind.VariableStatement);

      const isTop = isTopLevel(node, context);
      const isFuncDeclaration = node.initializer && isCallable(node.initializer, context.checker);

      const usedIdents = new Set<string>();
      const addIdent = (ident: string) => usedIdents.add(ident);
      context.scope.addEventListener(Scope.EV_USAGE, addIdent);

      // Register local vars for use inside non-closure usages, like class methods
      if (parentStatement && isTop) {
        return topStatements(node, self, initializerNode, addIdent, usedIdents, !!isFuncDeclaration, context);
      }

      // Declaration-only
      if (self.children.length === 1) { // Single var declaration without initialization
        let decl = context.scope.addDeclaration(
          node.name.getText(), [],
          { terminateGlobally: isExportedVar(node.name), dryRun: context.dryRun }
        );
        if (decl) {
          decl.data.targetModulePath = context.moduleDescriptor.targetFileName;
        }
        return `${identifier}`;
      }

      // If we reach here, we have full declaration with initializer that's not in top scope.

      let [initializer] = renderSupportedNodes([initializerNode], context);
      context.scope.removeEventListener(Scope.EV_USAGE, addIdent);
      if (self.flags.drop) {
        return '';
      }

      let decl: BoundNode<Declaration> | null = null;
      if (!isFuncDeclaration) {
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
          decl.data.flags |= DeclFlag.Callable;
        }
        decl.data.targetModulePath = context.moduleDescriptor.targetFileName;
      }

      if (!isFuncDeclaration) {
        context.scope.addUsage(node.name.getText(), Array.from(usedIdents), { dryRun: context.dryRun });
      }

      return `${identifier} = ${initializer}`;
    }
  };
}

function topStatements(node: ts.VariableDeclaration, self: NodeInfo, initializerNode: NodeInfo | undefined, addIdent: (ident: string) => Set<string>, usedIdents: Set<string>, isFuncDeclaration: boolean, context: Context<Declaration> ) {
  if (!node.initializer) {
    context.scope.removeEventListener(Scope.EV_USAGE, addIdent);
    log('Module scope variables should have initializers to ensure proper type detection', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  // Declaration of arrow func / func expression, NOT CALL
  if (isFuncDeclaration) {
    const expr = getChildByAnyType(self, [ts.SyntaxKind.ArrowFunction, ts.SyntaxKind.FunctionExpression]);
    if (expr) {
      const els = generateFunctionElements({
        expr,
        statement: self,
        nodeIdent: node.name.getText(),
        context,
        origDecl: node,
        origStatement: node.initializer
      });

      // Previous call sets isComponent flag, so it's required for this check to be exactly after generate..()
      if (isTopLevelComponent(expr) || !els) {
        context.scope.removeEventListener(Scope.EV_USAGE, addIdent);
        // Don't render component function in current module
        return '';
      }

      const { syntaxList, block } = els;

      if (!context.dryRun && context.scope.checkUsage(node.name.getText()) && !self.flags.drop) {
        context.moduleDescriptor.addMethod(node.name.getText(), block, syntaxList, 'public');
      }
    }
  } else {
    let [initializer] = renderSupportedNodes([initializerNode], context);

    const nameIdent = node.name;
    // We expect plain identifier as name here
    if (nameIdent.kind !== ts.SyntaxKind.Identifier) {
      log('Top-level variable identifier should not be a binding expression', LogSeverity.ERROR, ctx(node));
      context.scope.removeEventListener(Scope.EV_USAGE, addIdent);
      return '';
    }
    const ident = snakify(nameIdent.getText());
    if (!context.dryRun && context.scope.checkUsage(nameIdent.getText()) && !self.flags.drop) {
      context.moduleDescriptor.addProperty('$' + ident, 'public');
      context.moduleDescriptor.addStatement(`$this->${ident} = ${initializer};`);
    }
  }

  if (self.flags.drop) {
    context.scope.removeEventListener(Scope.EV_USAGE, addIdent);
    return '';
  }

  let decl: BoundNode<Declaration> | null = null;
  if (!isFuncDeclaration) {
    decl = context.scope.addDeclaration(
      node.name.getText(), [],
      { terminateGlobally: isExportedVar(node.name as ts.Identifier), dryRun: context.dryRun }
    );
  } else {
    const [, declScope] = context.scope.findByIdent(node.name.getText()) || [];
    if (declScope) {
      decl = declScope.declarations.get(node.name.getText()) as BoundNode<Declaration>;
    }
  }

  if (decl) {
    if (isFuncDeclaration) {
      decl.data.flags |= DeclFlag.Callable;
    }
    decl.data.flags |= DeclFlag.HoistedToModule;
    decl.data.targetModulePath = context.moduleDescriptor.targetFileName;
  }

  context.scope.removeEventListener(Scope.EV_USAGE, addIdent);
  if (!isFuncDeclaration) {
    context.scope.addUsage(node.name.getText(), Array.from(usedIdents), { dryRun: context.dryRun });
  }

  return '';
}