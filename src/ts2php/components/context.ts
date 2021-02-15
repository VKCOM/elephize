import * as ts from 'typescript';
import { ModuleRegistry } from './cjsModules/moduleRegistry';
import { CommonjsModule } from './cjsModules/commonjsModule';
import { Scope } from './unusedCodeElimination/usageGraph';
import { BoundNode } from './unusedCodeElimination/usageGraph/node';
import { ctx, LogObj, shortCtx } from '../utils/log';
import { NsMap } from '../types';
import { NodeFlagStore } from './codegen/nodeFlagStore';

export class Context<T> {
  protected _uniqIdStack: string[] = [];
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
    public readonly log: LogObj
  ) { }

  public get scope() {
    return this._scope;
  }

  public pushScope(uniqid: string, ownerIdent: string) { // should be called strictly after addDeclaration!
    // log.INFO('Push scope w/' + ownerIdent + ' / ' + uniqid)

    this._uniqIdStack.push(uniqid);
    const node = this._scope.declarations.get(ownerIdent);

    if (node && (node as BoundNode<T>).ownedScope && this.dryRun) {
      this.log.error('Reassignment of functional scopes is not supported: %s', [ownerIdent], shortCtx(this.moduleDescriptor.sourceFileName));
    }

    if (!node || node.homeScope !== this._scope) {
      this.log.warn('Failed to push scope into stack, this may lead to errors; (%s / %s)',  [ownerIdent, uniqid]);
      return;
    }

    this._scope = node.spawnScope(this.moduleDescriptor.sourceFileName, this.dryRun);
  }

  public popScope(uniqid: string, context?: ts.Node) {
    // log.INFO('Pop scope / ' + uniqid)
    if (uniqid !== this._uniqIdStack[this._uniqIdStack.length - 1]) {
      throw new Error('Attempt to pop frame that is not on top of stack: this should not happen and probably is a bug in transpiler \n' + ctx(context));
    }
    this._uniqIdStack.pop();
    if (!this._scope.parentScope) {
      throw new Error('Call stack got out of bounds: this should not happen and probably is a bug in transpiler \n' + ctx(context));
    }
    this._scope = this._scope.parentScope;
  }
}