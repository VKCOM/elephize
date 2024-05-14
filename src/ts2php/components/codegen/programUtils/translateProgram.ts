import * as ts from 'typescript';
import { NodeFlagStore } from '../nodeFlagStore';
import { ImportReplacementRule, TranslateOptions, LogObj } from '../../../types';
import { ModuleRegistry } from '../../cjsModules/moduleRegistry';
import { renderModule } from '../renderModule';
import { CommonjsModule } from '../../cjsModules/commonjsModule';
import * as prettier from 'prettier/standalone';
import { phpPrettierOptions } from '../../../internalConfig/phpPrettierOptions';
import { defaultCompilerOptions } from '../defaultCompilerOptions';
import { CommonjsExternalModule } from '../../cjsModules/commonjsExternalModule';
import * as path from 'path';

/**
 * Transform typescript `Program` object (build or watch) to php file set.
 *
 * @param program
 * @param replacements
 * @param nodeFlagStore
 * @param log
 * @param onData
 * @param onBeforeRender
 * @param baseDir
 * @param disableCodeElimination
 * @param aliases
 * @param serverFilesRoot
 * @param namespaces
 * @param encoding
 * @param printImportTree
 * @param options
 * @param onFinish
 */
export function translateProgram(program: ts.Program, replacements: ImportReplacementRule[], nodeFlagStore: NodeFlagStore, log: LogObj, {
  onData,
  onBeforeRender = () => undefined,
  baseDir,
  disableCodeElimination = false,
  aliases = {},
  sourceExtensions,
  serverFilesRoot,
  builtinsPath,
  namespaces,
  encoding,
  printImportTree,
  compilerOptions = defaultCompilerOptions,
  jsxPreferences = {},
  hooks = {},
  onFinish = () => undefined,
}: TranslateOptions) {
  if (typeof jest === 'undefined') {
    console.time('Elephize recompilation done');
  }

  if (!builtinsPath) {
    builtinsPath = path.resolve(__dirname, '..', '..', '..', '..', 'builtins');
  }

  const registry = new ModuleRegistry(
    baseDir,
    aliases,
    compilerOptions.paths || {},
    sourceExtensions,
    namespaces,
    serverFilesRoot,
    builtinsPath,
    replacements,
    log
  );
  const checker = program.getTypeChecker();
  for (const sourceFile of program.getSourceFiles()) {
    const isReplaced = replacements.find((rule) => rule.modulePath === sourceFile.fileName);

    if (!isReplaced && !sourceFile.isDeclarationFile) { // skip .d.ts if any
      const currentModule = registry.registerClass(sourceFile.fileName);
      if (!currentModule) {
        continue;
      }

      onBeforeRender(sourceFile.fileName, sourceFile, nodeFlagStore);
      renderModule(
        checker,
        compilerOptions ?? {},
        sourceFile,
        nodeFlagStore,
        baseDir,
        namespaces,
        encoding,
        registry,
        currentModule,
        log,
        disableCodeElimination,
        '',
        jsxPreferences,
        hooks
      );
    }
  }

  // Print imports tree if requested
  type ModuleWithImports = { name: string; imports: ModuleWithImports[] };
  function print(name: string, list: any, depth: string, modulesInStack: string[]) {
    if (modulesInStack.includes(name) && modulesInStack[modulesInStack.length - 1] !== name) {
      console.log(depth + '├─ ' + name.replace(baseDir, '[base]') + ' [RECURSION!]');
    } else {
      console.log(depth + '├─ ' + name.replace(baseDir, '[base]'));
      Object.keys(list).forEach((mod) => {
        if (list.hasOwnProperty(mod)) {
          print(
            list[mod].name,
            list[mod].imports,
            depth + '│ ',
            [...modulesInStack, list[mod].name]
          );
        }
      });
    }
  }
  if (printImportTree) {
    let importsList: { [key: string]: ModuleWithImports } = {};

    // init list
    registry.forEachModule((mod: CommonjsModule) => {
      importsList[mod.sourceFileName] = { name: mod.sourceFileName, imports: [] };
    });

    // assign import modules from list
    registry.forEachModule((mod: CommonjsModule) => {
      let entries: ModuleWithImports[] = [];
      mod.imports.forEach((idents, imp) => {
        let mod = importsList[imp];
        if (mod) {
          entries.push(mod);
        }
      });

      const modImport = importsList[mod.sourceFileName];
      importsList[mod.sourceFileName] = {
        name: mod.sourceFileName,
        imports: modImport ? [...modImport.imports, ...entries] : entries,
      };
    });

    // Print nicely
    print('Imports tree in all entrypoints:', importsList, '', []);
  }

  registry.forEachModule(async (mod: CommonjsModule) => {
    if (mod.isEmpty()) {
      if (mod instanceof CommonjsExternalModule) {
        // Do not emit external modules
        log.info('Module %s (%s) is external: skip emit', [mod.className, mod.targetFileName]);
      } else {
        // Do not emit empty modules
        log.info('Dropping module %s (%s) because it\'s empty', [mod.className, mod.targetFileName]);
      }
      return;
    }
    let content = mod.generateContent();
    try {
      content = await prettier.format(content, phpPrettierOptions);
    } catch (e) {
      console.error('Prettier failed to parse & prettify generated code. Here is raw code:');
      console.log(content);
    }

    onData(mod.sourceFileName, mod.targetFileName, content);
  });

  if (typeof jest === 'undefined') {
    console.timeEnd('Elephize recompilation done');
  }
  onFinish(registry);
}
