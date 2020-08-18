/**
 * Copyright 2017 Matt Acosta
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import { ArgumentOutOfRangeException, Hash } from '@mattacosta/php-common';

import { ISyntaxNode } from '../syntax/ISyntaxNode';
import {
  ManyChildSyntaxList,
  SingleChildSyntaxList,
  TwoChildSyntaxList
} from '../syntax/SyntaxList';
import { Node } from './Node';
import { NodeBase } from './NodeBase';
import { NodeFlags } from './NodeFlags';
import { SyntaxDiagnostic } from '../../diagnostics/SyntaxDiagnostic';

/**
 * Provides a base class for nodes that contain a list of child nodes.
 */
export abstract class NodeList extends NodeBase {

  /**
   * Constructs a `NodeList` object.
   *
   * NOTE: This constructor prevents TypeScript from emitting one with an
   *   unnecessary (and slow) rest parameter.
   */
  constructor(diagnostics: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics);
  }

  /**
   * @inheritDoc
   */
  public get isList(): boolean {
    return true;
  }

  /**
   * @inheritDoc
   */
  public equals(value: NodeList): boolean {
    if (this === value) {
      return true;
    }

    const count = this.count;
    if (this._flags === value.flags && this._fullWidth === value.fullWidth && count === value.count) {
      for (let i = 0; i < count; i++) {
        const child1 = this.childAt(i);
        const child2 = value.childAt(i);
        if ((child1 !== null) !== (child2 !== null)) {
          return false;
        }
        if (child1 !== null && child2 !== null && !child1.equals(child2)) {
          return false;
        }
      }
      return true;
    }

    return false;
  }

}

/**
 * A node that only contains a single child.
 *
 * @internal
 */
export class SingleChildListNode extends NodeList {

  /**
   * @inheritDoc
   */
  protected _flags: NodeFlags;

  /**
   * @inheritDoc
   */
  protected _fullWidth: number;

  /**
   * The only child.
   */
  protected child: Node;

  /**
   * @inheritDoc
   */
  protected hash: number;

  /**
   * Constructs a `SingleChildListNode` object.
   */
  constructor(child: Node, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || NodeList.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.child = child;

    this.updateFlagsAndWidth(child.flags, child.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  /**
   * @inheritDoc
   */
  public get count(): number {
    return 1;
  }

  /**
   * @inheritDoc
   */
  public get flags(): NodeFlags {
    return this._flags;
  }

  /**
   * @inheritDoc
   */
  public get fullWidth(): number {
    return this._fullWidth;
  }

  /**
   * @inheritDoc
   */
  public childAt(index: number): Node | null {
    return index === 0 ? this.child : null;
  }

  /**
   * @inheritDoc
   */
  public createSyntaxNode(parent: ISyntaxNode, offset: number): SingleChildSyntaxList {
    return new SingleChildSyntaxList(this, parent, offset);
  }

  /**
   * @inheritDoc
   */
  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = SingleChildListNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  /**
   * @inheritDoc
   */
  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): SingleChildListNode {
    return new SingleChildListNode(this.child, diagnostics);
  }

  /**
   * Isolates the `hashCode()` call of a child for V8 optimization.
   */
  protected getChildHashCode(): number {
    return this.child.hashCode();
  }

  /**
   * @inheritDoc
   */
  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ (3 + 8192));
    hash = Hash.combine(this.getChildHashCode(), hash);
    return hash;
  }

  /**
   * @inheritDoc
   */
  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}

/**
 * A node that contains two children.
 *
 * @internal
 */
export class TwoChildListNode extends NodeList {

  /**
   * @inheritDoc
   */
  protected _flags: NodeFlags;

  /**
   * @inheritDoc
   */
  protected _fullWidth: number;

  /**
   * The first child node.
   */
  protected firstChild: Node;

  /**
   * @inheritDoc
   */
  protected hash: number;

  /**
   * The second child node.
   */
  protected secondChild: Node | null;

  /**
   * Constructs a `TwoChildListNode` object.
   */
  constructor(firstChild: Node, secondChild: Node | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || NodeList.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.firstChild = firstChild;
    this.secondChild = secondChild;

    this.updateFlagsAndWidth(firstChild.flags, firstChild.fullWidth);
    if (secondChild !== null) {
      this.updateFlagsAndWidth(secondChild.flags, secondChild.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  /**
   * @inheritDoc
   */
  public get count(): number {
    return 2;
  }

  /**
   * @inheritDoc
   */
  public get flags(): NodeFlags {
    return this._flags;
  }

  /**
   * @inheritDoc
   */
  public get fullWidth(): number {
    return this._fullWidth;
  }

  /**
   * @inheritDoc
   */
  public childAt(index: number): Node | null {
    switch (index) {
      case 0:
        return this.firstChild;
      case 1:
        return this.secondChild;
      default:
        return null;
    }
  }

  /**
   * @inheritDoc
   */
  public createSyntaxNode(parent: ISyntaxNode, offset: number): TwoChildSyntaxList {
    return new TwoChildSyntaxList(this, parent, offset);
  }

  /**
   * @inheritDoc
   */
  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = TwoChildListNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  /**
   * @inheritDoc
   */
  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): TwoChildListNode {
    return new TwoChildListNode(this.firstChild, this.secondChild, diagnostics);
  }

  /**
   * @inheritDoc
   */
  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ (3 + 8192));
    hash = Hash.combine(this.getFirstChildHashCode(), hash);
    hash = Hash.combine(this.getSecondChildHashCode(), hash);
    return hash;
  }

  /**
   * Isolates the `hashCode()` call of the first child for V8 optimization.
   */
  protected getFirstChildHashCode(): number {
    return this.firstChild.hashCode();
  }

  /**
   * Isolates the `hashCode()` call of the second child for V8 optimization.
   */
  protected getSecondChildHashCode(): number {
    return this.secondChild !== null ? this.secondChild.hashCode() : 0;
  }

  /**
   * @inheritDoc
   */
  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}

/**
 * Provides a base class for nodes that contains an arbitrary number of
 * children.
 *
 * @internal
 */
abstract class ManyChildListNode extends NodeList {

  /**
   * A list of child nodes.
   */
  protected abstract children: Node[];

  /**
   * Constructs a `ManyChildListNode` object.
   */
  constructor(diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || NodeList.EmptyDiagnosticList);
  }

  /**
   * @inheritDoc
   */
  public get count(): number {
    return this.children.length;
  }

  /**
   * @inheritDoc
   */
  public createSyntaxNode(parent: ISyntaxNode, offset: number): ManyChildSyntaxList {
    return new ManyChildSyntaxList(this, parent, offset);
  }

  /**
   * @inheritDoc
   */
  public childAt(index: number): Node | null {
    if (index >= 0 && index < this.children.length) {
      return this.children[index];
    }
    return null;
  }

  /**
   * @inheritDoc
   */
  public equals(value: ManyChildListNode): boolean {
    if (this === value) {
      return true;
    }

    const count = this.children.length;
    if (this._flags === value.flags && this._fullWidth === value.fullWidth && count === value.count) {
      for (let i = 0; i < count; i++) {
        if (!this.equalsChildInList(value, i)) {
          return false;
        }
      }
      return true;
    }

    return false;
  }

  /**
   * @inheritDoc
   */
  public hashCode(): number {
    // IMPORTANT: This is a performance critical method.
    if (this.hash === 0) {
      this.hash = ManyChildListNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  /**
   * @inheritDoc
   */
  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ (3 + 8192));
    const length = this.count;
    for (let i = 0; i < length; i++) {
      const child = this.childAt(i);
      if (child !== null) {
        hash = Hash.combine(this.getChildHashCode(child), hash);
      }
    }
    return hash;
  }

  /**
   * Compares the children of two lists at a given index.
   *
   * @todo Determine V8 optimization and possibly merge back into `equals()`.
   */
  protected equalsChildInList(list: ManyChildListNode, index: number): boolean {
    const firstChild = this.childAt(index);
    const secondChild = list.childAt(index);
    if ((firstChild !== null) !== (secondChild !== null)) {
      return false;
    }
    if (firstChild !== null && secondChild !== null && !firstChild.equals(secondChild)) {
      return false;
    }
    return true;
  }

  /**
   * Isolates the `hashCode()` call of a child for V8 optimization.
   */
  protected getChildHashCode(child: Node): number {
    return child.hashCode();
  }

  /**
   * Updates the flags and width of the node list.
   *
   * @param {Node[]} children
   *   A list of child nodes.
   */
  protected abstract updateFromChildren(children: Node[]): void;

}

/**
 * A node with an arbitrarily long list of children.
 *
 * If this list is very long, use `LongChildListNode` instead to increase
 * performance of node lookups.
 *
 * @internal
 */
export class ShortChildListNode extends ManyChildListNode {

  /**
   * @inheritDoc
   */
  protected _flags: NodeFlags;

  /**
   * @inheritDoc
   */
  protected _fullWidth: number;

  /**
   * @inheritDoc
   */
  protected children: Node[];

  /**
   * @inheritDoc
   */
  protected hash: number;

  /**
   * Constructs a `ShortChildListNode` object.
   */
  constructor(children: Node[], diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.children = children;

    this.updateFromChildren(children);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  /**
   * @inheritDoc
   */
  public get flags(): NodeFlags {
    return this._flags;
  }

  /**
   * @inheritDoc
   */
  public get fullWidth(): number {
    return this._fullWidth;
  }

  /**
   * @inheritDoc
   */
  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ShortChildListNode {
    return new ShortChildListNode(this.children, diagnostics);
  }

  /**
   * @inheritDoc
   */
  protected updateFromChildren(children: Node[]): void {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child !== null) {
        this.updateFlagsAndWidth(child.flags, child.fullWidth);
      }
    }
  }

  /**
   * @inheritDoc
   */
  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}

/**
 * A node that contains an arbitrary number of children and stores pre-computed
 * offsets for each child.
 *
 * NOTE: Long lists are never cached, so for the time being, `IHashable<T>`
 * methods may remain on the parent class.
 *
 * @internal
 */
export class LongChildListNode extends ManyChildListNode {

  /**
   * @inheritDoc
   */
  protected _flags: NodeFlags;

  /**
   * @inheritDoc
   */
  protected _fullWidth: number;

  /**
   * @inheritDoc
   */
  protected children: Node[];

  /**
   * @inheritDoc
   */
  protected hash: number;

  /**
   * A list of pre-computed child offsets.
   */
  protected offsets: number[];

  /**
   * Constructs a `LongChildListNode` object.
   */
  constructor(children: Node[], diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.children = children;
    this.offsets = new Array(children.length);

    this.updateFromChildren(children);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  /**
   * @inheritDoc
   */
  public get flags(): NodeFlags {
    return this._flags;
  }

  /**
   * @inheritDoc
   */
  public get fullWidth(): number {
    return this._fullWidth;
  }

  /**
   * @inheritDoc
   */
  public indexAtOffset(relativeOffset: number): number {
    if (relativeOffset < 0 || relativeOffset >= this._fullWidth) {
      throw new ArgumentOutOfRangeException();
    }

    let low = 0;
    let high = this.offsets.length - 1;
    while (low <= high) {
      let middle = low + ((high - low) >> 1);
      if (this.offsets[middle] > relativeOffset) {
        high = middle - 1;
      }
      else {
        low = middle + 1;
      }
    }

    return low - 1;
  }

  /**
   * @inheritDoc
   */
  public offsetAt(index: number): number {
    if (index < 0 || index >= this.children.length) {
      throw new ArgumentOutOfRangeException();
    }
    return this.offsets[index];
  }

  /**
   * @inheritDoc
   */
  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): LongChildListNode {
    return new LongChildListNode(this.children, diagnostics);
  }

  /**
   * @inheritDoc
   */
  protected updateFromChildren(children: Node[]): void {
    let offset = 0;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child !== null) {
        this.updateFlagsAndWidth(child.flags, child.fullWidth);
      }
      this.offsets[i] = offset;
      offset += child ? child.fullWidth : 0;
    }
  }

  /**
   * @inheritDoc
   */
  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
