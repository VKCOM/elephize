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

import { DiagnosticSeverity } from './DiagnosticSeverity';

/**
 * Defines an interface for objects containing a diagnostic code and severity.
 */
export interface IDiagnostic {

  /**
   * An identification number for the diagnostic.
   */
  readonly code: number;

  /**
   * Determines if the diagnostic severity has been elevated from a warning.
   */
  readonly isElevatedWarning: boolean;

  /**
   * The original severity of the diagnostic.
   */
  readonly originalSeverity: DiagnosticSeverity;

  /**
   * The current severity of the diagnostic.
   */
  readonly severity: DiagnosticSeverity;

}

/**
 * A base class for storing diagnostic information.
 */
export abstract class Diagnostic implements IDiagnostic {

  /**
   * A bit mask used to store and retrieve severity information.
   */
  private static readonly SeverityMask = (1 << 3) - 1;  // 0b000111

  /**
   * A list of replacement values for a diagnostic message.
   */
  public readonly messageArgs: ReadonlyArray<any>;

  /**
   * @inheritDoc
   */
  public readonly code: number;

  /**
   * An integer that stores the original and current severity of the diagnostic.
   */
  protected internalSeverity: number;

  /**
   * Constructs a `Diagnostic` object.
   *
   * @todo Add parameter to override severity?
   *
   * @param {number} code
   *   An identification number for the diagnostic.
   * @param {...any[]} messageArgs
   *   A list of replacement values for a diagnostic message.
   */
  constructor(code: number, ...messageArgs: any[]) {
    this.code = code;
    this.messageArgs = messageArgs;
    this.internalSeverity = 0;  // Equivalent to `DiagnosticSeverity.Hint`.
  }

  /**
   * Determines if the diagnostic severity can be changed.
   */
  public get isConfigurable(): boolean {
    return this.originalSeverity !== DiagnosticSeverity.Error;
  }

  /**
   * @inheritDoc
   */
  public get isElevatedWarning(): boolean {
    return this.originalSeverity === DiagnosticSeverity.Warning &&
      this.severity === DiagnosticSeverity.Error;
  }

  /**
   * @inheritDoc
   */
  public get originalSeverity(): DiagnosticSeverity {
    return this.internalSeverity >> 3;
  }

  /**
   * @inheritDoc
   */
  public get severity(): DiagnosticSeverity {
    return this.internalSeverity & Diagnostic.SeverityMask;
  }

  /**
   * Sets the original severity of the diagnostic.
   */
  protected setOriginalSeverity(severity: DiagnosticSeverity): void {
    this.internalSeverity = (this.internalSeverity & Diagnostic.SeverityMask) | (severity << 3);
  }

  /**
   * Sets the current severity of the diagnostic.
   */
  protected setSeverity(severity: DiagnosticSeverity): void {
    this.internalSeverity = (this.internalSeverity & (Diagnostic.SeverityMask << 3)) | severity;
  }

}
