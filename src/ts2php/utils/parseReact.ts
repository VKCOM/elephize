import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

function generateDocumentation(
  fileNames: string[],
  options: ts.CompilerOptions
): void {
  // Build a program using the set of root file names in fileNames
  const program = ts.createProgram(fileNames, options);

  // Get the checker, we will use it to find more about classes
  const checker = program.getTypeChecker();

  const result: { tags: any[]; attrs: any[] } = {
    tags: [],
    attrs: [],
  };

  // Visit every sourceFile in the program
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, visit);
    }
  }

  // print out the doc
  fs.writeFileSync(
    path.resolve(__dirname, '..', '..', '..', 'data', 'intrinsicElements.ts'),
    'export const intrinsicElements = ' + JSON.stringify(result.tags, undefined, 4) + ';'
  );
  fs.writeFileSync(
    path.resolve(__dirname, '..', '..', '..', 'data', 'domattrs.ts'),
    'export const domattrs = ' + JSON.stringify(result.attrs, undefined, 4) + ';'
  );

  return;

  function visit(node: ts.Node) {
    if (ts.isModuleDeclaration(node)) {
      const symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        if (symbol.getName() === 'React') {
          ts.forEachChild(node, visit);
        }
      }
    } else if (ts.isInterfaceDeclaration(node) && node.name) {
      // This is a top level class, get its symbol
      const symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        if (symbol.getName() === 'ReactDOM') { // Found root element for internal html elements!
          result.tags = getElements(checker.getTypeAtLocation(node), checker);
        }
        if (symbol.getName() === 'DOMAttributes') { // Found root element for internal html elements!
          result.attrs = getCallbackAttrs(checker.getTypeAtLocation(node));
        }
      }
    } else {
      ts.forEachChild(node, visit);
    }
  }
}

function getCallbackAttrs(interfaceType: ts.Type) {
  const attrs = interfaceType.getApparentProperties();
  return attrs.map((symbol) => symbol.getName()).filter((name) => name.startsWith('on'));
}

function getElements(interfaceType: ts.Type, checker: ts.TypeChecker) {
  const intrinsicTags = interfaceType.getApparentProperties();
  return intrinsicTags.map((symbol) => {
    const symType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);

    const memberProps: ts.Symbol[] = [];
    let inheritedProps: ts.Symbol[] = [];
    if ((symType as any).resolvedTypeArguments && (symType as any).resolvedTypeArguments[0]) {
      // member props
      (symType as any).resolvedTypeArguments[0].symbol.members.forEach((val: ts.Symbol) => memberProps.push(val));
      // inferred props
      const attrsSym = (symType as any).resolvedTypeArguments[0].symbol;
      const attrSymDecl: ts.Identifier = attrsSym.declarations[0].heritageClauses[0].types[0].expression;
      inheritedProps = checker.getTypeAtLocation(attrSymDecl).getApparentProperties();
    }

    return {
      'tagName': symbol.escapedName,
      'props': [
        ...inheritedProps,
        ...memberProps,
        ...symType.getApparentProperties(),
      ].map((s: ts.Symbol) => s.escapedName).sort(),
    };
  });
}

generateDocumentation(['./node_modules/@types/react/index.d.ts'], {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
});
