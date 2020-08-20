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
 * Supported versions of PHP that may be parsed.
 */
export enum PhpVersion {

  Any,
  PHP7_0,
  PHP7_1,
  PHP7_2,
  PHP7_3,
  PHP7_4,
  Latest = PHP7_4

}

/**
 * Provides information about a PHP version.
 */
export class PhpVersionInfo {

  /**
   * Gets a string representation of the specified PHP version.
   */
  public static getText(version: PhpVersion): string {
    switch (version) {
      case PhpVersion.PHP7_0:
        return '7.0';
      case PhpVersion.PHP7_1:
        return '7.1';
      case PhpVersion.PHP7_2:
        return '7.2';
      case PhpVersion.PHP7_3:
        return '7.3';
      case PhpVersion.PHP7_4:
        return '7.4';
      default:
        return '';
    }
  }

}
