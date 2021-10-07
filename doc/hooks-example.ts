// Hooks definition file.
// Note: this file is transpiled *on the fly* and evaluated within `eval` within transpilation context.
// Take care of current working directory if your hooks rely on it.

// Type imports from typescript are permitted
import { ImportDeclaration, NumericLiteral, StringLiteral, SyntaxKind } from 'typescript';

// Hooks are defined as array of ElephizeNodeHookEntry items.
// Type definition of ElephizeNodeHooksEntry is taken from elephize's .d.ts file.
const hooks: ElephizeNodeHookEntry[] = [
  {
    // nodeKind value should be one of typescript's SyntaxKind enum values.
    // It represents kind of node in the AST to apply hook to.
    nodeKind: SyntaxKind.NumericLiteral,

    // Here is the hook itself: a function called when typescript parser finds node of this kind.
    // Note: in general, hook is called TWICE: once for dry run, and once for code generation.
    hook: (
      // First argument of hook function is a node itself.
      // It's a good idea to cast the argument to type referred by SyntaxKind above.
      node: NumericLiteral,

      // Second argument is elephize compilation context.
      // It contains numerous settings and methods to use, see elephize's renderers code for details.
      context
    ) => {
      // Hook should return object having one of the following shapes:
      // { preventDefault: false } - to permit elephize make it's own magic on same node
      // { preventDefault: true, content: <SOME_STRING> } - to prevent elephize handling of the node and
      //   output <SOME_STRING> right in-place.

      if (context.dryRun) { // Simplest way to prevent executing hook code twice
        return { preventDefault: false };
      }

      // Simple example of additional code preprocessing
      if (node.getText().endsWith('.')) {
        return { preventDefault: true, content: `1 + ${node.getText()}` };
      } else {
        return { preventDefault: false };
      }
    },
  },
  {
    // Some node kinds can't be printed with 'content' property. All content will be ignored during code generation.
    // ImportDeclaration is one of such node kinds, but there are definitely more, especially statement-based kinds
    // can be affected with this. If your statement-based hook fails to output some code, this might be it.
    // We still can read and process those nodes though. For imports, we can read module specifiers and process
    // imported files in some different manner.
    nodeKind: SyntaxKind.ImportDeclaration,
    hook: (node: ImportDeclaration) => {
      if ((node.moduleSpecifier as StringLiteral).text.endsWith('.css')) {
        // Here we can do something with css import...
        return { preventDefault: true, content: '' };
      }
      return { preventDefault: false };
    },
  },
];

module.exports = hooks;
