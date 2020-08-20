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

import { Encoding } from '../text/Encoding';
import { PhpLexer } from './PhpLexer';
import { PhpParser } from './PhpParser';
import { PhpParserOptions } from './PhpParserOptions';
import { SourceTextFactory } from '../text/SourceTextFactory';
import { SourceTextSyntaxNode } from '../language/syntax/SourceTextSyntaxNode';
import { SyntaxDiagnostic } from '../diagnostics/SyntaxDiagnostic';
import { SyntaxTreeBase } from './SyntaxTree';

/**
 * @todo Document PhpSyntaxTree.
 */
export class PhpSyntaxTree extends SyntaxTreeBase<SourceTextSyntaxNode> {

  /**
   * @inheritDoc
   */
  public readonly path: string;

  /**
   * @inheritDoc
   */
  public readonly root: SourceTextSyntaxNode;

  /**
   * Parser configuration options.
   */
  protected readonly options: PhpParserOptions;

  /**
   * Creates a `PhpSyntaxTree` object.
   *
   * @param {SourceTextSyntaxNode} root
   *   The root node of a parsed source file.
   * @param {string} path
   *   The location of the source file.
   * @param {PhpParserOptions} options
   *   Parser configuration options.
   */
  constructor(root: SourceTextSyntaxNode, path: string, options: PhpParserOptions) {
    super();
    this.options = options;
    this.path = path;
    this.root = root;
  }

  /**
   * Parses a string into a syntax tree.
   *
   * @param {string} text
   *   A string containing source code.
   * @param {string=} path
   *   The location of the source file.
   * @param {PhpParserOptions=} options
   *   Parser configuration options.
   * @param {Encoding=} encoding
   *   The original encoding of the source text. Defaults to `Encoding.Utf8`.
   */
  public static fromText(
    text: string,
    path = '',
    options = PhpParserOptions.Default,
    encoding = Encoding.Utf8,
  //cancellationToken
  ): PhpSyntaxTree {
    let sourceText = SourceTextFactory.from(text, encoding);
    let lexer = new PhpLexer(sourceText, options.version, options.is64Bit, options.allowUtf16);
    let parser = new PhpParser(lexer, options);

    let root = parser.parse();
    return new PhpSyntaxTree(root, path, options);
  }

  /**
   * @inheritDoc
   */
  public getDiagnostics(): IterableIterator<SyntaxDiagnostic> {
    return this.root.getDiagnostics();
  }

}
