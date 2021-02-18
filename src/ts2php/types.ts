import * as ts from 'typescript';
import {Context} from './components/context';
import {ModuleRegistry} from './components/cjsModules/moduleRegistry';
import { NodeFlagStore } from './components/codegen/nodeFlagStore';

export type Dict<T> = { [key: string]: T };
export type CallbackType = ts.FunctionExpression | ts.ArrowFunction | undefined;

// for misc purposes and intermediate data storage during code generation
export type NodeFlags = {
  name?: string; // Mark with name to identify the node
  drop?: boolean; // Set to true will exclude node from rendering
  dropReplacement?: string; // If var was dropped, this will be output in place.
  passthrough?: boolean; // Set to true will exclude rendering of node specifics in some cases
  validated?: boolean; // Some cases need this flag to be true after arguments of function are checked to be ok
  childCount?: number; // Pass here arguments count or node children count for some cases
  rawNodes?: ts.Node[]; // Pass here nodes to be rendered on upper level
  prerenderedData?: string[]; // Some cases use pre-rendered data from the child scope
  elementName?: string; // Used for passing intrinsic element name to nested context
  forceType?: string; // Mark basic expression type explicitly
  isComponent?: boolean; // true if current function is component function
  elIndex?: number; // Used to enumerate properties without name for object/array destructuring in function params
  destructuringInfo?: { // Used in array/object destructuring to pass rendered params through context
    vars: string;
  };
  localsData?: {
    regStatements: string[];
  };
  addExpressions?: string[]; // use this to add some expressions before rendering statement.
};

export enum DeclFlag {
  External = 0b00000001,
  DereferencedImport = 0b00000010,
  Local = 0b00000100,
  HoistedToModule = 0b00001000,
  Callable = 0b00010000,
  ModifiedInLowerScope = 0b00100000,
}

export type Declaration = {
  propName?: string;
  flags: DeclFlag;
  forcedType?: string;
  targetModulePath?: string; // For require()-declarations
  isComponent?: boolean;
};

export type ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => string | undefined;

export type NsMap = {
  root: string;
  builtins: string;
};

export const hooksNames = [
  'useState',
  'useEffect',
  'useContext',
  'useReducer',
  'useCallback',
  'useMemo',
  'useRef',
  'useImperativeHandle',
  'useLayoutEffect',
  'useDebugValue',
];

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

type ReplacedImportRule = {
  ignore: false;
  implementationPath: ImportReplacementRule['implementationPath'];
  implementationClass: ImportReplacementRule['implementationClass'];
};
type IgnoredImportRule = {
  ignore: true;
};
export type ImportRule = ReplacedImportRule | IgnoredImportRule;

export type CliOptions = {
  aliases: { [key: string]: string };
  bail: 'none' | 'warn' | 'error';
  baseDir: string;
  config: string;
  encoding: string;
  help: boolean;
  noZap: boolean;
  outDir: string;
  output: string;
  quiet: boolean;
  importRules: {
    [moduleIdentifier: string]: ImportRule;
  };
  rootNs: string;
  src: string;
  tsPaths: { [key: string]: string[] };
  verbose: boolean;
  verboseTypehints: boolean;
  verboseUsage: boolean;
  watch: boolean;
};

export type TranslateOptions = {
  aliases: CliOptions['aliases'];
  baseDir: CliOptions['baseDir'];
  disableCodeElimination?: boolean;
  getCloseHandle?: (handle: () => void) => void; // get function which closes watcher when called
  namespaces: NsMap;
  encoding: string;
  onBeforeRender?: (filename: string, rootNode: ts.Node, nodeFlagStore: NodeFlagStore) => void; // mainly for testing purposes...
  onData: (sourceFilename: string, targetFilename: string, content: string, error?: number) => void;
  onFinish?: (registry: ModuleRegistry) => void;
  options?: ts.CompilerOptions;
};