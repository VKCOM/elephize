import * as ts from 'typescript';
import { NodeFlags } from '../types';
import { NodeFlagStore } from '../components/codegen/nodeFlagStore';

export function getLeftExpr(exp: ts.Expression, srcFile?: ts.SourceFile): ts.Identifier | null {
  if (!exp) {
    return null;
  }

  let e: ts.Node = exp;
  while (e.kind !== ts.SyntaxKind.Identifier && e.kind) {
    if (!e.getChildren(srcFile)[0]) {
      return null;
    }
    e = e.getChildren(srcFile)[0];
  }

  return e as ts.Identifier;
}

/**
 * Get identifiers used inside expression and all sub-expressions.
 * Sub-expressions type set is limited to mostly common use cases. If further support is required, add it here.
 * @param exp
 */
export function getIdentities(exp: ts.Expression): ts.Identifier[] {
  if (!exp) {
    return [];
  }

  const idents: Set<ts.Identifier> = new Set();

  function _traverse(child: ts.Node) {
    if (ts.isIdentifier(child)) {
      idents.add(child);
    } else if (ts.isCallExpression(child)) {
      _traverse(child.expression);
      child.arguments.forEach((arg) => _traverse(arg));
    } else if (ts.isTypeOfExpression(child)) {
      _traverse(child.expression);
    } else if (ts.isPropertyAccessExpression(child)) {
      _traverse(child.expression);
    } else if (ts.isElementAccessExpression(child)) {
      _traverse(child.expression);
      _traverse(child.argumentExpression);
    }
  }

  _traverse(exp);
  return Array.from(idents);
}

export function fetchAllBindingIdents(binding: ts.BindingName | ts.ParameterDeclaration): ts.Identifier[] {
  if (binding.kind === ts.SyntaxKind.Identifier) {
    return [binding];
  }

  if (binding.kind === ts.SyntaxKind.Parameter) {
    return fetchAllBindingIdents(binding.name);
  }

  if (binding.kind === ts.SyntaxKind.ObjectBindingPattern) {
    return binding.elements
      .map((el) => fetchAllBindingIdents(el.name))
      .reduce((acc, val) => acc.concat(val), []); // flatten
  }

  if (binding.kind === ts.SyntaxKind.ArrayBindingPattern) {
    return binding.elements
      .filter((el): el is ts.BindingElement => el.kind !== ts.SyntaxKind.OmittedExpression)
      .map((el) => fetchAllBindingIdents(el.name))
      .reduce((acc, val) => acc.concat(val), []); // flatten
  }

  return [];
}

/**
 * Apply flags to a closest parent of one of types listed in 'kind' parameter. Only one parent is marked!
 *
 * @param node
 * @param kind
 * @param flags
 * @param store
 */
export function flagParentOfType(node: ts.Node, kind: ts.SyntaxKind[], flags: NodeFlags, store: NodeFlagStore): void {
  while (node.kind !== ts.SyntaxKind.SourceFile) {
    if (kind.includes(node.kind)) {
      store.upsert(node, flags);
      return;
    }

    node = node.parent;
  }
}

export function getClosestParentOfType(node: ts.Node, kind: ts.SyntaxKind, includeSelf = false): ts.Node | null {
  if (!includeSelf) {
    node = node.parent;
  }

  while (node.kind !== ts.SyntaxKind.SourceFile) {
    if (kind === node.kind) {
      return node;
    }

    node = node.parent;
  }

  return null;
}

export function getClosestParentOfAnyType(node: ts.Node, kind: ts.SyntaxKind[], includeSelf = false): ts.Node | null {
  if (!includeSelf) {
    node = node.parent;
  }

  while (node.kind !== ts.SyntaxKind.SourceFile) {
    if (kind.includes(node.kind)) {
      return node;
    }

    node = node.parent;
  }

  return null;
}

export function getClosestParentOfTypeWithFlag(node: ts.Node, kind: ts.SyntaxKind, flags: NodeFlags, store: NodeFlagStore): ts.Node | null {
  node = node.parent; // Don't count current node!

  while (node.kind !== ts.SyntaxKind.SourceFile) {
    const nodeFlags = store.get(node);
    if (
      nodeFlags &&
      kind === node.kind &&
      // this checks that element's flags have values according to all passed flags
      Object.keys(flags).reduce<boolean>((acc, key: keyof NodeFlags) => acc && flags[key] === nodeFlags[key], true)
    ) {
      return node;
    }

    node = node.parent;
  }

  return null;
}

/**
 * Find node by type chain in children tree.
 * If target type is array of types, first found type will be taken.
 * @param node
 * @param types
 */
export function getChildChainByType(node: ts.Node, types: Array<ts.SyntaxKind | ts.SyntaxKind[]>): ts.Node | undefined {
  let intermediateNode: ts.Node | undefined = node;

  for (let typeIndex = 0; typeIndex < types.length; typeIndex++) {
    const t = types[typeIndex];
    intermediateNode = intermediateNode.getChildren().find((c) => {
      if (Array.isArray(t)) {
        return t.includes(c.kind);
      }
      return c.kind === types[typeIndex];
    });
    if (!intermediateNode) {
      return;
    }
  }

  return intermediateNode;
}

export const RightHandExpressionLike = [
  ts.SyntaxKind.ArrayLiteralExpression,
  ts.SyntaxKind.ArrowFunction,
  ts.SyntaxKind.BinaryExpression,
  ts.SyntaxKind.Block,
  ts.SyntaxKind.CallExpression,
  ts.SyntaxKind.ElementAccessExpression,
  ts.SyntaxKind.FalseKeyword,
  ts.SyntaxKind.Identifier,
  ts.SyntaxKind.NullKeyword,
  ts.SyntaxKind.NumericLiteral,
  ts.SyntaxKind.ConditionalExpression,
  ts.SyntaxKind.ObjectLiteralExpression,
  ts.SyntaxKind.PostfixUnaryExpression,
  ts.SyntaxKind.PrefixUnaryExpression,
  ts.SyntaxKind.PropertyAccessExpression,
  ts.SyntaxKind.ParenthesizedExpression,
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.TemplateExpression,
  ts.SyntaxKind.TrueKeyword,
  ts.SyntaxKind.JsxFragment,
  ts.SyntaxKind.JsxElement,
  ts.SyntaxKind.JsxSelfClosingElement
  // TODO: more expressions?
];

export function getCallExpressionLeftSide(node: ts.Node) {
  return getChildChainByType(node, [
    ts.SyntaxKind.PropertyAccessExpression,
    RightHandExpressionLike
  ]);
}

export function getCallExpressionArg(node: ts.Node) {
  return getChildChainByType(node, [
    ts.SyntaxKind.SyntaxList,
    RightHandExpressionLike
  ]);
}

export function getCallExpressionCallbackArg(node: ts.Node) {
  return getChildChainByType(node, [
    ts.SyntaxKind.SyntaxList,
    [
      ts.SyntaxKind.FunctionExpression,
      ts.SyntaxKind.ArrowFunction
    ]
  ]);
}

export function getClosestOrigParentOfType(node: ts.Node, type: ts.SyntaxKind) {
  let info = node;
  while (info) {
    if (type === info.kind) {
      return info;
    }

    info = info.parent;
  }

  return null;
}

export function getClosestOrigParentByPredicate(node: ts.Node, predicate: (parent: ts.Node) => boolean) {
  let info = node;
  while (info) {
    if (predicate(info)) {
      return info;
    }

    info = info.parent;
  }

  return null;
}

export function isExportedVar(node: ts.Identifier | ts.BindingName) {
  const varStmt = getClosestOrigParentOfType(node, ts.SyntaxKind.VariableStatement) as ts.VariableStatement | null;
  if (!varStmt) {
    return false;
  }

  return varStmt.modifiers && varStmt.modifiers.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
}

export function isExportedFun(node: ts.Identifier) {
  const varStmt = getClosestOrigParentOfType(node, ts.SyntaxKind.FunctionDeclaration) as ts.FunctionDeclaration | null;
  if (!varStmt) {
    return false;
  }

  return varStmt.modifiers && varStmt.modifiers.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
}
