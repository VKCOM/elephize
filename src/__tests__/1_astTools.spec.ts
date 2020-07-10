import { translateCode, defaultOptions } from '../ts2php/components/codegen/translateCode';
import * as path from 'path';
import { getProgram } from '../ts2php/utils/programFromString';
import * as ts from 'typescript';
import { log } from '../ts2php/utils/log';
import {
  flagParentOfType,
  getChildChainByType,
  getClosestParentOfType,
  getClosestParentOfTypeWithFlag,
  getLeftExpr
} from '../ts2php/utils/ast';
import { NodeFlagStore } from '../ts2php/components/codegen/nodeFlagStore';

log.verbosity = 0; // remove or set more verbose for debug

function compile(files: string[]): ts.SourceFile | undefined {
  let program = getProgram(files, [],
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

function findFirstNode(where: ts.Node, type: ts.SyntaxKind) {
  function _traverse(where: ts.Node, type: ts.SyntaxKind): ts.Node | null {
    if (where.kind === type) {
      return where;
    }

    for (let child of where.getChildren()) {
      const result = _traverse(child, type);
      if (result) {
        return result;
      }
    }

    return null;
  }

  return _traverse(where, type);
}

function recompile(fileNames: string[], onData: (filename: string, rootNode: ts.Node) => void): NodeFlagStore {
  return translateCode({
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
  const store = recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode) => {
    const stringLiteral = findFirstNode(rootNode, ts.SyntaxKind.StringLiteral);
    if (!stringLiteral) {
      throw new Error('No literal found');
    }
    flagParentOfType(stringLiteral, [ts.SyntaxKind.VariableDeclaration], { name: 'ololo' }, store);
    const expr = findFirstNode(rootNode, ts.SyntaxKind.VariableDeclaration);
    if (!expr) {
      throw new Error('No expression found');
    }

    expect(store.get(expr)).toMatchObject({ name: 'ololo' });
  });
});

test('ts2php.AstTools.flagParentOfType.Notfound', () => {
  const store = recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode) => {
    const stringLiteral = findFirstNode(rootNode, ts.SyntaxKind.StringLiteral);
    if (!stringLiteral) {
      throw new Error('No literal found');
    }
    flagParentOfType(stringLiteral, [ts.SyntaxKind.VariableDeclaration], { name: 'ololo' }, store);
    const expr = findFirstNode(rootNode, ts.SyntaxKind.VariableDeclaration);
    if (!expr) {
      throw new Error('No expression found');
    }

    expect(store.get(expr)).toMatchObject({});
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
  const store = recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode) => {
    const stringLiteral = findFirstNode(rootNode, ts.SyntaxKind.StringLiteral);
    if (!stringLiteral) {
      throw new Error('No literal found');
    }
    flagParentOfType(stringLiteral, [ts.SyntaxKind.CallExpression], { name: 'ololo' }, store);
    const parent = getClosestParentOfTypeWithFlag(stringLiteral, ts.SyntaxKind.CallExpression, { name: 'ololo' }, store);
    const expr = findFirstNode(rootNode, ts.SyntaxKind.CallExpression);
    if (!expr) {
      throw new Error('No expression found');
    }

    expect(parent).toMatchObject(expr);
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
    expect(call!.kind).toEqual(ts.SyntaxKind.CallExpression);
  });
});
