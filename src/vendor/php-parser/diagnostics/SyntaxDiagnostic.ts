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

import { Diagnostic } from './Diagnostic';
import { DiagnosticSeverity } from './DiagnosticSeverity';
import { ErrorCode } from './ErrorCode.Generated';
import { ErrorCodeInfo } from './ErrorCodeInfo.Generated';

/**
 * Represents a diagnostic in a syntax tree.
 */
export class SyntaxDiagnostic extends Diagnostic {

  /**
   * The location of the diagnostic relative to a node.
   */
  public readonly offset: number;

  /**
   * The width of the diagnostic.
   */
  public readonly width: number;

  /**
   * Constructs a `SyntaxDiagnostic` object.
   *
   * @param {number} offset
   *   The location of the diagnostic relative to a node.
   * @param {number} width
   *   The width of the diagnostic.
   * @param {ErrorCode} code
   *   An identification number for the diagnostic.
   * @param {...any[]} messageArgs
   *   A list of replacement values for a diagnostic message.
   */
  constructor(offset: number, width: number, code: ErrorCode, ...messageArgs: any[]) {
    super(code, ...messageArgs);
    this.offset = offset;
    this.width = width;

    let severity = ErrorCodeInfo.getSeverity(code);
    this.setOriginalSeverity(severity);
    this.setSeverity(severity);
  }

  /**
   * Creates a copy of the diagnostic with the given offset.
   */
  public withOffset(offset: number): SyntaxDiagnostic {
    return new SyntaxDiagnostic(offset, this.width, this.code, this.messageArgs);
  }

  /**
   * Creates a copy of the diagnostic with the given severity.
   *
   * @todo Unused.
   */
  public withSeverity(severity: DiagnosticSeverity): SyntaxDiagnostic {
    // @todo Should probably check if the diagnostic is configurable.
    let diagnostic = new SyntaxDiagnostic(this.offset, this.width, this.code, ...this.messageArgs);
    diagnostic.setSeverity(severity);
    return diagnostic;
  }

}
