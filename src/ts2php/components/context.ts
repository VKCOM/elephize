import * as ts from 'typescript';
import { ModuleRegistry } from './cjsModules/moduleRegistry';
import { CommonjsModule } from './cjsModules/commonjsModule';
import { Scope } from './unusedCodeElimination/usageGraph';
import { BoundNode } from './unusedCodeElimination/usageGraph/node';
import { LogObj } from '../utils/log';
import { JSXPreferences, NsMap } from '../types';
import { NodeFlagStore } from './codegen/nodeFlagStore';

export class Context<T> {
  protected _jsxTagStack: string[] = [];
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
    public readonly encoding: string,
    public readonly registry: ModuleRegistry,
    public readonly log: LogObj,
    public readonly builtinsNs: string,
    public readonly jsxPreferences?: JSXPreferences,
  ) { }

  public get scope() {
    return this._scope;
  }

  public jsxPush(tag: string): void {
    this._jsxTagStack.push(tag);
  }

  public jsxPop(tag: string): void {
    const popped = this._jsxTagStack.pop();
    if (popped !== tag) {
      this.log.warn('Tried to pop %s out of jsx tag stack, but found %s. This is probably error in compiler.', [tag, popped || '""']);
    }
  }

  public jsxPeak(): string | null {
    return this._jsxTagStack[this._jsxTagStack.length - 1] || null;
  }

  public pushScope(uniqid: string, ownerIdent: string) { // should be called strictly after addDeclaration!
    // log.INFO('Push scope w/' + ownerIdent + ' / ' + uniqid)

    this._uniqIdStack.push(uniqid);
    const node = this._scope.declarations.get(ownerIdent);

    if (node && (node as BoundNode<T>).ownedScope && this.dryRun) {
      this.log.error('Reassignment of functional scopes is not supported: %s', [ownerIdent], this.log.shortCtx(this.moduleDescriptor.sourceFileName));
    }

    if (!node || node.homeScope !== this._scope) {
      this.log.warn('Failed to push scope into stack, this may lead to errors; (%s / %s)', [ownerIdent, uniqid]);
      return;
    }

    this._scope = node.spawnScope(this.moduleDescriptor.sourceFileName, this.dryRun);
  }

  public popScope(uniqid: string, context?: ts.Node) {
    // log.INFO('Pop scope / ' + uniqid)
    if (uniqid !== this._uniqIdStack[this._uniqIdStack.length - 1]) {
      throw new Error('Attempt to pop frame that is not on top of stack: this should not happen and probably is a bug in transpiler \n' + this.log.ctx(context));
    }
    this._uniqIdStack.pop();
    if (!this._scope.parentScope) {
      throw new Error('Call stack got out of bounds: this should not happen and probably is a bug in transpiler \n' + this.log.ctx(context));
    }
    this._scope = this._scope.parentScope;
  }
}
