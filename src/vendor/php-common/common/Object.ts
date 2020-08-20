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
 * Defines an interface for objects that can be compared to one another.
 *
 * Classes implementing this interface should also implement `IEquatable<T>`.
 */
export interface IComparable<T extends object> {

  /**
   * Compares the current object to another object and returns a value that
   * indicates whether the current instance precedes, follows, or occurs at the
   * same position as the other object.
   *
   * @param {IComparable<T>} object
   *   The object to compare with this instance.
   *
   * @returns {number}
   *   For objects A, B, and C:
   *   - A.compareTo(A) must return 0.
   *   - If A.compareTo(B) returns 0, then B.compareTo(A) must return 0.
   *   - If A.compareTo(B) returns 0 and B.compareTo(C) returns 0, then
   *     A.compareTo(C) must return 0.
   *   - If A.compareTo(B) returns a value other than 0, then B.compareTo(A) must
   *     return the same value of the opposite sign.
   *   - If A.compareTo(B) returns a value other than 0 and B.compareTo(C) returns
   *     the same value, then A.compareTo(C) must return the same value as well.
   */
  compareTo(object: IComparable<T>): number;

}

/**
 * Defines an interface for releasing unmanaged resources.
 */
export interface IDisposable {

  dispose(): void;

}

/**
 * Defines an interface for objects that can determine equality of instances.
 */
export interface IEquatable<T extends object> {

  /**
   * Indicates whether the current object is equal to another object of the
   * same type.
   */
  equals(object: IEquatable<T>): boolean;

}

/**
 * Defines an interface for objects that can identify themselves in a hash-
 * based collection.
 *
 * Classes implementing this interface must also ensure that if two objects are
 * considered to be equal, then they must also have the same hash code.
 */
export interface IHashable<T extends object> extends IEquatable<T> {

  /**
   * Generate a number that corresponds to the value of this object.
   *
   * This function must have the following properties:
   * - Is inexpensive to compute.
   * - Does not throw exceptions.
   * - Generates an even distribution, even for input that is heavily clustered.
   *
   * When using a hash table containing objects with a good implementation of
   * this function, searching for an element should take constant time, while
   * a poor implementation will depend on the number of items in the table.
   */
  hashCode(): number;

}
