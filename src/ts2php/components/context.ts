import * as ts from 'typescript';
import { ModuleRegistry } from './cjsModules/moduleRegistry';
import { CommonjsModule } from './cjsModules/commonjsModule';
import { Scope } from './unusedCodeElimination/usageGraph';
import { BoundNode } from './unusedCodeElimination/usageGraph/node';
import { log, LogSeverity, shortCtx } from '../utils/log';
import { NsMap } from '../types';
import { NodeFlagStore } from './codegen/nodeFlagStore';

export class Context<T> {
  public constructor(
    protected _scope: Scope<T>,
    public checker: ts.TypeChecker,
    public nodeFlagsStore: NodeFlagStore,
    public readonly compilerOptions: ts.CompilerOptions,
    public moduleDescriptor: CommonjsModule,
    public dryRun: boolean,
    public baseDir: string,
    public readonly namespaces: NsMap,
    public readonly registry: ModuleRegistry,
    public readonly customGlobals: { [key: string]: string }
  ) { }

  public get scope() {
    return this._scope;
  }

  public pushScope(ownerIdent: string) { // should be called strictly after addDeclaration!
    const node = this._scope.declarations.get(ownerIdent);

    if (node && (node as BoundNode<T>).ownedScope && this.dryRun) {
      log('Reassignment of functional scopes is not supported: ' + ownerIdent, LogSeverity.ERROR, shortCtx(this.moduleDescriptor.sourceFileName));
    }

    if (!node || node.homeScope !== this._scope) {
      return;
    }

    this._scope = node.spawnScope(this.moduleDescriptor.sourceFileName, this.dryRun);
  }

  public popScope() {
    if (!this._scope.parentScope) {
      throw new Error('Call stack got out of bounds: this should not happen and probably is a bug in transpiler');
    }
    this._scope = this._scope.parentScope;
  }
}