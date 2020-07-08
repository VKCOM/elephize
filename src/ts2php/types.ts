import * as ts from 'typescript';
import { Context } from './components/context';
import { ModuleRegistry } from './components/cjsModules/moduleRegistry';

export type Dict<T> = { [key: string]: T };

export interface NodeInfo {
  node: NodeDescription | UnsupportedNode;
  children: NodeInfo[];
  parent?: NodeInfo;
  checker: ts.TypeChecker;
  compilerOptions: ts.CompilerOptions;
  flags: {
    name?: string; // Mark with name to identify the node
    drop?: boolean; // Set to true will exclude node from rendering
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
    imports?: Array<{ // Used in native imports handler to enumerate imported elements
      identNode: ts.Identifier;
      propName?: string;
    }>;
    localsData?: {
      regStatements: string[];
    };
    addExpressions?: string[]; // use this to add some expressions before rendering statement.
  }; // for misc purposes and intermediate data storage during code generation
}

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

export interface NodeDescription {
  kind: ts.SyntaxKind;
  supported: true;
  builtin?: boolean;
  gen: (self: NodeInfo, context: Context<Declaration>) => string;
}

export interface UnsupportedNode {
  kind: ts.SyntaxKind;
  kindDescription: string;
  supported: false;
  gen: (self: NodeInfo, context: Context<Declaration>) => string;
}

export type ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => string | undefined;

export type TranslateOptions = {
  fileNames: string[];
  baseDir: string;
  aliases: { [key: string]: string };
  namespaces: NsMap;
  customGlobals?: { [key: string]: string };
  disableCodeElimination?: boolean;
  options?: ts.CompilerOptions;
  onData: (filename: string, content: string) => void;
  onBeforeRender?: (filename: string, rootNode: NodeInfo) => void; // mainly for testing purposes...
  onFinish?: (registry: ModuleRegistry) => void;
};

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