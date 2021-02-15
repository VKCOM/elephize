import * as ts from 'typescript';
import { Declaration, DeclFlag } from '../types';
import { hookStdlib } from './stdlib';
import {
  flagParentOfType,
  getLeftExpr
} from '../utils/ast';
import { Context } from '../components/context';
import { ctx } from '../utils/log';
import { reactHooksSupport } from '../components/react/reactHooks';
import { insideComponent } from '../components/unusedCodeElimination/usageGraph/nodeData';
import { Scope } from '../components/unusedCodeElimination/usageGraph';
import { markUsedVars } from '../components/unusedCodeElimination/varsUsage';
import { isBound } from '../components/unusedCodeElimination/usageGraph/node';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';

export function tCallExpression(node: ts.CallExpression, context: Context<Declaration>) {
  // Support js stdlib objects methods, see stdlibSupport for details
  let hookResult = hookStdlib(node, context);
  if (hookResult !== undefined) {
    return hookResult;
  }

  let reactHooks = reactHooksSupport(context, node);
  if (reactHooks) {
    if (reactHooks === '!null') {
      return ''; // drop current statement in this special case
    }
    return reactHooks;
  }

  let ident = renderNode(node.expression, context);
  let args: string[];

  const usedVars = new Set<string>();
  const onUsage = (ident: string) => usedVars.add(ident);
  context.scope.addEventListener(Scope.EV_USAGE, onUsage);

  if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression
    && (node.expression as ts.PropertyAccessExpression).name.escapedText === 'hasOwnProperty') {
    // Object {}.hasOwnProperty() support for For-In loops; not a general support!
    flagParentOfType(node, [ts.SyntaxKind.IfStatement], { drop: true }, context.nodeFlagsStore);
    flagParentOfType(node, [ts.SyntaxKind.ForInStatement], { validated: true }, context.nodeFlagsStore);
    args = renderNodes([...node.arguments], context);
  } else {
    args = renderNodes([...node.arguments], context);
  }

  context.scope.removeEventListener(Scope.EV_USAGE, onUsage);

  // Check for spread in the middle
  const callChildren = node.arguments.slice();
  const spread = callChildren.findIndex((v) => v.kind === ts.SyntaxKind.SpreadElement);
  if (spread !== -1) {
    if (spread !== callChildren.length - 1) {
      // specific situation: php does not allow spreads in middle of argument list.
      // So we use array_merge + spread. Kphp will not be really happy with it though.
      context.log.warn('Using array_merge to create parameters array for function, it may fail type inference', [], ctx(node));
      args = [`...${makeCallArgs(callChildren, args)}`];
    } else {
      // ok, it's last one, so just add ... to spread element.
      args[args.length - 1] = '...' + args[args.length - 1];
    }
  }

  let lExp = getLeftExpr(node.expression);
  if (!lExp) {
    context.log.error('Calls of non-identifier expressions are not supported', [], ctx(node));
    return 'null';
  }

  let [decl, declScope, declNode] = context.scope.findByIdent(lExp.getText()) || [];
  if (!context.dryRun) {
    if (!decl || (declNode && !isBound(declNode))) {
      context.log.error('Call of undeclared or dropped identifier: %s', [lExp.getText()], ctx(node));
    }
  }
  markUsedVars(node, lExp, usedVars, context);

  // Similar logic for similar cases, but with slight differences >_<
  if (decl && decl.flags & DeclFlag.External) {
    let prop = (node.expression as ts.PropertyAccessExpression).name.getText();
    return context.registry.callExportedCallable(context.moduleDescriptor, decl.targetModulePath, prop, args);
  } else if (
    (decl && decl.flags & DeclFlag.DereferencedImport) ||
    (decl && (decl.flags & DeclFlag.Local && (insideComponent(context.scope) || declScope?.isRoot() )))
  ) {
    return context.registry.callExportedCallable(context.moduleDescriptor, decl.targetModulePath, decl.propName!, args);
  }
  return `${ident}(${args.join(', ')})`;
}

function makeCallArgs(nodes: ts.Node[], args: string[]) {
  let toRender = [];
  let synList: string[] = [];
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].kind === ts.SyntaxKind.SpreadElement) {
      synList = synList.concat('[' + toRender.join(', ') + ']');
      toRender = [];
      synList.push(args[i]);
    } else {
      toRender.push(args[i]);
    }
  }
  synList = synList.concat('[' + toRender.join(', ') + ']');
  return `array_merge(${synList.join(', ')})`;
}
