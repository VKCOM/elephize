import * as ts from 'typescript';
import { Declaration, DeclFlag } from '../types';
import { builtins } from '../internalConfig/jsBuiltins';
import { flagParentOfType } from '../utils/ast';
import { Context } from '../components/context';
import { ctx, LogSeverity } from '../utils/log';
import { snakify } from '../utils/pathsAndNames';
import { insideComponent } from '../components/unusedCodeElimination/usageGraph/nodeData';

export function tIdentifier(node: ts.Identifier, context: Context<Declaration>) {
  const builtin = node.escapedText && builtins.has(node.escapedText.toString());
  const isCallableIdent = node.parent.kind === ts.SyntaxKind.CallExpression && (node.parent as ts.CallExpression).expression === node;

  if (builtin) {
    if (
      node.parent.kind === ts.SyntaxKind.PropertyAccessExpression && (node.parent as ts.PropertyAccessExpression).expression === node
      || isCallableIdent
    ) {
      if (node.escapedText === 'console') {
        return `\\${context.namespaces.builtins}\\Console`; // to make more consistent classes on server side
      }
      return `\\${context.namespaces.builtins}\\${node.escapedText}`;
    }
  }

  // Warn user for wrong usage of special variable
  if (context.dryRun && node.escapedText === 'window' && node.parent.getText() === 'window._elephizeIsServer') {
    context.log('Special variable \'window._elephizeIsServer\' should be used in ternary conditions only!', LogSeverity.ERROR, ctx(node));
  }

  const [decl, ] = context.scope.findByIdent(node.escapedText.toString()) || [];

  if (decl && decl.flags & DeclFlag.DereferencedImport) {
    if (!decl.targetModulePath) {
      // This condition is to prevent errors while importing types from external modules.
      // It's fine to import type/interface identifiers without any checks, if they're used only in type expressions.
      // It might be difficult to debug import failures, though, we consider it typescript compiler/checker business.
      return 'null';
    }
    return context.registry.getExportedIdentifier(context.moduleDescriptor, decl.targetModulePath, decl.propName || node.escapedText.toString(), !isCallableIdent);
  }

  if (node.escapedText.toString() === 'undefined' || node.escapedText.toString() === 'null') {
    return 'null';
  }

  // Mark require expressions to process them in CallExpression visitor
  if (node.escapedText.toString() === 'require') {
    context.log('You should use `import` instead of `require`', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  if ( // assignment inside object literal
    node.parent.kind === ts.SyntaxKind.PropertyAssignment && (node.parent as ts.PropertyAssignment).name === node
  ) {
    return node.escapedText.toString();
  }

  if ( // shorthand assignment inside object literal; should append usage case!
    node.parent.kind === ts.SyntaxKind.ShorthandPropertyAssignment && (node.parent as ts.ShorthandPropertyAssignment).name === node
  ) {
    context.scope.addUsage(node.getText(), [], { dryRun: context.dryRun });
    return node.escapedText.toString();
  }

  if (decl && decl.flags & DeclFlag.HoistedToModule) {
    if (insideComponent(context.scope)) {
      context.scope.addUsage(decl.propName || node.escapedText.toString(), [], { dryRun: context.dryRun });
      return context.registry.getExportedIdentifier(
        context.moduleDescriptor,
        context.moduleDescriptor.ancestorModule?.targetFileName || context.moduleDescriptor.targetFileName,
        decl.propName || node.escapedText.toString(),
        !isCallableIdent
      );
    }

    if (isCallableIdent) {
      return `$this->${decl.propName || node.escapedText.toString()}`;
    }

    const varName = decl.propName || node.escapedText.toString();
    context.scope.addUsage(node.getText(), [], { dryRun: context.dryRun });
    return `$this->${snakify(varName)}`;
  }

  if (
    isCallableIdent // called func name
    || node.parent.kind === ts.SyntaxKind.FunctionDeclaration // declared func name
  ) {
    // if it's function call, don't add to closure and just return the identifier
    return `$${snakify(decl?.propName || node.escapedText.toString())}`;
  }

  if (node.parent.kind === ts.SyntaxKind.PropertyAccessExpression) {
    if ((node.parent as ts.PropertyAccessExpression).expression !== node) {
      // For all other parts of property access expression we don't add contexts and don't add $ in beginning.
      return node.escapedText.toString();
    }
  }

  const isDeclaration = node.parent.kind === ts.SyntaxKind.VariableDeclaration && (node.parent as ts.VariableDeclaration).name === node;
  if (!context.dryRun && isDeclaration && !context.scope.checkUsage(node.getText())) {
    // Remove unused vars declarations
    context.log(`Dropped unused var $${node.escapedText} from [out]/${context.moduleDescriptor.targetFileName}`, LogSeverity.INFO, ctx(node));
    flagParentOfType(node, [ts.SyntaxKind.VariableDeclaration], { drop: true }, context.nodeFlagsStore);
  }

  if (!isDeclaration) {
    context.scope.addUsage(node.getText(), [], { dryRun: context.dryRun });
  }

  return `$${snakify(node.escapedText.toString())}`;
}