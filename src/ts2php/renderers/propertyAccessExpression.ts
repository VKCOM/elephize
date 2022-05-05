import * as ts from 'typescript';
import { Declaration } from '../types';
import { getLeftExpr } from '../utils/ast';
import { Context } from '../components/context';
import { insideComponent } from '../components/unusedCodeElimination/usageGraph/nodeData';
import { supportedMathMethods } from './stdlib/math';
import { renderNodes } from '../components/codegen/renderNodes';
import { builtins } from '../internalConfig/jsBuiltins';
import { handleEnumMemberAccess } from '../utils/enumAccess';

export function tPropertyAccessExpression(node: ts.PropertyAccessExpression, context: Context<Declaration>) {
  const [ident, accessor] = renderNodes([node.expression, node.name], context);

  if (ident === '$exports' && !context.scope.getClosure().has('exports')) {
    context.log.error('You should use `export` instead of `module.exports = `', [], context.log.ctx(node));
    return '';
  }

  const enumAccess = handleEnumMemberAccess(node, context);
  if (enumAccess) {
    if (enumAccess === true) { // error: message logged inside access func
      return '';
    }
    return enumAccess; // output handled by access func
  }

  const lExp = getLeftExpr(node.expression);
  if (lExp) {
    const [decl] = context.scope.findByIdent(lExp.getText()) || [];
    if (decl && decl.flags.External) {
      return context.registry.getExportedIdentifier(context.moduleDescriptor, decl.targetModulePath, node.name.text);
    }
  }

  if (accessor === 'length' && node.parent.kind !== ts.SyntaxKind.PropertyAccessExpression) {
    return `count(${ident})`;
  }

  if (ident === '$Math') {
    switch (accessor) {
      case 'E':
      case 'LN2':
      case 'LN10':
      case 'LOG2E':
      case 'LOG10E':
      case 'PI':
      case 'SQRT1_2':
      case 'SQRT2':
        return 'M_' + accessor;
      default:
        if (!supportedMathMethods.includes(accessor)) {
          context.log.error('Math: unsupported property (%s)', [accessor], context.log.ctx(node));
        }
        return 'null';
    }
  }

  const isBuiltin = builtins.has(node.expression.getText());
  if (isBuiltin) {
    return `${ident}::${accessor}`;
  }

  if (accessor === 'children' && insideComponent(context.scope)) {
    return '$children';
  }

  const isDirectPropAccess = node.parent.kind !== ts.SyntaxKind.PropertyAccessExpression;
  const isPropCallAccess = (
    node.parent.kind === ts.SyntaxKind.PropertyAccessExpression && node.parent.parent.kind === ts.SyntaxKind.CallExpression
  ) || node.parent.kind === ts.SyntaxKind.CallExpression;

  if (isDirectPropAccess || isPropCallAccess) { // check for optional chaining in top-level expr
    let hasOptionalChaining = false;
    let exprNode = node;
    while (exprNode.kind === ts.SyntaxKind.PropertyAccessExpression) {
      if (exprNode.questionDotToken) {
        hasOptionalChaining = true;
        break;
      }
      exprNode = exprNode.expression as any;
    }

    if (hasOptionalChaining) {
      if (isPropCallAccess) {
        context.nodeFlagsStore.upsert(node.parent.parent, {
          optionalGuard: `isset(${ident}["${accessor}"])`,
        });
        return `${ident}["${accessor}"]`;
      }
      return `(isset(${ident}["${accessor}"]) ? ${ident}["${accessor}"] : null)`;
    }
  }

  if (ident === '$this' || context.scope.isClassInstance(node.expression.getText())) {
    return `${ident}->${accessor}`;
  }

  // Special case for static constants access
  if (node.expression.getText() + 'Class' === context.moduleDescriptor.className) {
    return `${context.moduleDescriptor.className}::${accessor}`;
  }
  const [file, classIdent] = context.moduleDescriptor.findImportedIdentifier(node.expression.getText()) || [];
  if (file && classIdent && context.registry.isPlainClass(file, classIdent)) {
    return `${context.registry.getPlainClassName(file, classIdent)}::${accessor}`;
  }

  return `${ident}["${accessor}"]`;
}
