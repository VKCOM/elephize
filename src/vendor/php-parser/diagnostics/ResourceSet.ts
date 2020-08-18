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

import { Exception } from '@mattacosta/php-common';

declare function require(path: string): any;

/**
 * Provides access to a lazily loaded external resource.
 *
 * @template T
 */
export class ResourceSet<T> {

  /**
   * The location of the resource.
   */
  protected resourcePath: string;

  /**
   * A key-value store for the resource data.
   */
  protected resources: { [key: string]: T } | null = null;

  /**
   * Constructs a `ResourceSet` object.
   *
   * @param {string} resourcePath
   *   The location of the resource.
   */
  constructor(resourcePath: string) {
    this.resourcePath = resourcePath;
  }

  /**
   * Gets a value from the resource set.
   *
   * @param {string} key
   *   The identifier of the object in the resource set.
   */
  public get(key: string): T {
    if (this.resources === null) {
      this.resources = this.loadResource(this.resourcePath);
    }
    return this.resources[key];
  }

  /**
   * Loads an external resource.
   *
   * @param {string} resourcePath
   *   The location of the resource.
   *
   * @returns {object}
   *   A key-value store containing the resource set's data.
   */
  protected loadResource(path: string): { [key: string]: T } {
    let resources: any;

    try {
      resources = require(path);
    }
    catch (e) {
      // Re-throw a standardized error type since the one thrown by `require()`
      // depends on the JS environment that is being used.
      throw new Exception(`Unable to load resource at '${this.resourcePath}'`);
    }

    if (typeof resources !== 'object') {
      throw new Exception('Invalid resource');
    }

    return resources;  // @todo Needs validation of property types.
  }

}
