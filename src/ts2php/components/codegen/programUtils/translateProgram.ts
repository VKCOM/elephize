import * as ts from 'typescript';
import { NodeFlagStore } from '../nodeFlagStore';
import { ImportReplacementRule, TranslateOptions } from '../../../types';
import { ModuleRegistry } from '../../cjsModules/moduleRegistry';
import { renderModule } from '../renderModule';
import { CommonjsModule } from '../../cjsModules/commonjsModule';
import { log, LogSeverity } from '../../../utils/log';
import * as prettier from 'prettier/standalone';
import { phpPrettierOptions } from '../../../internalConfig/phpPrettierOptions';
import { defaultOptions } from '../defaultCompilerOptions';
import { CommonjsExternalModule } from '../../cjsModules/commonjsExternalModule';

/**
 * Transform typescript `Program` object (build or watch) to php file set.
 *
 * @param program
 * @param replacements
 * @param nodeFlagStore
 * @param onData
 * @param onBeforeRender
 * @param baseDir
 * @param disableCodeElimination
 * @param aliases
 * @param namespaces
 * @param options
 * @param onFinish
 */
export function translateProgram(program: ts.Program, replacements: ImportReplacementRule[], nodeFlagStore: NodeFlagStore, {
  onData,
  onBeforeRender = () => undefined,
  baseDir,
  disableCodeElimination = false,
  aliases = {},
  namespaces,
  options = defaultOptions,
  onFinish = () => undefined
}: TranslateOptions) {
  if (typeof jest === 'undefined') {
    console.time('Elephize recompilation done');
  }

  let registry = new ModuleRegistry(baseDir, aliases, options.paths || {}, namespaces, replacements);
  let checker = program.getTypeChecker();
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) { // skip .d.ts if any
      let currentModule = registry.registerClass(sourceFile.fileName);
      if (!currentModule) {
        continue;
      }

      onBeforeRender(sourceFile.fileName, sourceFile, nodeFlagStore);
      renderModule(checker, options, sourceFile, nodeFlagStore, baseDir, namespaces, registry, currentModule, disableCodeElimination);
    }
  }

  registry.forEachModule((mod: CommonjsModule) => {
    if (mod.isEmpty()) {
      if (mod instanceof CommonjsExternalModule) {
        // Do not emit external modules
        log(`Module ${mod.className} (${mod.targetFileName}) is external: skip emit`, LogSeverity.INFO);
      } else {
        // Do not emit empty modules
        log(`Dropping module ${mod.className} (${mod.targetFileName}) because it's empty`, LogSeverity.INFO);
      }
      return;
    }
    let content = mod.generateContent();
    try {
      content = prettier.format(content, phpPrettierOptions);
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