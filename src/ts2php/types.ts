/*
  !! WARNING !!

  This file should contain only type definitions,
  so it could be used as typing file outside of elephize.

  Type imports are allowed from typescript package only.
  Code imports are NOT allowed at all.
 */

import type {
  Node as TsNode, SyntaxKind as TsSyntaxKind,
  CompilerOptions, TypeChecker,
  FunctionExpression, ArrowFunction, CallExpression,
} from 'typescript';

export type SyntaxKind = TsSyntaxKind;
export type Node = TsNode;
export type Dict<T> = { [key: string]: T };
export type CallbackType = FunctionExpression | ArrowFunction | undefined;

export interface LogObj {
  errCount: number;
  warnCount: number;
  verbosity: number;
  info: (message: string, params: string[], context?: string) => void;
  warn: (message: string, params: string[], context?: string) => void;
  error: (message: string, params: string[], context?: string) => void;
  special: (message: string, params: string[], context?: string) => void;
  typehint: (message: string, params: string[], context?: string) => void;
  ctx: (node?: Node) => string;
  shortCtx: (fn: string) => string;
}

export interface IModuleRegistry {
  clearClasses(): void;
  forEachModule(cb: (m: ICommonjsModule) => void): void;
  getExportedIdentifier(forModule: ICommonjsModule, targetFilename: string | undefined, identifier: string, rewriteCase?: boolean): string;
  callExportedCallable(forModule: ICommonjsModule, targetFilename: string | undefined, identifier: string, args: string[]): string;
  getExportedComponent(forModule: ICommonjsModule, targetFilename: string | undefined, identifier: string): string;
  getLocalComponent(forModule: ICommonjsModule, identifier: string): string;
  getEnumConst(declModuleFilename: string, enumName: string, enumMember: string): string;
  getSourceModules(sourceName: string): ICommonjsModule[];
  getModuleMethodSource(module: ICommonjsModule | undefined, name: string | undefined): ICommonjsModule | undefined;
  registerClass(filepath: string): ICommonjsModule | null;
  isDerivedComponent(sourceFileName: string, varName: string): boolean;
  deriveReactComponent(className: string, originalModule: ICommonjsModule): IReactModule | null;
  deriveEnumComponent(className: string, originalModule: ICommonjsModule): IEnumModule | null;
  toTargetPath(sourcePath: string, searchForComponent?: string): string | undefined;
}

export interface IContext<T> {
  checker: TypeChecker;
  nodeFlagsStore: INodeFlagStore;
  readonly compilerOptions: CompilerOptions;
  moduleDescriptor: ICommonjsModule;
  dryRun: boolean;
  baseDir: string;
  readonly namespaces: NsMap;
  readonly encoding: string;
  readonly registry: IModuleRegistry;
  readonly log: LogObj;
  readonly builtinsNs: string;
  readonly jsxPreferences?: JSXPreferences;
  readonly nodeHooks: NodeHooks;
  readonly scope: IScope<T>;
  jsxPush(tag: string): void;
  jsxPop(tag: string): void;
  jsxPeak(): string | null;
  pushScope(uniqid: string, ownerIdent: string): void;
  popScope(uniqid: string, context?: Node): void;
}

export interface IScope<NodeData extends { [key: string]: any }> {
  readonly tNodeLocal: string;
  declarations: Map<string, IScopeNode<NodeData>>;
  childScopes: Set<IScope<NodeData>>;
  readonly sourceFile: string;
  readonly parentScope?: IScope<NodeData>;
  readonly ownerNode?: IScopeNode<NodeData>;
  readonly terminalNode: IBoundNode<NodeData>;
  readonly localTerminalNode: IBoundNode<NodeData>;
  addEventListener(event: string, cb: (ident: string) => void): void;
  removeEventListener(event: string, cb: (ident: string) => void): void;
  isRoot(): boolean;
  findByIdent(ident: string): [NodeData, IScope<NodeData>, IScopeNode<NodeData>] | null;
  getClosure(): Map<string, NodeData>;
  /**
   * Add declaration of identifier to current scope
   *
   * @param traceSourceIdent  Identifier: variable or function name
   * @param traceTargetIdents  What other identifiers are used to compute value.
   *                        All identifiers in expressions, all function args should be here.
   * @param terminateGlobally  Set this to true if variable or function is used in library methods or is exported
   * @param terminateLocally  Set this to true if variable or result of function call is returned as result.
   * @param dryRun  First pass of codegen?
   */
  addDeclaration(
    traceSourceIdent: string,
    traceTargetIdents: Array<string | undefined>,
    {
      terminateGlobally,
      terminateLocally,
      dryRun,
    }: {
      terminateGlobally: boolean;
      terminateLocally: boolean;
      dryRun: boolean;
    }
  ): IBoundNode<NodeData> | null;
  /**
   * Add usage of identifier to current scope
   *
   * @param traceSourceIdent  Identifier: variable or function name
   * @param traceTargetIdents  What other identifiers are used to compute value.
   *                          All identifiers in expressions, all function args should be here.
   * @param terminateGlobally  Set this to true if variable or function is used in library methods
   * @param terminateLocally  Set this to true if variable or result of function call is returned as result.
   * @param dryRun  First pass of codegen?
   */
  addUsage(traceSourceIdent: string, traceTargetIdents: string[], {
    terminateGlobally,
    terminateLocally,
    dryRun,
  }: {
    terminateGlobally: boolean;
    terminateLocally: boolean;
    dryRun: boolean;
  }): void;
  terminateCall(traceTargetIdent: string, {
    traceSourceIdent,
    dryRun,
  }: { traceSourceIdent?: string; dryRun?: boolean }): void;
  /**
   * Used in components to attach component's return node to parent return node
   * @param dryRun
   */
  terminateToParentTerminalNode(dryRun: boolean): void;
  /**
   * Reset usage flags for all nodes in all child scopes and current scope
   */
  reset(): void;
  checkUsage(varName: string): boolean;
}

export interface IScopeNode<T extends { [key: string]: any }> {
  data: T;
  readonly ident: string;
  readonly homeScope: IScope<T>;
  readonly used: boolean;

  spawnScope(sourceFile: string, dryRun: boolean): IScope<T>;

  /**
   * Small letters indicate false boolean flag, capitals indicate true
   * B: bound
   * U: used
   */
  toString(): string;

  /**
   * Add dependency: current node depends on given node (uses it somehow).
   * @param node
   */
  addEdgeTo(node: IScopeNode<T>): void;

  /**
   * Remove dependency of this node on some another node
   * @param node
   */
  removeEdgeTo(node: IScopeNode<T>): void;

  /**
   * Traverse usage graph with DFS and then reset traverse
   * marks to ensure proper work of following traversals.
   * @param cb
   * @param bail
   */
  traverse(cb: (node: IBoundNode<T>) => boolean, bail: boolean): void;

  reset(): void;

  /**
   * Call this method on terminal node to travers and mark all used identifiers in all scopes.
   * Use homeScope.reset() to uncheck usage marks
   */
  markUsage(): void;
}

export interface IBoundNode<T> extends IScopeNode<T>{
  readonly ownedScope: IScope<T> | undefined;

  /**
   * Create scope for this identifier.
   * Equivalent to adding new stack frame to the call stack.
   */
  spawnScope(sourceFile: string, dryRun: boolean): IScope<T>;
}

export interface ICommonjsModule {
  isDerived: boolean;
  isExternal: boolean;
  _specialVars: SpecialVars;
  readonly className: string;
  readonly sourceFileName: string;
  readonly targetFileName: string;
  readonly log: LogObj;
  readonly originalIdentName?: string;
  readonly ancestorModule?: ICommonjsModule;
  readonly imports: Map<string, string[]>;
  readonly exports: Map<string, string[]>;
  clearStatements(): void;
  addProperty(identifier: string, inferredType: string, visibility: 'public' | 'private'): void;
  addMethod(identifier: string, block: string, args: string, inferredTypes: MethodsTypes | undefined, visibility: 'public' | 'private'): void;
  registerImport(from: string, method: string): void;
  registerExport(from: string, method: string): void;
  hasMethod(name: string): boolean;
  hasProperty(name: string): any;
  hasExport(name: string): boolean;
  findExportSource(name: string): string | null;
  addStatement(statement: string): void;
  registerSpecialVar(kind: keyof SpecialVars, name: string, node?: Node): void;
  registerRequiredFile(path: string, currentModulePath: string, originalModule?: ICommonjsModule): void;
  checkSpecialVarIdentifier(node: Node | undefined, kind: keyof SpecialVars): boolean;
  isEmpty(): boolean;
  generateContent(): string;
}

export interface IReactModule extends ICommonjsModule {
  isDerived: boolean;
  setArgs(args: string): void;
  setBlock(block: string): void;
  isEmpty(): boolean;
}

export interface IEnumModule extends ICommonjsModule {
  isDerived: boolean;
  clearStatements(): void;
  registerSpecialVar(): void;
  checkSpecialVarIdentifier(): boolean;
  addMethod(): void;
  addProperty(): void;
  addStaticConst(identifier: string, value: string, inferredType: string): void;
}

// for misc purposes and intermediate data storage during code generation
export type NodeFlags = {
  name?: string; // Mark with name to identify the node
  drop?: boolean; // Set to true will exclude node from rendering
  dropReplacement?: string; // If var was dropped, this will be output in place.
  passthrough?: boolean; // Set to true will exclude rendering of node specifics in some cases
  validated?: boolean; // Some cases need this flag to be true after arguments of function are checked to be ok
  childCount?: number; // Pass here arguments count or node children count for some cases
  rawNodes?: Node[]; // Pass here nodes to be rendered on upper level
  prerenderedData?: string[]; // JSX cases use pre-rendered data from the child scope
  elementName?: string; // Used for passing intrinsic element name to nested context
  forceType?: string; // Mark basic expression type explicitly
  isComponent?: boolean; // true if current function is component function
  elIndex?: number; // Used to enumerate properties without name for object/array destructuring in function params
  destructuringInfo?: { // Used in array/object destructuring to pass rendered params through context
    vars: string;
  };
  boundClassInstance?: string;
  optionalParamsWithDefaults?: string[]; // Used in function declarations to prepend default values assignments to function body
  addExpressions?: string[]; // use this to add some expressions before rendering statement.
  optionalGuard?: string; // extra condition check to be appended to call expressions enclosing optional chaining operators
};

export interface INodeFlagStore {
  clear(): void;
  get(node: Node): NodeFlags | undefined;
  upsert(node: Node, flagsToAdd: NodeFlags): NodeFlags;
}

export type Declaration = {
  propName?: string;
  flags: {
    External?: boolean;
    DereferencedImport?: boolean;
    Local?: boolean;
    HoistedToModule?: boolean;
    Callable?: boolean;
    ModifiedInLowerScope?: boolean;
  };
  forcedType?: string;
  targetModulePath?: string; // For require()-declarations
  isComponent?: boolean;
};

export type NodeHooks = { [k in SyntaxKind]?: ElephizeNodeHook };

export type ExpressionHook = (node: CallExpression, context: IContext<Declaration>) => string | undefined;

export type NsMap = {
  root: string;
  builtins: string;
};

export type SpecialVars = {
  react?: string;
  useState?: string;
  useEffect?: string;
  useContext?: string;
  useReducer?: string;
  useCallback?: string;
  useMemo?: string;
  useRef?: string;
  useImperativeHandle?: string;
  useLayoutEffect?: string;
  useDebugValue?: string;
};

export type MethodsTypes = {
  return: string;
  args: { [key: string]: string };
};

export type ImportReplacementRule = {
  modulePath: string;
  implementationPath: string;
  implementationClass: string;
};

export type JSXPreferences = {
  allowStringEvents?: boolean;
};

export type CliOptions = {
  aliases: { [key: string]: string };
  bail: 'none' | 'warn' | 'error';
  serverBaseDir?: string;
  rewriteBuiltinsRoot?: string;
  baseDir: string;
  config: string;
  encoding: string;
  printImportTree: boolean;
  help: boolean;
  noZap: boolean;
  outDir: string;
  output: string;
  quiet: boolean;
  ignoreImports: Set<string>;
  replaceImports: { [moduleIdentifier: string]: Omit<ImportReplacementRule, 'modulePath'> };
  rootNs: string;
  builtinsNs?: string;
  src: string | string[];
  tsPaths: { [key: string]: string[] };
  verbose: boolean;
  verboseTypehints: boolean;
  verboseUsage: boolean;
  watch: boolean;
  jsxPreferences?: JSXPreferences;
  hooksIncludePath?: string;
};

export type TranslateOptions = {
  aliases: CliOptions['aliases'];
  baseDir: CliOptions['baseDir'];
  disableCodeElimination?: boolean;
  getCloseHandle?: (handle: () => void) => void; // get function which closes watcher when called
  namespaces: NsMap;
  serverFilesRoot: string;
  builtinsPath?: string;
  encoding: string;
  printImportTree: boolean;
  onBeforeRender?: (filename: string, rootNode: Node, nodeFlagStore: INodeFlagStore) => void; // mainly for testing purposes...
  onData: (sourceFilename: string, targetFilename: string, content: string, error?: number) => void;
  onFinish?: (registry: IModuleRegistry) => void;
  options?: CompilerOptions;
  jsxPreferences: JSXPreferences;
  hooks: NodeHooks;
};
