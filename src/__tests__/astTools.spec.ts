import { translateCode, defaultOptions } from '../ts2php/components/codeGenerator';
import * as path from 'path';
import { getProgram } from '../ts2php/utils/programFromString';
import * as ts from 'typescript';
import { log } from '../ts2php/utils/log';
import {
  flagParentOfType, getChildByType, getChildChainByType, getChildrenByTree, getChildrenByTypes,
  getClosestParentOfType,
  getClosestParentOfTypeWithFlag,
  getLeftExpr, TypeNodeStruct
} from '../ts2php/utils/ast';
import { NodeInfo } from '../ts2php/types';

log.verbosity = 0; // remove or set more verbose for debug

function compile(files: string[]): ts.SourceFile | undefined {
  let program = getProgram(files,
    {
      compilerOptions: defaultOptions
    },
    () => null
  );
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) { // skip .d.ts if any
      return sourceFile;
    }
  }
}

function findFirstNode(where: NodeInfo, type: ts.SyntaxKind) {
  function _traverse(where: NodeInfo, type: ts.SyntaxKind): NodeInfo | null {
    if (where.node.kind === type) {
      return where;
    }

    for (let child of where.children) {
      const result = _traverse(child, type);
      if (result) {
        return result;
      }
    }

    return null;
  }

  return _traverse(where, type);
}

function recompile(fileNames: string[], onData: (filename: string, rootNode: NodeInfo) => void) {
  translateCode({
    fileNames,
    baseDir: '',
    aliases: {},
    namespaces: { root: '', builtins: '' },
    onBeforeRender: onData,
    onData: () => undefined
  });
}

test('ts2php.AstTools.leftExpr', () => {
  const srcNode = compile([path.resolve(__dirname, 'specimens', 'astTools', 'leftExpr.ts')]);
  if (!srcNode) {
    throw new Error('File not found');
  }

  const [ expr ] = srcNode.statements.slice(1, 2);
  const lExp = (expr.getChildren(srcNode)[0] as ts.BinaryExpression).left;

  const result = getLeftExpr(lExp as ts.LeftHandSideExpression, srcNode);
  expect(result).toBeTruthy();
  expect(result?.kind).toEqual(ts.SyntaxKind.Identifier);
  expect(result?.escapedText).toEqual('ident');
});

test('ts2php.AstTools.flagParentOfType', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode) => {
    const stringLiteral = findFirstNode(rootNode, ts.SyntaxKind.StringLiteral);
    if (!stringLiteral) {
      throw new Error('No literal found');
    }
    flagParentOfType(stringLiteral, [ts.SyntaxKind.VariableDeclaration], { name: 'ololo' });
    const expr = findFirstNode(rootNode, ts.SyntaxKind.VariableDeclaration);
    if (!expr) {
      throw new Error('No expression found');
    }

    expect(expr.flags).toMatchObject({ name: 'ololo' });
  });
});

test('ts2php.AstTools.flagParentOfType.Notfound', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode) => {
    const stringLiteral = findFirstNode(rootNode, ts.SyntaxKind.StringLiteral);
    if (!stringLiteral) {
      throw new Error('No literal found');
    }
    flagParentOfType(stringLiteral, [ts.SyntaxKind.BinaryExpression], { name: 'ololo' });
    const expr = findFirstNode(rootNode, ts.SyntaxKind.VariableDeclaration);
    if (!expr) {
      throw new Error('No expression found');
    }

    expect(expr.flags).toMatchObject({});
  });
});

test('ts2php.AstTools.getClosestParentOfType', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode) => {
    const stringLiteral = findFirstNode(rootNode, ts.SyntaxKind.StringLiteral);
    if (!stringLiteral) {
      throw new Error('No literal found');
    }
    const parent = getClosestParentOfType(stringLiteral, ts.SyntaxKind.VariableDeclaration);
    const expr = findFirstNode(rootNode, ts.SyntaxKind.VariableDeclaration);
    if (!expr) {
      throw new Error('No expression found');
    }

    expect(parent).toMatchObject(expr);
  });
});

test('ts2php.AstTools.getClosestParentOfTypeWithFlag', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode) => {
    const stringLiteral = findFirstNode(rootNode, ts.SyntaxKind.StringLiteral);
    if (!stringLiteral) {
      throw new Error('No literal found');
    }
    flagParentOfType(stringLiteral, [ts.SyntaxKind.CallExpression], { name: 'ololo' });
    const parent = getClosestParentOfTypeWithFlag(stringLiteral, ts.SyntaxKind.CallExpression, { name: 'ololo' });
    const expr = findFirstNode(rootNode, ts.SyntaxKind.CallExpression);
    if (!expr) {
      throw new Error('No expression found');
    }

    expect(parent).toMatchObject(expr);
  });
});

test('ts2php.AstTools.getChildByType', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode) => {
    const decl = findFirstNode(rootNode, ts.SyntaxKind.VariableDeclaration);
    if (!decl) {
      throw new Error('No declaration found');
    }

    const call = getChildByType(decl, ts.SyntaxKind.CallExpression);
    expect(call).toBeTruthy();
    expect(call!.node.kind).toEqual(ts.SyntaxKind.CallExpression);
  });
});

test('ts2php.AstTools.getChildChainByType', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode) => {
    const stmt = findFirstNode(rootNode, ts.SyntaxKind.VariableStatement);
    if (!stmt) {
      throw new Error('No statement found');
    }

    const call = getChildChainByType(stmt, [
      ts.SyntaxKind.VariableDeclarationList,
      ts.SyntaxKind.SyntaxList,
      ts.SyntaxKind.VariableDeclaration,
      ts.SyntaxKind.CallExpression
    ]);
    expect(call).toBeTruthy();
    expect(call!.node.kind).toEqual(ts.SyntaxKind.CallExpression);
  });
});

test('ts2php.AstTools.getChildrenByTypes', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'synList.ts')], (filename, rootNode) => {
    const lit = findFirstNode(rootNode, ts.SyntaxKind.ArrayLiteralExpression);
    if (!lit) {
      throw new Error('No literal found');
    }

    const list = getChildByType(lit, ts.SyntaxKind.SyntaxList);
    if (!list) {
      throw new Error('No syntax list found');
    }

    const [num, parExp, fls] = getChildrenByTypes(list, [
      ts.SyntaxKind.NumericLiteral,
      ts.SyntaxKind.ParenthesizedExpression,
      ts.SyntaxKind.FalseKeyword
    ]);
    expect(num).toBeTruthy();
    expect(parExp).toBeTruthy();
    expect(fls).toBeTruthy();
    expect(num.node.kind).toEqual(ts.SyntaxKind.NumericLiteral);
    expect(parExp.node.kind).toEqual(ts.SyntaxKind.ParenthesizedExpression);
    expect(fls.node.kind).toEqual(ts.SyntaxKind.FalseKeyword);
  });
});

test('ts2php.AstTools.getChildrenByTree', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'synList.ts')], (filename, rootNode) => {
    const decl = findFirstNode(rootNode, ts.SyntaxKind.VariableDeclaration);
    if (!decl) {
      throw new Error('No declaration found');
    }

    const selector: TypeNodeStruct = [
      ts.SyntaxKind.Identifier,
      [ts.SyntaxKind.ArrayLiteralExpression, [
        [ts.SyntaxKind.SyntaxList, [
          ts.SyntaxKind.NumericLiteral,
          [ts.SyntaxKind.ParenthesizedExpression, [
            [ts.SyntaxKind.BinaryExpression, [
              ts.SyntaxKind.NumericLiteral,
              ts.SyntaxKind.PlusToken,
              ts.SyntaxKind.NumericLiteral
            ]]
          ]]
        ]]
      ]]
    ];

    const [ident, [[num, [[num1, plus, num2]]]]]: any = getChildrenByTree(decl, selector);

    expect(ident).toBeTruthy();
    expect(num).toBeTruthy();
    expect(num1).toBeTruthy();
    expect(plus).toBeTruthy();
    expect(num2).toBeTruthy();
    expect(ident.node.kind).toEqual(ts.SyntaxKind.Identifier);
    expect(num.node.kind).toEqual(ts.SyntaxKind.NumericLiteral);
    expect(num1.node.kind).toEqual(ts.SyntaxKind.NumericLiteral);
    expect(plus.node.kind).toEqual(ts.SyntaxKind.PlusToken);
    expect(num2.node.kind).toEqual(ts.SyntaxKind.NumericLiteral);
  });
});

