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

import { ISourceTextSyntaxNode } from './SourceTextSyntaxNode';
import { ISyntaxNode, ISyntaxNodeOrList } from './ISyntaxNode';
import { ISyntaxToken, SyntaxTokenFilter } from './ISyntaxToken';
import { SyntaxToken } from './SyntaxToken';

/**
 * Provides helper methods for working with `ISyntaxNode` objects.
 */
export class SyntaxNodeExtensions {

  /**
   * Determines if the given object is shaped like `ISourceTextSyntaxNode`.
   */
  public static isSourceTextSyntaxNode(node: object): node is ISourceTextSyntaxNode {
    return (<ISourceTextSyntaxNode>node).eof !== void 0;
  }

  /**
   * Attempts to get the first token within the given node.
   *
   * @param {ISyntaxNodeOrList} node
   *   The parent node.
   * @param {SyntaxTokenFilter=} tokenFilter
   *   A callback used to limit what tokens are returned.
   */
  public static tryGetFirstToken(node: ISyntaxNodeOrList, tokenFilter?: SyntaxTokenFilter /*, triviaFilter?: SyntaxTriviaFilter */): ISyntaxToken | null {
    // A recursive implementation would be simpler, but trees can be deep and
    // this method will probably be called quite a few times...
    let stack: Array<IterableIterator<ISyntaxNode | ISyntaxToken>> = [];
    stack.push(node.getAllChildren());

    while (stack.length > 0) {
      // Suppress TS2322: Result cannot be undefined due to while condition.
      let iterator = <IterableIterator<ISyntaxNode | ISyntaxToken>>stack.pop();
      let result = iterator.next();
      if (result.value) {
        let child = result.value;
        if (child.isToken) {
          let token = SyntaxToken.tryGetFirstToken(<ISyntaxToken>child, tokenFilter);
          if (token !== null) {
            return token;
          }
        }

        if (!result.done) {
          stack.push(iterator);
        }

        if (!child.isToken) {
          stack.push((<ISyntaxNode>child).getAllChildren());
        }
      }
    }

    return null;
  }

  /**
   * Attempts to get the last token within the given node.
   *
   * @param {ISyntaxNodeOrList} node
   *   The parent node.
   * @param {SyntaxTokenFilter=} tokenFilter
   *   A callback used to limit what tokens are returned.
   */
  public static tryGetLastToken(node: ISyntaxNodeOrList, tokenFilter?: SyntaxTokenFilter /*, triviaFilter?: SyntaxTriviaFilter */): ISyntaxToken | null {
    let stack: Array<IterableIterator<ISyntaxNode | ISyntaxToken>> = [];
    stack.push(node.getAllChildrenReversed());

    while (stack.length > 0) {
      // Suppress TS2322: Result cannot be undefined due to while condition.
      let iterator = <IterableIterator<ISyntaxNode | ISyntaxToken>>stack.pop();
      let result = iterator.next();
      if (result.value) {
        let child = result.value;
        if (child.isToken) {
          let token = SyntaxToken.tryGetLastToken(<ISyntaxToken>child, tokenFilter);
          if (token !== null) {
            return token;
          }
        }

        if (!result.done) {
          stack.push(iterator);
        }

        if (!child.isToken) {
          stack.push((<ISyntaxNode>child).getAllChildrenReversed());
        }
      }
    }

    return null;
  }

  /**
   * Attempts to get the first token within the next node.
   *
   * So if parent node `A` has two children `B` and `C`, and the given node
   * is `B`, then this method will return the first token within `C`.
   *
   * @param {ISyntaxNode} node
   *   The current node.
   * @param {SyntaxTokenFilter=} tokenFilter
   *   A callback used to limit what tokens are returned.
   */
  public static tryGetNextToken(node: ISyntaxNode, tokenFilter?: SyntaxTokenFilter): ISyntaxToken | null {
    while (node.parent !== null) {
      let found = false;
      for (let child of node.parent.getAllChildren()) {
        if (found) {
          if (child.isToken) {
            let result = SyntaxToken.tryGetFirstToken(<ISyntaxToken>child, tokenFilter);
            if (result !== null) {
              return result;
            }
          }
          else {
            let result = SyntaxNodeExtensions.tryGetFirstToken(<ISyntaxNode>child, tokenFilter);
            if (result !== null) {
              return result;
            }
          }
        }
        else if (!child.isToken && node.equals(child)) {
          found = true;
        }
      }
      node = node.parent;
    }
    return null;
  }

  /**
   * Attempts to get the last token within the previous node.
   *
   * So if parent node `A` has two children `B` and `C`, and the given node
   * is `C`, then this method will return the last token within `B`.
   *
   * @param {ISyntaxNode} node
   *   The current node.
   * @param {SyntaxTokenFilter=} tokenFilter
   *   A callback used to limit what tokens are returned.
   */
  public static tryGetPreviousToken(node: ISyntaxNode, tokenFilter?: SyntaxTokenFilter): ISyntaxToken | null {
    while (node.parent !== null) {
      let found = false;
      for (let child of node.parent.getAllChildrenReversed()) {
        if (found) {
          if (child.isToken) {
            let result = SyntaxToken.tryGetLastToken(<ISyntaxToken>child, tokenFilter);
            if (result !== null) {
              return result;
            }
          }
          else {
            let result = SyntaxNodeExtensions.tryGetLastToken(<ISyntaxNode>child, tokenFilter);
            if (result !== null) {
              return result;
            }
          }
        }
        else if (!child.isToken && node.equals(child)) {
          found = true;
        }
      }
      node = node.parent;
    }
    return null;
  }

}
