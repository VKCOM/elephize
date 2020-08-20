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

import { DocumentationMode } from './DocumentationMode';
import { PhpVersion } from './PhpVersion';

/**
 * A set of options for parsing PHP source code.
 */
export class PhpParserOptions /* implements IEquatable<PhpParserOptions> */ {

  /**
   * A default set of parsing options.
   */
  public static readonly Default = new PhpParserOptions();

  /**
   * Determines if a diagnostic should be generated when parsing a function with
   * a reserved name.
   */
  public readonly allowReservedNames: boolean;

  /**
   * Determines if the lexer should scan text as if PHP were aware of UTF-16
   * encoded characters. Defaults to `false`.
   */
  public readonly allowUtf16: boolean;

  /**
   * Determines how the parser should handle documentation comments.
   */
  public readonly documentationMode: DocumentationMode;

  /**
   * Determines if the lexer should scan numbers as if PHP were compiled with
   * 64-bit support.
   */
  public readonly is64Bit: boolean;

  /**
   * The version of PHP containing the desired parsing rules.
   */
  public readonly version: PhpVersion;

  /**
   * Constructs a `PhpParserOptions` object.
   *
   * @param {PhpVersion=} version
   *   The version of PHP containing the desired parsing rules. Defaults to
   *   `PhpVersion.Latest`.
   * @param {DocumentationMode=} documentationMode
   *   Determines how the parser should handle documentation comments. Defaults
   *   to `DocumentationMode.None`.
   * @param {boolean=} is64Bit
   *   Determines if the lexer should scan numbers as if PHP was compiled with
   *   64-bit support. Defaults to `true`.
   * @param {boolean=} allowReservedNames
   *   Determines if a diagnostic should be generated when parsing a function
   *   with a reserved name. Defaults to `false`.
   * @param {boolean=} allowUtf16
   *   Determines if the lexer should scan text as if PHP were aware of UTF-16
   *   encoded characters. Defaults to `false`.
   */
  constructor(
    version = PhpVersion.Latest,
    documentationMode = DocumentationMode.None,
    is64Bit = true,
    allowReservedNames = false,
    allowUtf16 = false
  ) {
    this.version = version;
    this.documentationMode = documentationMode;
    this.is64Bit = is64Bit;
    this.allowReservedNames = allowReservedNames;
    this.allowUtf16 = allowUtf16;
  }

  /**
   * Creates a set of parsing options from an object with similar properties.
   */
  public static from(obj: Partial<PhpParserOptions>): PhpParserOptions {
    return new PhpParserOptions(
      obj.version,
      obj.documentationMode,
      obj.is64Bit,
      obj.allowReservedNames,
      obj.allowUtf16,
    );
  }

}
