import * as fs from 'fs';
import * as ts from 'typescript';
import * as path from 'path';
import { ctx, log, LogSeverity } from '../../utils/log';
import { resolveAliasesAndPaths } from '../../utils/pathsAndNames';

// ignored/skipped imports related functions

const ctxEx = (fn: string, node?: ts.Node) => node ? ctx(node) : `Entry point: ${fn}`;

type ParseSourceFileOpts = {
  filename: string;
  baseDir: string;
  onFinish: (result: ts.SourceFile) => void;
  onSkip: (filename: string) => void;
  importReference?: ts.ImportDeclaration;
};

function parseSourceFile({ filename, baseDir, onFinish, onSkip, importReference }: ParseSourceFileOpts) {
  fs.readFile(filename, { encoding: 'utf-8' }, (err, data) => {
    const sourceFile = ts.createSourceFile(filename, data, ts.ScriptTarget.Latest,true);

    const trivia = importReference?.getFullText().substr(0, importReference?.getLeadingTriviaWidth());
    if (trivia?.includes('@elephizeIgnore')) {
      log(`Skipping ignored file: ${filename}`, LogSeverity.INFO, ctxEx(filename.replace(baseDir, '[base]'), importReference));
      onSkip(filename);
      return;
    }

    if (sourceFile.isDeclarationFile) {
      log(`Skipping declaration file: ${filename}`, LogSeverity.INFO, ctxEx(filename.replace(baseDir, '[base]'), importReference));
      onSkip(filename);
      return;
    }

    onFinish(sourceFile);
  });
}

type SkippedFilesGetterOpts = {
  entrypoint: string;
  baseDir: string;
  tsPaths: { [key: string]: string[] };
  aliases: { [key: string]: string };
};

export const getSkippedFilesPromiseExec = ({ entrypoint, baseDir, tsPaths, aliases }: SkippedFilesGetterOpts) => (resolve: (results: string[]) => void) => {
  let results: string[] = [];

  let sem = 0;
  const semInc = () => ++sem;
  const semDec = (filename?: string) => {
    if (filename) {
      results.push(filename);
    }
    --sem;
    if (sem === 0) {
      resolve(results);
    }
  };

  const parseSourceFileRecursive = (filename: string, ref?: ts.ImportDeclaration) => {
    filename = filename.replace(/^'|'$/g, '');

    if (filename.match(/^[a-z_-]+$/) || filename.startsWith('@')) {
      // node module import
      return;
    }

    // Directory where file with import is located
    const fileBaseDir = path.dirname(ref ? path.resolve(ref.getSourceFile().fileName) : path.resolve(entrypoint));

    const fn = resolveAliasesAndPaths(
      filename.replace(/^'|'$/g, ''),
      fileBaseDir, baseDir, tsPaths, aliases, true
    );

    if (!fn) {
      log(`Module not found: ${filename.replace(baseDir, '[base]')}`,
        LogSeverity.ERROR, ctxEx(filename.replace(baseDir, '[base]'), ref));
      return;
    }

    semInc();
    parseSourceFile({ filename: fn, baseDir, importReference: ref, onSkip: semDec, onFinish: (result) => {
      const imports = result.statements.filter((c): c is ts.ImportDeclaration => c.kind === ts.SyntaxKind.ImportDeclaration);
      imports.forEach((imp) => {
        parseSourceFileRecursive(imp.moduleSpecifier.getText(result), imp);
      });
      semDec();
    }});
  };

  parseSourceFileRecursive(entrypoint);
};
