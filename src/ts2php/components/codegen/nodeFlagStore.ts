import * as ts from 'typescript';
import { INodeFlagStore, NodeFlags } from '../../types';

export class NodeFlagStore implements INodeFlagStore {
  private _store: WeakMap<ts.Node, NodeFlags>;
  public constructor() {
    this._store = new WeakMap<ts.Node, NodeFlags>();
  }

  public clear() {
    this._store = new WeakMap<ts.Node, NodeFlags>();
  }

  public get(node: ts.Node): NodeFlags | undefined {
    return this._store.get(node);
  }

  public upsert(node: ts.Node, flagsToAdd: NodeFlags): NodeFlags {
    let val = this._store.get(node);
    if (!val) {
      val = { ...flagsToAdd };
    } else {
      val = { ...val, ...flagsToAdd };
    }
    this._store.set(node, val);
    return val;
  }
}
