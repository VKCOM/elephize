import * as glob from 'glob';
import { LogObj } from '../../utils/log';
import { translateCode, translateCodeAndWatch } from '../codegen/translateCode';
import * as path from 'path';
import * as fs from 'fs';
import * as iconv from 'iconv-lite';
import { ModuleRegistry } from '../cjsModules/moduleRegistry';
import ncp = require('ncp');
import { makeBootstrap } from '../codegen/makeBootstrap';
import { CliOptions } from '../../types';
import { resolveRulePaths } from '../cjsModules/resolveModules';
const replace = require('stream-replace');

export function transpile(options: CliOptions, baseDir: string, outDir: string, log: LogObj) {
  const namespaces = {
    root: options.rootNs,
    builtins: options.builtinsNs || options.rootNs + '\\Builtins',
  };

  glob(options.src, (e: Error, matches: string[]) => {
    if (e) {
      log.error('%s', [e.toString()]);
      process.exit(1);
      return;
    }

    const compilerOptions = {
      baseUrl: baseDir,
      paths: options.tsPaths || {}
    };

    (options.watch ? translateCodeAndWatch : translateCode)(
      matches.map((p) => path.resolve('./', p)), resolveRulePaths(options.importRules, baseDir), options.tsPaths, log, {
        baseDir,
        aliases: options.aliases,
        namespaces,
        encoding: options.encoding || 'utf-8',
        disableCodeElimination: options.noZap,
        options: compilerOptions,
        onData: (sourceFilename: string, targetFilename: string, content: string) => onData(targetFilename, content),
        onFinish
      }
    );
  });

  function onData(filename: string, content: string) {
    const outputFilename = outDir + '/' + filename;
    log.info('Emitting file: %s', [outputFilename]);
    const outputDir = path.dirname(outputFilename);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputFilename, iconv.encode(content, options.encoding || 'utf-8'));
  }

  function onFinish(registry: ModuleRegistry) {
    if ((log.errCount || 0) > 0 && options.bail === 'error') {
      process.exit(1);
    }
    if ((log.errCount || 0) + (log.warnCount || 0) > 0 && options.bail === 'warn') {
      process.exit(1);
    }

    const bootstrapContent = makeBootstrap(registry, baseDir.endsWith('/') ? baseDir : baseDir + '/', options.aliases);
    if (options.output === '__stdout') {
      console.log(bootstrapContent);
    } else {
      log.special('Creating bootstrap file', []);
      fs.writeFile(path.resolve(outDir, options.output), iconv.encode(bootstrapContent, options.encoding || 'utf-8'), (err) => {
        if (!err) {
          log.special('Bootstrap file successfully created', []);
        }
      });
    }

    const bSrc = path.resolve(__dirname, '..', '..', '..', 'server');
    const bTgt = outDir;

    log.special('Copying server-side base files', []);
    log.special('From: %s', [bSrc]);
    log.special('To: %s', [bTgt]);

    ncp(bSrc, bTgt, {
      transform: function(read, write) {
        read.pipe(replace(/__ROOTNS__/g, namespaces.root)).pipe(write);
      }
    }, (err) => {
      if (!err) {
        log.special('Server-side base files successfully copied', []);
      }
    });
  }
}