import { CommonjsModule } from './commonjsModule';
import { NsMap } from '../../types';
import { PhpParsedStruct } from './phpParser';
import { log, LogSeverity } from '../../utils/log';

export class CommonjsExternalModule extends CommonjsModule {
  public readonly isDerived: boolean = false;
  public readonly isExternal: boolean = true;
  protected _implPath = '';
  protected _phpStruct: PhpParsedStruct;

  public constructor(
    className: string,
    sourceFileName: string,
    targetFileName: string,
    _namespaces: NsMap,
    originalIdentName?: string,
    ancestorModule?: CommonjsModule
  ) {
    super(className + 'CjsWrapper', sourceFileName, targetFileName, _namespaces, originalIdentName, ancestorModule);
  }

  public useImplementationFromPath(path: string) {
    this._implPath = path;
    this._phpStruct = new PhpParsedStruct(this._implPath);
  }

  // For removing dupes during second pass of codegen
  public clearStatements() {
    this._constructorStatements = [];
    this._hoistedContent = new Set();
    this._specialVars = {};
  }

  public registerSpecialVar() { /* Makes no sense: override, do nothing */ }
  public checkSpecialVarIdentifier(): boolean {
    /* Makes no sense: override, do nothing */
    return false;
  }

  public addProperty(identifier: string) {
    log(`Access to properties for substituted modules is not supported: @ ${this.sourceFileName} accessing ${identifier}`, LogSeverity.ERROR);
  }

  public addMethod(identifier: string) {
    this._hoistedContent.add(this._phpStruct.getDecl(identifier));
  }

  public generateContent() {
    return `<?php
/* NOTICE: Generated file; Do not edit by hand */
use ${this._namespaces.builtins}\\Stdlib;
use ${this._namespaces.builtins}\\CJSModule;

require __DIR__ . '/${this._normalizeRelativePath(this._implPath, this.targetFileName)}';

class ${this.className} extends CJSModule {
  /**
   * @var ${this._phpStruct.getClassName()} $_impl
   */
  private $_impl;

  /**
   * @var ${this.className} $_mod
   */
  private static $_mod;

  public static function getInstance(): ${this.className} {
    if (!self:: $_mod) {
      self:: $_mod = new ${this.className} ();
    }
    return self:: $_mod;
  }

  ${Array.from(this._hoistedContent.values()).join('\n')}

  private function __construct() {
    $this->_impl = new ${this._phpStruct.getClassName()}();
  }
}
`;
  }
}
