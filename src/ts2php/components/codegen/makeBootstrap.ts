import { ModuleRegistry } from '../cjsModules/moduleRegistry';
import { Dict } from '../../types';
import { normalizeBasePath, normalizeFileExt } from '../../utils/pathsAndNames';
import { CommonjsExternalModule } from '../cjsModules/commonjsExternalModule';

export function makeBootstrap(registry: ModuleRegistry, baseDir: string, aliases?: Dict<string>) {
  let names: string[] = [];
  registry.forEachModule((m) => {
    if (!m.isEmpty() || m instanceof CommonjsExternalModule) {
      names.push(m.targetFileName);
    }
  });
  const deps = names.map((fn) => {
    const path = fn.replace(baseDir, '');
    const modPath = normalizeFileExt(normalizeBasePath(path, baseDir, aliases));
    return `require_once __DIR__ . "/${modPath}";`;
  });

  return `<?php
/* NOTICE: Generated file; Do not edit by hand */
require_once __DIR__ . "/builtins.php";
${deps.join('\n')}

`;
}