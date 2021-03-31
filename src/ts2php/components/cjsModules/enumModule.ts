import { CommonjsModule } from './commonjsModule';
import { ModuleRegistry } from './moduleRegistry';
import { NsMap } from '../../types';
import { LogObj } from '../../utils/log';

export class EnumModule extends CommonjsModule {
  public readonly isDerived: boolean = true;

  public constructor(
    className: string,
    sourceFileName: string,
    targetFileName: string,
    _namespaces: NsMap,
    log: LogObj,
    originalIdentName?: string,
    ancestorModule?: CommonjsModule
  ) {
    super(className + 'Enum', sourceFileName, targetFileName, _namespaces, log, originalIdentName, ancestorModule);
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

  public addMethod() {
    /* Makes no sense: override, do nothing */
  }

  public addProperty() {
    /* Makes no sense: override, do nothing */
  }

  public addStaticConst(identifier: string, value: string, inferredType: string) {
    const doc = `/**
     * @var ${inferredType} ${identifier}
     */`;
    this._hoistedContent.add(`${doc ? doc + '\n' : ''}const ${identifier} = ${value};`);
  }

  public generateContent() {
    const fullyQualifiedNamespace = ModuleRegistry.pathToNamespace(this.targetFileName);
    return `<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace ${this._namespaces.root}\\${fullyQualifiedNamespace};
use ${this._namespaces.builtins}\\CJSModule;

class ${this.className} extends CJSModule {
  ${Array.from(this._hoistedContent.values()).join('\n')}

  private function __construct() {}
}
`;
  }
}
