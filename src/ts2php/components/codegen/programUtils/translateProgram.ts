import * as ts from 'typescript';
import { NodeFlagStore } from '../nodeFlagStore';
import { TranslateOptions } from '../../../types';
import { ModuleRegistry } from '../../cjsModules/moduleRegistry';
import { renderModule } from '../renderModule';
import { CommonjsModule } from '../../cjsModules/commonjsModule';
import { log, LogSeverity } from '../../../utils/log';
import * as prettier from 'prettier/standalone';
import { phpPrettierOptions } from '../../../internalConfig/phpPrettierOptions';
import { defaultOptions } from '../defaultCompilerOptions';

/**
 * Transform typescript `Program` object (build or watch) to php file set.
 *
 * @param program
 * @param nodeFlagStore
 * @param onData
 * @param onBeforeRender
 * @param baseDir
 * @param customGlobals
 * @param disableCodeElimination
 * @param aliases
 * @param namespaces
 * @param options
 * @param onFinish
 */
export function translateProgram(program: ts.Program, nodeFlagStore: NodeFlagStore, {
  onData,
  onBeforeRender = () => undefined,
  baseDir,
  customGlobals = {},
  disableCodeElimination = false,
  aliases = {},
  namespaces,
  options = defaultOptions,
  onFinish = () => undefined
}: TranslateOptions) {
  if (typeof jest === 'undefined') {
    console.time('Elephize recompilation done');
  }
  let registry = new ModuleRegistry(baseDir, aliases, options.paths || {}, namespaces);
  let checker = program.getTypeChecker();
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) { // skip .d.ts if any
      let currentModule = registry.registerClass(sourceFile.fileName);
      if (!currentModule) {
        continue;
      }

      onBeforeRender(sourceFile.fileName, sourceFile);
      renderModule(checker, options, sourceFile, nodeFlagStore, baseDir, namespaces, registry, currentModule, disableCodeElimination, customGlobals);
    }
  }

  registry.forEachModule((mod: CommonjsModule) => {
    if (mod.isEmpty()) {
      // Do not emit empty modules
      log(`Dropping module ${mod.className} (${mod.targetFileName}) because it's empty`, LogSeverity.INFO);
      return;
    }
    let content = mod.generateContent();
    try {
      content = prettier.format(content, phpPrettierOptions);
    } catch (e) {
      console.error('Prettier failed to parse & prettify generated code. Here is raw code:');
      console.log(content);
    }

    onData(mod.targetFileName, content);
  });

  if (typeof jest === 'undefined') {
    console.timeEnd('Elephize recompilation done');
  }
  onFinish(registry);
}