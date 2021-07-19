import * as ts from 'typescript';
import { LogObj } from '../../utils/log';
import { MethodsTypes, NsMap, SpecialVars } from '../../types';
import { ModuleRegistry } from './moduleRegistry';
import { escapeKeyword } from '../../utils/pathsAndNames';

export class CommonjsModule {
  public readonly isDerived: boolean = false;
  public readonly isExternal: boolean = false;
  protected _hoistedContent: Set<string> = new Set();
  protected _properties: Set<string> = new Set();
  protected _methods: Set<string> = new Set();
  protected _imports: Map<string, string[]> = new Map();
  /**
   * Exports should strictly contain _final_ path
   */
  protected _exports: Map<string, string[]> = new Map();
  protected _requiredFiles: Map<string, CommonjsModule> = new Map();
  protected _constructorStatements: string[] = [];
  public _specialVars: SpecialVars = {};

  public constructor(
    public readonly className: string,
    public readonly sourceFileName: string,
    public readonly targetFileName: string,
    protected readonly _namespaces: NsMap,
    protected readonly _serverFilesRoot: string,
    protected readonly builtinsPath: string,
    public readonly log: LogObj,
    public readonly originalIdentName?: string,
    public readonly ancestorModule?: CommonjsModule
  ) { }

  public get imports(): CommonjsModule['_imports'] {
    return this._imports;
  }

  public get exports(): CommonjsModule['_exports'] {
    return this._exports;
  }

  // For removing dupes during second pass of codegen
  public clearStatements() {
    this._constructorStatements = [];
    this._hoistedContent = new Set();
    this._specialVars = {};
  }

  public addProperty(identifier: string, inferredType: string, visibility: 'public' | 'private' = 'public') {
    const doc = `/**
     * @var ${inferredType} ${identifier}
     */`;
    this._properties.add(identifier);
    this._hoistedContent.add(`${doc ? doc + '\n' : ''}${visibility} ${identifier};`);
  }

  public addMethod(identifier: string, block: string, args: string, inferredTypes: MethodsTypes | undefined, visibility: 'public' | 'private' = 'public') {
    let phpdoc = '';
    if (inferredTypes) {
      const params = Object.keys(inferredTypes.args)
        .map((arg) => `     * @param ${inferredTypes.args[arg]} ${arg}`).join('\n');
      phpdoc = `/**${params ? '\n' + params : ''}
     * @return ${inferredTypes.return}
     */`;
    }
    this._methods.add(identifier);
    this._hoistedContent.add(`${phpdoc}
    ${visibility} function ${identifier}(${args}) ${block}`);
  }

  public registerImport(from: string, method: string) {
    this._imports.set(from, [...this._imports.get(from) || [], method]);
  }

  public registerExport(from: string, method: string) {
    this._exports.set(from, [...this._exports.get(from) || [], method]);
  }

  public hasMethod(name: string) {
    return this._methods.has(name);
  }

  public hasProperty(name: string) {
    return this._properties.has(name);
  }

  public hasExport(name: string) {
    return this.findExportSource(name) !== null;
  }

  public findExportSource(name: string): string | null {
    let result: string | null = null;
    this._exports.forEach((exportedKeys, sourceName) => {
      if (result) {
        return;
      }

      if (exportedKeys.includes(name)) {
        result = sourceName;
      }
    });

    return result;
  }

  public addStatement(statement: string) {
    this._constructorStatements.push(statement);
  }

  public registerSpecialVar(kind: keyof SpecialVars, name: string, node?: ts.Node) {
    if (this._specialVars[kind] && this._specialVars[kind] !== name) {
      this.log.error('Duplicate special variable assignment: %s := %s', [kind, name], node && this.log.ctx(node));
    }
    this._specialVars[kind] = name;
  }

  public registerRequiredFile(path: string, currentModulePath: string, originalModule?: CommonjsModule) {
    if (path === currentModulePath || !originalModule) {
      return;
    }

    path = path
      .replace(/\.[jt]sx?$/, '.php')
      .split('/')
      .map((n) => escapeKeyword(n))
      .join('/');

    currentModulePath = currentModulePath.replace(/\.[jt]sx?$/, '.php');
    this._requiredFiles.set(this._normalizeRelativePath(path, currentModulePath), originalModule);
  }

  protected _normalizeRelativePath(path: string, currentModulePath: string) {
    const piecesTarget = path.split('/').map((n) => escapeKeyword(n));
    const piecesCurrent = currentModulePath.split('/').map((n) => escapeKeyword(n));

    while (piecesTarget[0] === piecesCurrent[0]) {
      piecesTarget.shift();
      piecesCurrent.shift();
    }

    let relpath;
    if (piecesCurrent.length === 1 && piecesTarget.length === 1) {
      // Files in same folder
      relpath = piecesTarget[0];
    } else {
      relpath = '../'.repeat(piecesCurrent.length - 1) + piecesTarget.join('/');
    }

    return relpath;
  }

  public checkSpecialVarIdentifier(node: ts.Node | undefined, kind: keyof SpecialVars): boolean {
    return !!node && node.kind === ts.SyntaxKind.Identifier && this._specialVars[kind] === node.getText();
  }

  public isEmpty() {
    return this._hoistedContent.size === 0 && this._constructorStatements.length === 0;
  }

  public generateContent() {
    const fullyQualifiedNamespace = ModuleRegistry.pathToNamespace(this.targetFileName);
    return `<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace ${fullyQualifiedNamespace};
use ${this._namespaces.builtins}\\Stdlib;
use ${this._namespaces.builtins}\\CJSModule;

class ${this.className} extends CJSModule {
    /**
     * @var ${this.className} $_mod
     */
    private static $_mod;
    public static function getInstance(): ${this.className} {
        if (!self::$_mod) {
            self::$_mod = new ${this.className}();
        }
        return self::$_mod;
    }

    ${Array.from(this._hoistedContent.values()).join('\n')}

    private function __construct() {
        ${this._constructorStatements.join('\n')}
    }
}
`;
  }
}
