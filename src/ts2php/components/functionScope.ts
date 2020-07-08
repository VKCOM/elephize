import { Context } from 'src/ts2php/components/context';
import { Declaration, DeclFlag, NodeInfo } from '../types';
import * as ts from 'typescript';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import {
  getChildByType,
  getChildOfAnyTypeAfterSelected,
  getClosestOrigParentOfType,
  RightHandExpressionLike
} from '../utils/ast';
import { handleComponent } from './react/reactComponents';
import { ctx, log, LogSeverity } from '../utils/log';
import { BoundNode } from './unusedCodeElimination/usageGraph/node';

export function getRenderedBlock(
  context: Context<Declaration>,
  nodeIdent: string,
  nodeOrig: ts.Node | undefined,
  realParent: NodeInfo | undefined,
  nodes: [NodeInfo | undefined, NodeInfo | undefined]
) {
  let node;
  const [, declScope] = context.scope.findByIdent(nodeIdent) || [];
  if (declScope) {
    node = (declScope.declarations.get(nodeIdent) as BoundNode<Declaration>);
  }

  if (!node) {
    context.scope.addDeclaration(nodeIdent, [], { dryRun: context.dryRun });
  }

  context.pushScope(nodeIdent);
  if (realParent) {
    realParent.flags.destructuringInfo = {vars: ''}; // Reset destructuring info
  }
  let [syntaxList, block] = renderSupportedNodes(nodes, context, false);
  const idMap = new Map<string, boolean>();
  context.scope.getClosure().forEach((decl, ident) => {
    if ((decl.flags & DeclFlag.External) && decl.propName === '*') {
      return; // imported vars should not get into closure
    }
    if (!!(decl.flags & DeclFlag.HoistedToModule)) {
      return; // module scope vars also should not get into closure
    }
    idMap.set(ident, !!(decl.flags & DeclFlag.ModifiedInLowerScope));
  });

  context.popScope();
  return { syntaxList, block, idMap };
}

type GenParams = {
  statement: NodeInfo;
  expr: NodeInfo;
  nodeIdent: string;
  context: Context<Declaration>;
  origDecl?: ts.VariableDeclaration;
  origStatement?: ts.Expression;
};
export function generateFunctionElements({ statement, expr, nodeIdent, context, origDecl, origStatement }: GenParams) {
  if (origDecl && origStatement) {
    const parentStmt = getClosestOrigParentOfType(origDecl, ts.SyntaxKind.VariableStatement);
    if (parentStmt) {
      let handledContent = handleComponent(context, origStatement, expr);
      if (handledContent) {
        return null; // component is written to different file, so we should not output anything here
      }
    }
  }

  const synListNode = getChildOfAnyTypeAfterSelected(expr, ts.SyntaxKind.OpenParenToken, [ts.SyntaxKind.SyntaxList]);
  // Fallback value for oneline arrow function cases.
  const blockNode = getChildByType(expr, ts.SyntaxKind.Block) || getChildOfAnyTypeAfterSelected(expr, ts.SyntaxKind.EqualsGreaterThanToken, RightHandExpressionLike);
  let { syntaxList, block } = getRenderedBlock(
    context, nodeIdent, origStatement,
    statement, [synListNode, blockNode]
  );
  block = unwrapArrowBody(block, blockNode);
  block = prependDestructuredParams(block, statement);
  return { syntaxList, block };
}

export function genClosure(idMap: Map<string, boolean>, context: Context<Declaration>, node: ts.Node) {
  let closureUse: string[] = [];
  idMap.forEach((modifiedInClosure, varName) => {
    if (modifiedInClosure) {
      log(`Closure-scoped variable ${varName} has been modified inside closure, this will not work on server side`, LogSeverity.ERROR, ctx(node));
      closureUse.push(`/* !! MODIFIED INSIDE !! */$${varName}`);
    } else {
      closureUse.push(`$${varName}`);
    }

    // Reset closure modification flag for all closure vars: they can be used in next closures without modification, and it's ok
    const [decl] = context.scope.findByIdent(varName) || [];
    if (decl) {
      decl.flags = decl.flags & ~DeclFlag.ModifiedInLowerScope;
    }
  });

  let closureExpr = closureUse.length > 0
    ? ` use (${closureUse.join(', ')})`
    : '';

  return { closureExpr };
}

export function prependDestructuredParams(block: string, realParent: NodeInfo) {
  if (!realParent.flags.destructuringInfo?.vars) {
    return block;
  }

  return block.replace(/^{/, '{\n' + realParent.flags.destructuringInfo.vars);
}

export function unwrapArrowBody(block: string, blockNode?: NodeInfo, noReturn = false) {
  if (blockNode?.node.kind !== ts.SyntaxKind.Block) {
    return noReturn ? `{\n${block};\n}` : `{\nreturn ${block};\n}`;
  }
  return block;
}

type ExprGenOptions = {
  synListNode?: NodeInfo;
  blockNode: NodeInfo;
};
export const functionExpressionGen = (node: ts.Node, ident: string, realParent: NodeInfo) => (opts: ExprGenOptions, context: Context<Declaration>) => {
  // TODO: disallow `this` in expressions

  let { syntaxList, block, idMap } = getRenderedBlock(
    context, ident, node,
    realParent, [opts.synListNode, opts.blockNode]
  );
  block = unwrapArrowBody(block, opts.blockNode);
  block = prependDestructuredParams(block, realParent);

  const { closureExpr } = genClosure(idMap, context, node);
  return `/* ${ident} */ function (${syntaxList})${closureExpr} ${block}`;
};
