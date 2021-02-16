import { Scope } from './scope';
import { LogObj, LogVerbosity } from '../../../utils/log';

export const isBound = <T>(node: ScopeNode<T>): node is BoundNode<T> => node._type === 'early_bound';
export const isPending = <T>(node: ScopeNode<T>): node is BindPendingNode<T> => node._type === 'late_bound';

export class ScopeNode<T extends { [key: string]: any }> {
  public readonly _type: 'abstract' | 'early_bound' | 'late_bound' = 'abstract';
  /**
   * Edges list: contains nodes connected to current node. Directed.
   */
  protected _edges: Set<ScopeNode<T>> = new Set();
  /**
   * Custom data for current node. May contain some user-defined flags or be empty.
   */
  public readonly data: T;
  /**
   * Traverse mark: common flag, used in DFS
   */
  protected _traverseMark = false;
  /**
   * Target nodes where current unbound node is to be replaced with bound node.
   * This should be filled in BindPendingNode, and is intended to be READONLY in BoundNode it's replaced with.
   * @protected
   */
  protected _tmpTraceTargetNodes: Map<string, ScopeNode<T>> = new Map();

  public constructor(
    /**
     * Variable or func name, unique in its scope.
     */
    public readonly ident: string,
    /**
     * Functional scope this var belongs to.
     */
    public readonly homeScope: Scope<T>,
    data: T,
    protected readonly log: LogObj
  ) {
    this.data = { ...data };
  }

  public spawnScope(sourceFile: string, dryRun: boolean): Scope<T> {
    throw new Error((dryRun ? '[dry]' : '') +'Can\'t spawn new scope on unbound node!');
  }

  /**
   *
   * @param node
   * @private
   */
  protected _genCharString(node: ScopeNode<T>) {
    return `${node.ident}[${node._type === 'early_bound' ? 'B' : 'b'}${node.used ? 'U' : 'u'}]`;
  }

  /**
   * Small letters indicate false boolean flag, capitals indicate true
   * B: bound
   * U: used
   */
  public toString(): string {
    return this._genCharString(this) +
      `\n\t-> [ ${Array.from(this._edges).map((n) => this._genCharString(n)).join(', ')} ]`;
  }

  /**
   * Add dependency: current node depends on given node (uses it somehow).
   * @param node
   */
  public addEdgeTo(node: ScopeNode<T>) {
    if (isBound(node) && node._ownedScope) {
      this._edges.add(node._ownedScope.localTerminalNode); // for proper handling of return instructions
    }
    if (isPending(node)) {
      node.revdep(this);
    }
    this._edges.add(node);
  }

  /**
   * Remove dependency of this node on some another node
   * @param node
   */
  public removeEdgeTo(node: ScopeNode<T>) {
    if (isBound(node) && node._ownedScope) {
      this._edges.delete(node._ownedScope.localTerminalNode); // for proper handling of return instructions
    }
    this._edges.delete(node);
  }

  /**
   * Simple DFS with marks
   * @param cb
   * @param traversedNodeList
   * @param bailOnUnbound
   * @private
   */
  protected _traverse(cb: (node: ScopeNode<T>) => boolean, traversedNodeList: Set<ScopeNode<T>>, bailOnUnbound: boolean) {
    this._edges.forEach((node) => {
      if (bailOnUnbound && !isBound(node)) {
        this.log.error('Identifier "%s" was used but was never declared. This is compile error', [node.ident], this.log.shortCtx(this.homeScope.sourceFile));
        return;
      }
      if (node._traverseMark) {
        return;
      }
      node._traverseMark = true;
      traversedNodeList.add(node);
      if (cb(node)) {
        node._traverse(cb, traversedNodeList, bailOnUnbound);
      }
    });
  }

  /**
   * Traverse usage graph with DFS and then reset traverse
   * marks to ensure proper work of following traversals.
   * @param cb
   * @param bail
   */
  public traverse(cb: (node: BoundNode<T>) => boolean, bail = true) {
    const nodeList: Set<ScopeNode<T>> = new Set();
    this._traverse(cb, nodeList, bail);
    nodeList.forEach((node) => node._traverseMark = false); // reset traverse marks
  }

  public _dump(printer = console.log) {
    printer(this.toString());
    return this.traverse((node) => {
      printer(node.toString());
      return true;
    }, false);
  }

  /**
   * Flag for usage mark
   * True if current identifier is used by some other identifier or by terminal node
   */
  protected _usageMark = false;
  public get used() { return this._usageMark; }
  protected _markUsed() {
    if (this.log.verbosity & LogVerbosity.WITH_USAGE_GRAPH_DUMP) {
      this.log.info('Marking node as used: %s', [this.ident]);
    }
    this._usageMark = true;
  }
  public reset() {
    if (this.log.verbosity & LogVerbosity.WITH_USAGE_GRAPH_DUMP) {
      this.log.info('Resetting node usage: %s', [this.ident]);
    }
    this._usageMark = false;
  }

  /**
   * Call this method on terminal node to travers and mark all used identifiers in all scopes.
   * Use homeScope.reset() to uncheck usage marks
   */
  public markUsage() {
    if (this.ident !== Scope.tNode) {
      this.log.error('Mark usage method is not expected to be applied to non-terminal nodes', [], this.log.shortCtx(this.homeScope.sourceFile));
      return;
    }

    if (isBound(this)) {
      this._markUsed();
    } else {
      this.log.error('Undeclared or dropped identifier encountered: %s', [this.ident], this.log.shortCtx(this.homeScope.sourceFile));
    }

    this.traverse((node: ScopeNode<T>) => {
      if (isBound(node)) {
        node._markUsed();
      } else {
        this.log.error('Undeclared or dropped identifier encountered: %s', [node.ident], this.log.shortCtx(this.homeScope.sourceFile));
      }
      return true;
    });
  }
}

export class BoundNode<T extends { [key: string]: any }> extends ScopeNode<T> {
  public readonly _type = 'early_bound';

  public constructor(ident: string, homeScope: Scope<T>, data: T, log: LogObj, traceTargetNodes: Array<ScopeNode<T>> = [], tmpSourceTargets?: Map<string, ScopeNode<T>>) {
    super(ident, homeScope, data, log);
    this._tmpTraceTargetNodes = tmpSourceTargets || new Map();
    traceTargetNodes.forEach((node) => this.addEdgeTo(node));
  }

  /**
   * Scope created with this var.
   * Applicable only to bound functional identifiers.
   */
  public _ownedScope?: Scope<T>;
  /**
   * Get scope created by this identifier
   */
  public get ownedScope() {
    return this._ownedScope;
  }

  /**
   * Create scope for this identifier.
   * Equivalent to adding new stack frame to the call stack.
   */
  public spawnScope(sourceFile: string, dryRun: boolean) {
    if (dryRun) {
      this._ownedScope = this.homeScope._addChildScope(sourceFile, this);
    } // else: owned scope is expected to already exist

    if (!this._ownedScope) {
      throw new Error('Failed to get owned scope!');
    }

    // If this node was unbound once, it should have temporary trace targets,
    // we should append our local terminals there in order to make our unused
    // vars collector work well with function hoisting.
    this._tmpTraceTargetNodes.forEach((node) => {
      const localTerm = this._ownedScope?.localTerminalNode;
      if (localTerm) {
        node.addEdgeTo(localTerm);
      }
    });

    return this._ownedScope;
  }
}

// Late-bound graph node
export class BindPendingNode<T extends { [key: string]: any }> extends ScopeNode<T> {
  public readonly _type = 'late_bound';

  public revdep(node: ScopeNode<T>) {
    // TODO: this may fail in case of shadowing functions
    this._tmpTraceTargetNodes.set(node.ident, node);
  }

  public makeBoundNode(traceTargetNodes: Array<ScopeNode<T>>, withHomeScope: Scope<T>): BoundNode<T> {
    return new BoundNode<T>(
      this.ident,
      withHomeScope,
      this.data,
      this.log,
      Array.from(this._edges).concat(traceTargetNodes),
      this._tmpTraceTargetNodes
    );
  }

  public replaceWith(node: BoundNode<T>) {
    this._tmpTraceTargetNodes.forEach((n) => {
      n.removeEdgeTo(this);
      n.addEdgeTo(node);
    });
  }
}