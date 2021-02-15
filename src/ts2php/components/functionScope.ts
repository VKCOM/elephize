import { Context } from 'src/ts2php/components/context';
import { Declaration, DeclFlag } from '../types';
import * as ts from 'typescript';
import { fetchAllBindingIdents, getClosestOrigParentOfType } from '../utils/ast';
import { handleComponent } from './react/reactComponents';
import { ctx, LogSeverity } from '../utils/log';
import { BoundNode } from './unusedCodeElimination/usageGraph/node';
import { renderNode, renderNodes } from './codegen/renderNodes';
import { usedInNestedScope } from './unusedCodeElimination/usageGraph/nodeData';
import { getTimeMarker } from '../utils/hrtime';

type FunctionalDecl = ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction;

export function getRenderedBlock(
  context: Context<Declaration>,
  nodeIdent: string,
  realParent: ts.Node | undefined,
  argSynList: ts.NodeArray<ts.ParameterDeclaration>,
  bodyBlock?: ts.Node // can be many types in arrow func
) {
  let node;
  const [, declScope] = context.scope.findByIdent(nodeIdent) || [];
  if (declScope) {
    node = (declScope.declarations.get(nodeIdent) as BoundNode<Declaration>);
  }

  if (!node) {
    context.scope.addDeclaration(nodeIdent, [], { dryRun: context.dryRun });
  }

  const stackCtr = getTimeMarker();
  context.pushScope(`function__${stackCtr}`, nodeIdent);

  // Declare all parameters
  argSynList.map(fetchAllBindingIdents)
    .reduce((acc, val) => acc.concat(val), []) // flatten;
    .forEach((ident) => context.scope.addDeclaration(ident.getText(), [], { terminateLocally: true, dryRun: context.dryRun }));

  if (realParent) {
    context.nodeFlagsStore.upsert(realParent, { destructuringInfo: { vars: '' } });
  }
  let [...syntaxList] = renderNodes([...argSynList], context, false);
  let block = renderNode(bodyBlock, context);
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

  context.popScope(`function__${stackCtr}`, bodyBlock?.getLastToken());
  return { syntaxList, block, idMap };
}

type GenParams = {
  expr: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction;
  nodeIdent: string;
  context: Context<Declaration>;
  origDecl?: ts.VariableDeclaration;
  origStatement?: ts.Expression;
};
export function generateFunctionElements({ expr, nodeIdent, context, origDecl, origStatement }: GenParams) {
  if (origDecl && origStatement) {
    const parentStmt = getClosestOrigParentOfType(origDecl, ts.SyntaxKind.VariableStatement);
    if (parentStmt) {
      let handledContent = handleComponent(context, origStatement);
      if (handledContent) {
        return null; // component is written to different file, so we should not output anything here
      }
    }
  }

  const params = expr.parameters;
  const blockNode = expr.body;

  let { syntaxList, block } = getRenderedBlock(
    context, nodeIdent, origStatement,
    params, blockNode
  );
  block = unwrapArrowBody(block, blockNode);
  block = prependDestructuredParams(block, expr, context);
  return { syntaxList, block };
}

export function genClosure(idMap: Map<string, boolean>, context: Context<Declaration>, node: ts.Node) {
  let closureUse: string[] = [];
  idMap.forEach((modifiedInClosure, varName) => {
    if (modifiedInClosure) {
      context.log(`Closure-scoped variable ${varName} has been modified inside closure, this will not work on server side`, LogSeverity.ERROR, ctx(node));
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

export function prependDestructuredParams(block: string, func: FunctionalDecl, context: Context<Declaration>) {
  const flags = context.nodeFlagsStore.get(func);
  if (!flags?.destructuringInfo?.vars) {
    return block;
  }

  return block.replace(/^{/, '{\n' + flags.destructuringInfo.vars);
}

export function unwrapArrowBody(block: string, blockNode?: ts.Node, noReturn = false) {
  if (blockNode?.kind !== ts.SyntaxKind.Block) {
    return noReturn ? `{\n${block};\n}` : `{\nreturn ${block};\n}`;
  }
  return block;
}

type ExprGenOptions = {
  synList: ts.NodeArray<ts.ParameterDeclaration>;
  blockNode?: ts.Node;
};
export const functionExpressionGen = (node: FunctionalDecl, ident: string) => (opts: ExprGenOptions, context: Context<Declaration>) => {
  let { syntaxList, block, idMap } = getRenderedBlock(
    context, ident, node,
    opts.synList, opts.blockNode
  );
  block = unwrapArrowBody(block, opts.blockNode);
  block = prependDestructuredParams(block, node, context);

  const { closureExpr } = genClosure(idMap, context, node);
  return `/* ${ident} */ function (${syntaxList})${closureExpr} ${block}`;
};

/**
 * If node value looks like modified in current context, add declaration flag.
 * Return declaration.
 * @param node
 * @param context
 * @return Declaration
 */
export function checkModificationInNestedScope(node: ts.Identifier | null, context: Context<Declaration>) {
  if (!node) {
    return null;
  }
  const nodeText = node.escapedText.toString();
  const [decl, declScope] = context.scope.findByIdent(nodeText) || [];
  if (decl && declScope) {
    const modifiedInLowerScope = usedInNestedScope(decl, declScope, context.scope);
    if (modifiedInLowerScope && decl) {
      decl.flags = decl.flags | DeclFlag.ModifiedInLowerScope;
    }
    return decl;
  }

  return null;
}