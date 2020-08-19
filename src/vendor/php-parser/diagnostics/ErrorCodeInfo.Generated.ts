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

// ----------------------------------------------------------------------------
// THIS IS A GENERATED FILE. DO NOT MODIFY.
// ----------------------------------------------------------------------------

'use strict';

import { ArgumentOutOfRangeException } from '../../php-common';

import { ErrorCode } from './ErrorCode.Generated';
import { DiagnosticSeverity } from './DiagnosticSeverity';
import { ResourceSet } from './ResourceSet';

export interface ErrorCodeData {

  severity: number;

  text: string;

}

export class ErrorCodeInfo {

  protected static Resources = new ResourceSet<ErrorCodeData>('../ErrorCode.json');

  public static formatMessage(code: ErrorCode, messageArgs: ReadonlyArray<any>): string {
    let message = ErrorCodeInfo.getMessage(code);
    if (messageArgs.length > 0) {
      let args = messageArgs.slice();
      message = message.replace(/%s/g, function() { return args.shift(); });
    }
    return message;
  }

  public static getMessage(code: ErrorCode): string {
    if (code <= ErrorCode.Unknown) {
      throw new ArgumentOutOfRangeException();
    }
    let data = ErrorCodeInfo.Resources.get(code.toString());
    return data.text;
  }

  public static getSeverity(code: ErrorCode): DiagnosticSeverity {
    if (ErrorCodeInfo.isInfo(code)) {
      return DiagnosticSeverity.Info;
    }
    else if (ErrorCodeInfo.isWarning(code)) {
      return DiagnosticSeverity.Warning;
    }
    else {
      return DiagnosticSeverity.Error;
    }
  }

  public static isInfo(code: ErrorCode): boolean {
    switch (code) {
      default:
        return false;
    }
  }

  public static isWarning(code: ErrorCode): boolean {
    switch (code) {
      case ErrorCode.WRN_InvalidEscapeSequence:
      case ErrorCode.WRN_OctalEscapeSequenceOverflow:
      case ErrorCode.WRN_UnterminatedComment:
      case ErrorCode.WRN_EmptySwitchBlock:
      case ErrorCode.WRN_PossibleMistakenEmptyStatement:
      case ErrorCode.WRN_RealCast:
      case ErrorCode.WRN_UnsetCast:
        return true;
      default:
        return false;
    }
  }

}
