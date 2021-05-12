import { CommonjsModule } from './commonjsModule';
import { LogObj } from '../../utils/log';
import { ReactModule } from './reactModule';
import {
  camelize,
  capitalize,
  classNameFromPath,
  escapeKeyword,
  normalizeBasePath,
  normalizeFileExt, resolveAliasesAndPaths,
  snakify,
} from '../../utils/pathsAndNames';
import { ImportReplacementRule, NsMap } from '../../types';
import { CommonjsExternalModule } from './commonjsExternalModule';
import { EnumModule } from './enumModule';

export class ModuleRegistry {
  /**
   * Set for making unique class names for derived components
   */
  private _registeredModuleClasses: Set<string> = new Set();
  /**
   * Mapping of source file name to all original and derived modules
   */
  private readonly _sourceFilenameToModule: Map<string, CommonjsModule[]> = new Map();
  /**
   * Mapping of target file name to module instance
   */
  private readonly _targetFilenameToModule: Map<string, CommonjsModule> = new Map();
  private readonly _derivedComponentsPathMap: Map<string, string> = new Map();
  /**
   * Set for determining if a variable in module is a derived component or not;
   * We place here entries like FilePath__varName which identify the component function.
   */
  private readonly _registeredComponents: Set<string> = new Set();

  public constructor(
    private readonly _baseDir: string,
    public readonly _aliases: { [key: string]: string },
    private readonly _tsPaths: { [key: string]: string[] },
    private readonly _namespaces: NsMap,
    private readonly _serverFilesRoot: string,
    private readonly _builtinsPath: string,
    private readonly _replacements: ImportReplacementRule[],
    protected readonly log: LogObj
  ) {
    this._replacements.forEach((rule) => this._registerExternalClass(rule));
  }

  public clearClasses() {
    this._registeredModuleClasses = new Set();
  }

  public forEachModule(cb: (m: CommonjsModule) => void) {
    this._targetFilenameToModule.forEach(cb);
  }

  public getExportedIdentifier(forModule: CommonjsModule, targetFilename: string | undefined, identifier: string, rewriteCase = false): string {
    if (!targetFilename) {
      // Dropped or ignored import
      this.log.error('Attempt to reach dropped or ignored module: %s \n\t@ %s', [identifier, forModule.sourceFileName]);
      return 'null';
    }

    const instance = this._getInstance(targetFilename, identifier);
    if (!instance) {
      return 'null';
    }

    const mod = this._targetFilenameToModule.get(targetFilename);
    if (mod?.isExternal) {
      mod.addProperty(identifier, '');
    }

    forModule.registerRequiredFile(targetFilename, forModule.targetFileName, mod);
    return `${instance}->${rewriteCase ? snakify(identifier) : identifier}`;
  }

  public callExportedCallable(forModule: CommonjsModule, targetFilename: string | undefined, identifier: string, args: string[]): string {
    if (!targetFilename) {
      // Dropped or ignored import
      this.log.error('Attempt to reach dropped or ignored module: %s \n\t@ %s', [identifier, forModule.sourceFileName]);
      return 'null';
    }

    const instance = this._getInstance(targetFilename, identifier);
    if (!instance) {
      return 'null';
    }

    const mod = this._targetFilenameToModule.get(targetFilename);
    if (mod?.isExternal) {
      mod.addMethod(identifier, '', '', undefined);
    }

    forModule.registerRequiredFile(targetFilename, forModule.targetFileName, mod);
    return `${instance}->${identifier}(${args.join(', ')})`;
  }

  public getExportedComponent(forModule: CommonjsModule, targetFilename: string | undefined, identifier: string): string {
    if (!targetFilename) {
      // Dropped or ignored import
      this.log.error('Attempt to reach dropped or ignored module: %s \n\t@ %s', [identifier, forModule.sourceFileName]);
      return 'null';
    }

    // component should be in another file, use derived table to determine it
    let derived = this._derivedComponentsPathMap.get(targetFilename);

    let module;
    if (derived) {
      module = this._targetFilenameToModule.get(derived);
    } else {
      // if targetFilename contains php module path
      module = this._targetFilenameToModule.get(targetFilename);
    }

    if (!module) {
      this.log.warn('No exported component found for filename %s', [targetFilename]);
    } else {
      if (module.isExternal) {
        this.log.error('Derived components in external module are not supported: %s', [targetFilename]);
      }
      if (!derived) { // if targetFilename contains php module path
        derived = targetFilename;
      }
      forModule.registerRequiredFile(derived, forModule.targetFileName, module);
    }

    return this._getInstance(derived || targetFilename, identifier);
  }

  public getLocalComponent(forModule: CommonjsModule, identifier: string): string {
    // Find local module
    const module = this._sourceFilenameToModule.get(forModule.sourceFileName)
      ?.find((mod) => mod.originalIdentName === identifier);

    if (!module) {
      this.log.error('No exported component %s found for filename %s', [identifier, forModule.sourceFileName]);
      return '';
    } else {
      forModule.registerRequiredFile(module.targetFileName, forModule.targetFileName, module);
    }

    return this._getInstance(module.targetFileName, identifier);
  }

  public getEnumConst(declModuleFilename: string, enumName: string, enumMember: string): string {
    const enumModule = (this._sourceFilenameToModule.get(declModuleFilename) || [])
      .find((el) => el.originalIdentName === enumName);

    if (!enumModule) {
      this.log.error('Enum %s access attempt failed in file %s', [enumName, declModuleFilename]);
      return 'null';
    }

    const fullyQualifiedNamespace = ModuleRegistry.pathToNamespace(enumModule.targetFileName);
    return `${fullyQualifiedNamespace}\\${enumModule.className}::${enumMember}`;
  }

  protected _registerCommonModule(className: string, fullyQualifiedSourceFilename: string, newFilename: string, external = false, implPath?: string) {
    let moduleDescriptor;
    if (external) {
      moduleDescriptor = new CommonjsExternalModule(
        className,
        fullyQualifiedSourceFilename,
        newFilename,
        this._namespaces,
        this._serverFilesRoot,
        this._builtinsPath,
        this.log
      );

      if (!implPath) {
        this.log.error('No implementation path declared for substitution module %s', [className]);
        throw new Error();
      }
      moduleDescriptor.useImplementationFromPath(implPath);
    } else {
      moduleDescriptor = new CommonjsModule(
        className,
        fullyQualifiedSourceFilename,
        newFilename,
        this._namespaces,
        this._serverFilesRoot,
        this._builtinsPath,
        this.log
      );
    }

    const mods = (this._sourceFilenameToModule.get(fullyQualifiedSourceFilename) || []).concat(moduleDescriptor);
    this._sourceFilenameToModule.set(fullyQualifiedSourceFilename, mods);
    this._targetFilenameToModule.set(newFilename, moduleDescriptor);
    return moduleDescriptor;
  }

  protected _registerExternalClass(rule: ImportReplacementRule): CommonjsModule | null {
    const fullyQualifiedSourceFilename = resolveAliasesAndPaths(this.log, rule.modulePath, '', this._baseDir, this._tsPaths, this._aliases);
    if (!fullyQualifiedSourceFilename) {
      this.log.error('Failed to lookup file %s [#1]', [rule.modulePath]);
      return null;
    }

    let className = classNameFromPath(fullyQualifiedSourceFilename, true);
    className = this._makeUniqueClassName(className);
    const newFilename = this._makeNewFileName(fullyQualifiedSourceFilename, className);
    console.log(className, newFilename, fullyQualifiedSourceFilename);
    this._registeredModuleClasses.add(className);
    return this._registerCommonModule(rule.implementationClass, rule.modulePath, newFilename, true, rule.implementationPath);
  }

  public registerClass(filepath: string): CommonjsModule | null {
    const fullyQualifiedSourceFilename = resolveAliasesAndPaths(this.log, filepath, '', this._baseDir, this._tsPaths, this._aliases);
    if (!fullyQualifiedSourceFilename) {
      this.log.error('Failed to lookup file %s [#1]', [filepath]);
      return null;
    }

    let className = classNameFromPath(fullyQualifiedSourceFilename);
    className = this._makeUniqueClassName(className);
    const newFilename = this._makeNewFileName(fullyQualifiedSourceFilename, className);
    this._registeredModuleClasses.add(className);
    return this._registerCommonModule(className, fullyQualifiedSourceFilename, newFilename);
  }

  public isDerivedComponent(sourceFileName: string, varName: string) {
    return this._registeredComponents.has(`${sourceFileName}__${varName}`);
  }

  public deriveReactComponent(className: string, originalModule: CommonjsModule): ReactModule | null {
    const originalIdent = className;
    this._registeredComponents.add(`${originalModule.sourceFileName}__${originalIdent}`);
    className = this._makeUniqueClassName(className);
    const newFilename = this._makeNewFileName(originalModule.sourceFileName, className, true);
    this._registeredModuleClasses.add(className);
    this._derivedComponentsPathMap.set(originalModule.sourceFileName, newFilename);

    const moduleDescriptor = new ReactModule(
      className,
      originalModule.sourceFileName,
      newFilename,
      this._namespaces,
      this._serverFilesRoot,
      this._builtinsPath,
      this.log,
      originalIdent,
      originalModule
    );
    moduleDescriptor._specialVars = originalModule._specialVars;

    const mods = (this._sourceFilenameToModule.get(originalModule.sourceFileName) || []).concat(moduleDescriptor);
    this._sourceFilenameToModule.set(originalModule.sourceFileName, mods);
    this._targetFilenameToModule.set(newFilename, moduleDescriptor);
    return moduleDescriptor;
  }

  public deriveEnumComponent(className: string, originalModule: CommonjsModule): EnumModule | null {
    const originalIdent = className;
    this._registeredComponents.add(`${originalModule.sourceFileName}__${originalIdent}`);
    className = this._makeUniqueClassName(className);
    const newFilename = this._makeNewFileName(originalModule.sourceFileName, className, true);
    this._registeredModuleClasses.add(className);
    this._derivedComponentsPathMap.set(originalModule.sourceFileName, newFilename);
    const moduleDescriptor = new EnumModule(
      className,
      originalModule.sourceFileName,
      newFilename,
      this._namespaces,
      this._serverFilesRoot,
      this._builtinsPath,
      this.log,
      originalIdent,
      originalModule
    );

    const mods = (this._sourceFilenameToModule.get(originalModule.sourceFileName) || []).concat(moduleDescriptor);
    this._sourceFilenameToModule.set(originalModule.sourceFileName, mods);
    this._targetFilenameToModule.set(newFilename, moduleDescriptor);
    return moduleDescriptor;
  }

  private _makeNewFileName(fullyQualifiedFilename: string, className: string, addDir = false) {
    const name = normalizeFileExt(normalizeBasePath(fullyQualifiedFilename, this._baseDir, this._aliases));

    const rootPath = ModuleRegistry.namespaceToPath(this._namespaces.root);

    let pieces = `${rootPath}/${name}`.split('/');
    const filename = (pieces.pop() || '').replace(/\.php$/, '');
    if (addDir) {
      pieces.push(filename);
    }

    pieces = pieces
      .map((n) => ModuleRegistry.replaceInvalidNamespaceSymbols(n))
      .map((n) => escapeKeyword(n));

    pieces.push(className + '.php');
    return pieces.join('/');
  }

  private _makeUniqueClassName(className: string) {
    className = capitalize(camelize(className));
    if (this._registeredModuleClasses.has(className)) {
      let ctr = 1;
      while (this._registeredModuleClasses.has(className + ctr.toString())) {
        ctr++;
      }
      return className + ctr.toString();
    }
    return className;
  }

  public toTargetPath(sourcePath: string, searchForComponent?: string) {
    const mods = this._sourceFilenameToModule.get(sourcePath) || [];
    for (let i = 0; i < mods.length; i++) {
      if (!searchForComponent && !mods[i].isDerived) {
        return mods[i].targetFileName;
      }

      if (searchForComponent && mods[i].originalIdentName === searchForComponent) {
        return mods[i].targetFileName;
      }
    }

    return undefined;
  }

  protected _getInstance(filename: string, identifier: string): string {
    if (!this._targetFilenameToModule.has(filename)) {
      this.log.error('Module not registered: %s, when trying to reach property %s', [filename, identifier]);
      return '';
    }

    const fullyQualifiedNamespace = ModuleRegistry.pathToNamespace(filename);
    const className = this._targetFilenameToModule.get(filename)?.className;

    return `${fullyQualifiedNamespace}\\${className}::getInstance()`;
  }

  public static replaceInvalidNamespaceSymbols(name: string) {
    return name.replace(/[^a-z0-9_]/ig, '_');
  }

  public static pathToNamespace(path: string) {
    return path.split('/')
      .reverse()
      .slice(1)
      .reverse()
      .map((n) => ModuleRegistry.replaceInvalidNamespaceSymbols(n))
      .map((n) => escapeKeyword(n))
      .join('\\');
  }

  public static namespaceToPath(namespace: string) {
    return namespace.split('\\')
      .join('/');
  }
}
