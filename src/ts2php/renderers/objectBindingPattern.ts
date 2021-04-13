import * as ts from 'typescript';
import { Declaration, DeclFlag } from '../types';
import { Context } from '../components/context';
import { isExportedVar } from '../utils/ast';
import { isTopLevel } from '../utils/isTopLevel';
import { identifyAnonymousNode, insideComponent } from '../components/unusedCodeElimination/usageGraph/nodeData';
import { Scope } from '../components/unusedCodeElimination/usageGraph';
import { renderPattern } from '../utils/renderBindingPatterns';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';
import { getPossibleCastingType } from '../components/typeInference/basicTypes';

function renderBindingElement(el: ts.BindingElement | ts.OmittedExpression, index: number, destructured: Set<string>, context: Context<Declaration>) {
  if (el.kind === ts.SyntaxKind.OmittedExpression) {
    return null;
  }

  if (!el.dotDotDotToken) {
    destructured.add((el.propertyName || el.name).getText());
  }

  if (!context.dryRun && !context.scope.checkUsage(el.name.getText())) {
    // Remove unused vars declarations
    context.log.info('Dropped unused var $%s from [out]/%s', [el.name.getText(), context.moduleDescriptor.targetFileName]);
    return null;
  }

  if (el.name.kind !== ts.SyntaxKind.Identifier) {
    context.log.error('Nested bindings are not supported: %s', [el.name.getText()], context.log.ctx(el));
    return null;
  }

  if (el.dotDotDotToken) {
    return {
      identifier: el.name,
      defaultValue: '',
      initializer: `Stdlib::objectOmit(%placeholder%, [${Array.from(destructured.values()).map((el) => `"${el}"`).join(', ')}])`,
    };
  } else {
    if (el.name.getText() === 'children' && insideComponent(context.scope)) {
      // We should add declaration to usage graph
      context.scope.addDeclaration('children', [], { dryRun: context.dryRun });
      // But children are passed explicitly as argument to ->render at server, so we don't render them.
      return null;
    }
    return {
      identifier: el.name,
      defaultValue: el.initializer ? ' ?? ' + renderNode(el.initializer, context) : '',
      initializer: `${getPossibleCastingType(el.name, context.checker, context.log)}%placeholder%["${(el.propertyName || el.name).getText()}"]`,
    };
  }
}

export function renderElements(node: ts.ObjectBindingPattern, placeholder: string, context: Context<Declaration>) {
  const destructured = new Set<string>();
  const identList: ts.Identifier[] = [];
  const els = node.elements.map((el, index) => renderBindingElement(el, index, destructured, context));
  const renderedString = renderPattern(placeholder, node, els, identList, context);
  return { renderedString, identList };
}

export function tObjectBindingPattern(node: ts.ObjectBindingPattern, context: Context<Declaration>) {
  const varDecl = node.parent;
  if (varDecl.kind === ts.SyntaxKind.VariableDeclaration) {
    if (varDecl.initializer?.kind === ts.SyntaxKind.Identifier) {
      // Simple identifier, ok
      let init = varDecl.initializer?.getText();
      if (init) {
        const [decl] = context.scope.findByIdent(init) || [];
        if (decl && decl.flags & DeclFlag.HoistedToModule) {
          init = 'this->' + init;
        }
      }
      const { renderedString, identList } = renderElements(node, init || '[compilation error!]', context);
      identList.forEach((ident) => {
        const decl = context.scope.addDeclaration(
          ident.getText(),
          [varDecl.initializer?.getText()],
          { terminateGlobally: isExportedVar(ident), dryRun: context.dryRun }
        );
        if (decl) {
          decl.data.flags = isTopLevel(ident, context) ? DeclFlag.HoistedToModule : 0;
        }
      });
      return renderedString;
    } else {
      // Expression, make dummy var
      const derefIdent = identifyAnonymousNode(node.parent.initializer!);
      const expr = varDecl.initializer;

      const usedIdents = new Set<string>();
      const addIdent = (ident: string) => usedIdents.add(ident);
      context.scope.addEventListener(Scope.EV_USAGE, addIdent);
      const assignment = `$${derefIdent} = ${renderNodes([expr], context)};`;
      context.scope.removeEventListener(Scope.EV_USAGE, addIdent);

      context.scope.addDeclaration(derefIdent, Array.from(usedIdents), { dryRun: context.dryRun });

      if (isTopLevel(node, context)) {
        // Must add assignment to descriptor before rendering elements to preserve dereferencing order
        context.moduleDescriptor.addStatement(assignment);
      }
      const { renderedString, identList } = renderElements(node, derefIdent, context);

      identList.forEach((ident) => {
        const decl = context.scope.addDeclaration(
          ident.getText(),
          [derefIdent],
          { terminateGlobally: isExportedVar(ident), dryRun: context.dryRun }
        );
        if (decl) {
          decl.data.flags = isTopLevel(ident, context) ? DeclFlag.HoistedToModule : 0;
        }
      });

      if (isTopLevel(node, context)) {
        return 'null';
      } else {
        return assignment + '\n' + renderedString;
      }
    }
  }

  return '';
}
