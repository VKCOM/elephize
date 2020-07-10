import * as ts from 'typescript';
import { Declaration, NsMap } from '../../types';
import { ModuleRegistry } from '../cjsModules/moduleRegistry';
import { CommonjsModule } from '../cjsModules/commonjsModule';
import { Scope } from '../unusedCodeElimination/usageGraph';
import { Context } from '../context';
import { log, LogVerbosity } from '../../utils/log';
import { renderNode } from './renderNodes';
import { NodeFlagStore } from './nodeFlagStore';

/**
 * Module-level codegen. May emit one or more modules (in case of extracted component)
 *
 * @param checker
 * @param options
 * @param root
 * @param nodeFlagsStore
 * @param baseDir - Note! This should be the SAME baseDir as passed into typescript as compilerOptions.baseUrl!
 * @param namespaces
 * @param registry
 * @param currentModule
 * @param disableCodeElimination
 * @param customGlobals
 */
export function renderModule(
  checker: ts.TypeChecker,
  options: ts.CompilerOptions,
  root: ts.Node,
  nodeFlagsStore: NodeFlagStore,
  baseDir: string,
  namespaces: NsMap,
  registry: ModuleRegistry,
  currentModule: CommonjsModule,
  disableCodeElimination = false,
  customGlobals: { [key: string]: string } = {}
): void {
  Scope._forceDisableUnusedVarsElimination = disableCodeElimination;
  const moduleScope = Scope.newRootScope<Declaration>({flags: 0}, currentModule.sourceFileName, [
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
    checker,
    nodeFlagsStore,
    options,
    currentModule,
    true,
    baseDir,
    namespaces,
    registry,
    customGlobals
  );

  // First pass: build trees and collect var usage info
  renderNode(root, contextDry);

  // Trigger usage vars graph traversal
  moduleScope.terminalNode.markUsage();

  if (log.verbosity! & LogVerbosity.WITH_USAGE_GRAPH_DUMP) {
    moduleScope.terminalNode._dump();
  }

  currentModule.clearStatements();
  registry.clearClasses();
  nodeFlagsStore.clear();

  let context = new Context(
    moduleScope,
    checker,
    nodeFlagsStore,
    options,
    currentModule,
    false,
    baseDir,
    namespaces,
    registry,
    customGlobals
  );

  // Second pass: build code with cleaned unused vars
  renderNode(root, context);
}