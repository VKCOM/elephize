import * as ts from 'typescript';
import { NodeInfo } from '../types';

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
 * @param info
 * @param kind
 * @param flags
 */
export function flagParentOfType(info: NodeInfo, kind: ts.SyntaxKind[], flags: NodeInfo['flags']): void {
  while (info) {
    if (kind.includes(info.node.kind)) {
      info.flags = {
        ...info.flags,
        ...flags
      };
      return;
    }

    info = info.parent!;
  }
}

export function getClosestParentOfType(info: NodeInfo, kind: ts.SyntaxKind, includeSelf = false): NodeInfo | null {
  if (!includeSelf) {
    info = info.parent!;
  }

  while (info) {
    if (kind === info.node.kind) {
      return info;
    }

    info = info.parent!;
  }

  return null;
}

export function getClosestParentOfAnyType(info: NodeInfo, kind: ts.SyntaxKind[], includeSelf = false): NodeInfo | null {
  if (!includeSelf) {
    info = info.parent!;
  }

  while (info) {
    if (kind.includes(info.node.kind)) {
      return info;
    }

    info = info.parent!;
  }

  return null;
}

export function getClosestParentOfTypeWithFlag(info: NodeInfo, kind: ts.SyntaxKind, flags: NodeInfo['flags']): NodeInfo | null {
  info = info.parent!; // Don't count current node!

  while (info) {
    if (
      kind === info.node.kind &&
      // this checks that element's flags have values according to all passed flags
      Object.keys(flags).reduce<boolean>((acc, key: keyof NodeInfo['flags']) => acc && flags[key] === info.flags[key], true)
    ) {
      return info;
    }

    info = info.parent!;
  }

  return null;
}

/**
 * Return first child of given type
 *
 * @param node
 * @param type
 * @return NodeInfo | undefined
 */
export function getChildByType(node: NodeInfo, type: ts.SyntaxKind): NodeInfo | undefined {
  return node.children.find((c) => c.node.kind === type);
}

/**
 * Find node by type chain in children tree.
 * If target type is array of types, first found type will be taken.
 * @param node
 * @param types
 */
export function getChildChainByType(node: NodeInfo, types: Array<ts.SyntaxKind | ts.SyntaxKind[]>): NodeInfo | undefined {
  let intermediateNode: NodeInfo | undefined = node;

  for (let typeIndex = 0; typeIndex < types.length; typeIndex++) {
    const t = types[typeIndex];
    intermediateNode = intermediateNode.children.find((c) => {
      if (Array.isArray(t)) {
        return t.includes(c.node.kind);
      }
      return c.node.kind === types[typeIndex];
    });
    if (!intermediateNode) {
      return;
    }
  }

  return intermediateNode;
}

/**
 * Return naive array of children of given types
 *
 * @param node
 * @param types
 * @return Array<NodeInfo>
 */
export function getChildrenByTypes(node: NodeInfo, types: ts.SyntaxKind[]): NodeInfo[] {
  let ret: NodeInfo[] = [];
  let typeIndex = 0;

  for (let i = 0; i < node.children.length; i++) {
    if (node.children[i].node.kind === types[typeIndex]) {
      ret.push(node.children[i]);
      typeIndex++;
    }
  }

  return ret;
}

/**
 * Return child matching one of selected types
 *
 * @param node
 * @param types
 * @return NodeInfo | undefined
 */
export function getChildByAnyType(node: NodeInfo, types: ts.SyntaxKind[]): NodeInfo | undefined {
  for (let i = 0; i < node.children.length; i++) {
    if (types.includes(node.children[i].node.kind)) {
      return node.children[i];
    }
  }

  return undefined;
}

/**
 * Return child matching one of selected types following the specified type of child
 * @param node
 * @param marker
 * @param types
 * @return NodeInfo | undefined
 */
export function getChildOfAnyTypeAfterSelected(node: NodeInfo, marker: ts.SyntaxKind, types: ts.SyntaxKind[]): NodeInfo | undefined {
  for (let i = 0; i < node.children.length; i++) {
    if (types.includes(node.children[i].node.kind) && (node.children[i - 1] && node.children[i - 1].node.kind === marker)) {
      return node.children[i];
    }
  }

  return undefined;
}

export type TypeNodeTuple = [ts.SyntaxKind, TypeNodeStruct]; // [0] is current node type, [1] is children description
export type TypeNodeStruct = Array<ts.SyntaxKind | TypeNodeTuple>;
export type NodeLeaf = Array<NodeInfo | NodeLeaf>;

/**
 * Get nodes from tree by tree-like selector
 * See example in unit-tests.
 *
 * @param node
 * @param selector
 */
export function getChildrenByTree(node: NodeInfo, selector: TypeNodeStruct): NodeLeaf {
  let nextIndexToSeek = 0;
  let ret: NodeLeaf = [];

  for (let i = 0; i < selector.length; i++) {
    const t = selector[i];
    if (Array.isArray(t)) { // tuple, drill down
      const [childType, nestedSelector] = t;
      for (let i = nextIndexToSeek; i < node.children.length; i++) {
        if (node.children[i].node.kind === childType) {
          ret.push(getChildrenByTree(node.children[i], nestedSelector));
          nextIndexToSeek = i + 1;
          break;
        }
      }
    } else {
      for (let i = nextIndexToSeek; i < node.children.length; i++) {
        if (node.children[i].node.kind === t) {
          ret.push(node.children[i]);
          nextIndexToSeek = i + 1;
          break;
        }
      }
    }
  }

  return ret;
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

export function getCallExpressionLeftSide(self: NodeInfo) {
  return getChildChainByType(self, [
    ts.SyntaxKind.PropertyAccessExpression,
    RightHandExpressionLike
  ]);
}

export function getCallExpressionArg(self: NodeInfo) {
  return getChildChainByType(self, [
    ts.SyntaxKind.SyntaxList,
    RightHandExpressionLike
  ]);
}

export function getCallExpressionCallbackArg(self: NodeInfo) {
  return getChildChainByType(self, [
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

export function isExportedVar(node: ts.Identifier) {
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

/**
 * Debug only dumper
 *
 * @param node
 * @param index
 * @param level
 */
export function dumpKindTree(node: NodeInfo, index = -1, level = 1) {
  if (level === 1) {
    process.stdout.write('---------' + '\n');
  }
  process.stdout.write('> '.repeat(level) + ts.SyntaxKind[node.node.kind] + `[${index || '0'}] \n`);
  node.children.forEach((child, index) => dumpKindTree(child, index, level + 1));
}
