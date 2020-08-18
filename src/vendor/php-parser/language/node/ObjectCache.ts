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

import { IHashable } from '@mattacosta/php-common';

/**
 * An entry in the object cache hash table.
 *
 * This class is really just a minor optimization to prevent recalculating
 * the hash code of the stored value.
 *
 * @template T
 */
export class ObjectCacheEntry<T> {

  /**
   * Constructs an `ObjectCacheEntry<T>` object.
   *
   * @param {number} hashCode
   *   The hash code of the object.
   * @param {T} value
   *   The object.
   */
  constructor(public readonly hashCode: number, public readonly value: T) {}

}

/**
 * Provides a cache for storing objects.
 *
 * @template T
 */
export class ObjectCache<T extends IHashable<object>> {

  /**
   * A hash table storing cached nodes.
   */
  protected cache: Array<ObjectCacheEntry<T> | undefined>;

  /**
   * A bit mask used to get the lowest n-bits of a hash code.
   *
   * This is used to convert a hash code into a number between `0` and `1 << n`,
   * which is the size of the hash table.
   */
  protected cacheMask: number;

  /**
   * The size of the cache.
   */
  protected cacheSize: number;

  /**
   * Constructs an `ObjectCache` object.
   *
   * @param {number} bitSize
   *   The size of the cache, in bits, so the size will be 2^n.
   */
  constructor(bitSize: number) {
    this.cacheSize = 1 << bitSize;
    this.cacheMask = this.cacheSize - 1;
    this.cache = new Array(this.cacheSize);
  }

  /**
   * Determines if an object has already been cached.
   *
   * NOTE: In order to prevent V8 from dereferencing the value, this method
   * takes the hash code as a parameter. This may be changed in the future.
   */
  public has(value: T, hash: number): boolean {
    if (value === null) {
      return true;
    }
    const index = hash & this.cacheMask;
    const entry = this.cache[index];
    return entry !== void 0 && entry.value === value;
  }

  /**
   * Adds an object to the cache.
   *
   * NOTE: In order to prevent V8 from dereferencing the value, this method
   * takes the hash code as a parameter. This may be changed in the future.
   */
  public set(value: T, hash: number): void {
    const index = hash & this.cacheMask;
    this.cache[index] = new ObjectCacheEntry(hash, value);
  }

  /**
   * Attempts to get an equivalent object from the cache.
   */
  public tryGetObject(value: T, hash: number): T | null {
    const index = hash & this.cacheMask;
    const entry = this.cache[index];

    // Not cached.
    if (entry === void 0) {
      return null;
    }
    // Reference equality.
    if (entry.value === value) {
      return value;
    }
    // Object at index must be equivalent.
    if (entry.hashCode === hash && entry.value.equals(value)) {
      return entry.value;
    }

    return null;
  }

}
