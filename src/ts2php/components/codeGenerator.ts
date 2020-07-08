import * as ts from 'typescript';
import { Declaration, Dict, NodeInfo, NsMap, TranslateOptions } from '../types';
import { getNodeInfo } from '../renderers';
import { getProgram } from '../utils/programFromString';
import { Context } from './context';
import { log, LogSeverity, LogVerbosity } from '../utils/log';
import * as prettier from 'prettier/standalone';
import { phpPrettierOptions } from '../internalConfig/phpPrettierOptions';
import { ModuleRegistry } from './cjsModules/moduleRegistry';
import { CommonjsModule } from './cjsModules/commonjsModule';
import { normalizeBasePath, normalizeFileExt } from '../utils/pathsAndNames';
import { Scope } from './unusedCodeElimination/usageGraph';

export const defaultOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES5,
  lib: [
    'lib.d.ts',
    'lib.dom.d.ts',
    'lib.es5.d.ts'
  ],
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  module: ts.ModuleKind.CommonJS,
  jsx: ts.JsxEmit.React,
  allowUnreachableCode: true,
  allowJs: true,
  isolatedModules: true,
  resolveJsonModule: true,
};

export function translateCode({
  fileNames,
  onData,
  onBeforeRender = () => undefined,
  baseDir,
  customGlobals = {},
  disableCodeElimination = false,
  aliases = {},
  namespaces,
  options = defaultOptions,
  onFinish = () => undefined
}: TranslateOptions): void {
  let program = getProgram(
    fileNames,
    {
      compilerOptions: { ...defaultOptions, ...options }
    },
    () => null
  );

  let registry = new ModuleRegistry(baseDir, aliases, options.paths || {}, namespaces);
  let checker = program.getTypeChecker();
  // console.log(options);
  // console.log(program.getSourceFiles().map((f) => f.fileName));
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) { // skip .d.ts if any
      let content = getInfo(sourceFile, checker, program.getCompilerOptions());
      let currentModule = registry.registerClass(sourceFile.fileName);
      if (!currentModule) {
        continue;
      }

      onBeforeRender(sourceFile.fileName, content);
      renderCode(content, baseDir, namespaces, registry, currentModule, disableCodeElimination, customGlobals);
    }
  }

  registry.forEachModule((mod: CommonjsModule) => {
    if (mod.isEmpty()) {
      // Do not emit empty modules
      log(`Dropping module ${mod.className} (${mod.targetFileName}) because it's empty`, LogSeverity.INFO);
      return;
    }
    let content = mod.generateContent();
    try {
      content = prettier.format(content, phpPrettierOptions);
    } catch (e) {
      console.error('Prettier failed to parse & prettify generated code. Here is raw code:');
      console.log(content);
    }

    onData(mod.targetFileName, content);
  });

  onFinish(registry);
}

/**
 * Module-level codegen. May emit one or more modules (in case of extracted component)
 *
 * @param info
 * @param baseDir - Note! This should be the SAME baseDir as passed into typescript as compilerOptions.baseUrl!
 * @param namespaces
 * @param registry
 * @param currentModule
 * @param disableCodeElimination
 * @param customGlobals
 */
function renderCode(
  info: NodeInfo,
  baseDir: string,
  namespaces: NsMap,
  registry: ModuleRegistry,
  currentModule: CommonjsModule,
  disableCodeElimination = false,
  customGlobals: { [key: string]: string } = {}
): void {
  Scope._forceDisableUnusedVarsElimination = disableCodeElimination;
  const moduleScope = Scope.newRootScope<Declaration>({ flags: 0 }, currentModule.sourceFileName, [
    'console',
    'document',
    'window',
    'Math',
    'Object',
    'Array',
    ...Object.keys(customGlobals)
  ]);

  let contextDry = new Context<Declaration>(
    moduleScope,
    info.checker,
    info.compilerOptions,
    currentModule,
    true,
    baseDir,
    namespaces,
    registry,
    customGlobals
  );
  info.node.gen(info, contextDry); // First pass: build trees and collect var usage info

  if (log.verbosity! & LogVerbosity.WITH_USAGE_GRAPH_DUMP) {
    moduleScope.terminalNode._dump();
  }

  // Trigger usage vars graph traversal
  moduleScope.terminalNode.markUsage();

  currentModule.clearStatements();
  registry.clearClasses();

  let context = new Context(
    moduleScope,
    info.checker,
    info.compilerOptions,
    currentModule,
    false,
    baseDir,
    namespaces,
    registry,
    customGlobals
  );

  info.node.gen(info, context); // Second pass: build code with cleaned unused vars
}

function getInfo(node: ts.Node, checker: ts.TypeChecker, opts: ts.CompilerOptions): NodeInfo {
  let children = node.getChildren();
  let nodeInfo: NodeInfo = {
    node: getNodeInfo(node),
    checker,
    compilerOptions: opts,
    children: [],
    flags: {
      localsData: {
        regStatements: []
      }
    }
  };

  for (let child of children) {
    nodeInfo.children.push(getInfo(child, checker, opts));
    nodeInfo.children[nodeInfo.children.length - 1].parent = nodeInfo;
  }

  return nodeInfo;
}

export function makeBootstrap(registry: ModuleRegistry, baseDir: string, aliases?: Dict<string>) {
  let names: string[] = [];
  registry.forEachModule((m) => {
    if (!m.isEmpty()) {
      names.push(m.targetFileName);
    }
  });
  const deps = names.map((fn) => {
    const path = fn.replace(baseDir, '');
    const modPath = normalizeFileExt(normalizeBasePath(path, baseDir, aliases));
    return `require_once __DIR__ . "/${modPath}";`;
  });

  return `<?php
require_once __DIR__ . "/builtins.php";
${deps.join('\n')}

`;
}
