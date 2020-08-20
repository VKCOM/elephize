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

/**
 * Defines an interface for a comparison callback.
 */
export interface IComparer<T> {

  /**
   * Compares two objects and returns a value indicating if one is less than,
   * equal to, or greater than the other.
   *
   * @param {T} a
   *   The first object to compare.
   * @param {T} b
   *   The second object to compare.
   *
   * @return {number}
   *   A negative number if a is less than b, zero if a is equal to b, or a
   *   positive number if a is greater than b.
   */
  (a: T, b: T): number;

}

/**
 * Defines an interface for a collection with a determinate number of elements.
 */
export interface ICountable {

  /**
   * The number of elements stored in the collection.
   */
  readonly count: number;

}

/**
 * @todo Document List<T>.
 */
export class List<T> {

  /**
   * Performs a binary search of a list for a given value.
   *
   * @param {ReadonlyArray<T>} list
   *   The sorted list to search.
   * @param {T} value
   *   The value to search for.
   * @param {IComparer<T>} predicate
   *   A function that will compare list values.
   *
   * @return {number}
   *   The index where the search value was found, or a negative number that
   *   is the two's complement of the index where the search value should have
   *   been found.
   */
  public static binarySearch<T>(list: ReadonlyArray<T>, value: T, predicate: IComparer<T>): number {
    let low = 0, high = list.length - 1;
    while (low <= high) {
      // Do they even teach it like this anymore? Long story short, a + b
      // might cause an integer overflow, and x >> y == x / 2^y.
      let mid = low + ((high - low) >> 1);

      let n = predicate(list[mid], value);
      if (n == 0) {
        return mid;
      }
      else if (n > 0) {
        high = mid - 1;
      }
      else {
        low = mid + 1;
      }
    }
    return ~low;
  }

  /**
   * Creates a `Map` from a list by determining a key for each value.
   *
   * @param {ReadonlyArray<V>} list
   *   A list of values to convert into a `Map`.
   * @param {(value: V) => K} selector
   *   A callback that returns a key which is used to compare each value.
   *
   * @see Array.prototype.reduce()
   */
  public static toMap<K, V>(list: ReadonlyArray<V>, selector: (value: V) => K): Map<K, V[]> {
    let map = new Map<K, V[]>();
    for (let i = 0; i < list.length; i++) {
      let key = selector(list[i]);
      let bucket = map.get(key);
      if (bucket) {
        bucket.push(list[i]);
        map.set(key, bucket);
      }
      else {
        map.set(key, [list[i]]);
      }
    }
    return map;
  }

}
