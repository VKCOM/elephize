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

import { Debug } from './diagnostics/Debug';
import { IHashable } from './Object';

/**
 * Provides a generic hashing algorithm for common data types.
 */
export class Hash {

  /**
   * The FNV offset bias for 32-bit integers.
   *
   * See: [Fowler-Noll-Vo hash](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function)
   */
  protected static readonly FnvOffsetBias = 2166136261 | 0;

  /**
   * The FNV prime for 32-bit integers.
   *
   * See: [Fowler-Noll-Vo hash](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function)
   */
  protected static readonly FnvPrime = 16777619;

  /**
   * @todo Test hash table hit/miss rate with 31 or 33?
   */
  protected static readonly Prime = 0xA5555529 | 0;

  /**
   * Combines a numeric value with an existing hash code.
   *
   * @param {number} value
   *   A value to combine with the hash.
   * @param {number} hash
   *   A previous hash code.
   */
  public static combine(value: number, hash: number): number {
    // IMPORTANT: This is a specialized, performance critical method.
    // Do not merge with combineBoolean() or combineObject().

    // Prevent deoptimization when TypeScript fails to do its job.
    Debug.assert(value !== void 0 && hash !== void 0);

    let code = Math.imul(hash, Hash.Prime) + value;
    return code | 0;
  }

  /**
   * Combine a boolean value with an existing hash code.
   */
  public static combineBoolean(value: boolean, hash: number): number {
    let add = value ? 1 : 0;
    let code = Math.imul(hash, Hash.Prime) + add;
    return code | 0;
  }

  /**
   * Combine a hashable object with an existing hash code.
   */
  public static combineObject<T extends object>(value: IHashable<T> | null, hash: number): number {
    let add = value ? value.hashCode() : 0;
    let code = Math.imul(hash, Hash.Prime) + add;
    return code | 0;
  }

  /**
   * Combines a string or character with an existing FNV-1a hash code.
   *
   * @param {number | string} text
   *   The input string or character.
   * @param {number} hash
   *   A previous FNV-1a hash code.
   *
   * @see Hash.fnv()
   */
  public static combineFnvHash(ch: number, hash: number): number
  public static combineFnvHash(text: string, hash: number): number
  public static combineFnvHash(text: string | number, hash: number): number {
    if (typeof text === 'number') {
      return Math.imul(hash ^ text, Hash.FnvPrime);
    }
    for (let i = 0; i < text.length; i++) {
      hash = Math.imul(hash ^ text.charCodeAt(i), Hash.FnvPrime);
    }
    return hash;
  }

  /**
   * Computes the FNV-1a hash of a string.
   *
   * @param {string} text
   *   The input string.
   * @param {number} start
   *   The index of the first character to hash.
   * @param {number=} length
   *   The number of characters to hash.
   */
  public static fnv(text: string, start: number, length?: number): number {
    let hash = Hash.FnvOffsetBias;
    if (typeof length === 'undefined') {
      length = text.length - start;
    }
    for (let i = start; i < (start + length); i++) {
      hash = Math.imul(hash ^ text.charCodeAt(i), Hash.FnvPrime);
    }
    return hash;
  }

  /**
   * Computes a generic hash of a string.
   *
   * @param {string} text
   *   The input string.
   */
  public static fromString(text: string): number {
    // Generate a Hash from string in Javascript/jQuery
    // https://stackoverflow.com/q/7616461
    let hash = 0, length = text.length;
    for (let i = 0; i < length; i++) {
      hash = (hash * 31) + text.charCodeAt(i);
    }
    return hash | 0;
  }

}
