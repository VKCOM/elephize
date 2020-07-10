import * as glob from 'glob';
import { Options } from './types';
import { log, LogSeverity } from '../../utils/log';
import { translateCode } from '../codegen/translateCode';
import * as path from 'path';
import * as fs from 'fs';
import * as iconv from 'iconv-lite';
import { ModuleRegistry } from '../cjsModules/moduleRegistry';
import ncp = require('ncp');
import { makeBootstrap } from '../codegen/makeBootstrap';
const replace = require('stream-replace');

export function transpile(options: Options, baseDir: string, outDir: string) {
  const namespaces = {
    root: options.rootNs,
    builtins: options.rootNs + '\\Builtins',
  };

  glob(options.src, (e: Error, matches: string[]) => {
    if (e) {
      log(`${e}`, LogSeverity.ERROR);
      process.exit(1);
      return;
    }

    const compilerOptions = {
      baseUrl: baseDir,
      paths: options.tsPaths || {}
    };

    translateCode({
      fileNames: matches.map((p) => path.resolve('./', p)),
      baseDir,
      aliases: options.aliases,
      namespaces,
      disableCodeElimination: options.noZap,
      options: compilerOptions,
      onData: (filename: string, content: string) => onData(filename, content),
      onFinish
    });
  });

  function onData(filename: string, content: string) {
    const outputFilename = outDir + '/' + filename;
    log('Emitting file: ' + outputFilename, LogSeverity.INFO);
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
      log('Creating bootstrap file', LogSeverity.SPECIAL);
      fs.writeFile(path.resolve(outDir, options.output), iconv.encode(bootstrapContent, options.encoding || 'utf-8'), (err) => {
        if (!err) {
          log('Bootstrap file successfully created', LogSeverity.SPECIAL);
        }
      });
    }

    const bSrc = path.resolve(__dirname, '..', '..', '..', 'server');
    const bTgt = outDir;

    log('Copying server-side base files', LogSeverity.SPECIAL);
    log(`From: ${bSrc}`, LogSeverity.SPECIAL);
    log(`To: ${bTgt}`, LogSeverity.SPECIAL);

    ncp(bSrc, bTgt, {
      transform: function(read, write) {
        read.pipe(replace(/__ROOTNS__/g, namespaces.root)).pipe(write);
      }
    }, (err) => {
      if (!err) {
        log('Server-side base files successfully copied', LogSeverity.SPECIAL);
      }
    });
  }
}