import * as ts from 'typescript';
import { Declaration, DeclFlag, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { ctx, log, LogSeverity } from '../utils/log';
import { getLeftExpr } from '../utils/ast';
import { Context } from '../components/context';
import { insideComponent } from '../components/unusedCodeElimination/usageGraph/nodeData';
import { supportedMathMethods } from './stdlib/math';

export function tPropertyAccessExpression(node: ts.PropertyAccessExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const children = self.children;
      let [ident, accessor] = renderSupportedNodes(self.children, context);

      if (ident === '$React' && accessor === 'createElement') {
        return '$this->h';
      }

      if (ident === '$exports' && !context.scope.getClosure().has('exports')) {
        log('You should use `export` instead of `module.exports = `', LogSeverity.ERROR, ctx(node));
        return '';
      }

      let lExp = getLeftExpr(node.expression);
      if (lExp) {
        let [decl] = context.scope.findByIdent(lExp.getText()) || [];
        if (decl && decl.flags & DeclFlag.External) {
          return context.registry.getExportedIdentifier(context.moduleDescriptor, decl.targetModulePath!, node.name.text);
        }
      }

      if (accessor === 'length' && node.parent.kind !== ts.SyntaxKind.PropertyAccessExpression) {
        let type = context.checker.getTypeAtLocation(node.expression);
        if (
          type.isStringLiteral()
          || context.checker.typeToString(type, node.expression, ts.TypeFormatFlags.None) === 'string'
        ) {
          log('Converting .length to strlen(): check your encodings!', LogSeverity.WARN);
          return `strlen(${ident})`;
        }
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
              log(`Math: unsupported property (${accessor})`, LogSeverity.ERROR, ctx(node));
            }
            return 'null';
        }
      }

      if (children[0].node.supported && children[0].node.builtin) {
        return `${ident}::${accessor}`;
      }

      if (accessor === 'children' && insideComponent(context.scope)) {
        log(`Accessing ${ident}.children inside react component function: note that accessing props.children` +
          ' won\'t work on server! Use object dereferencing instead.', LogSeverity.WARN, ctx(node));
      }

      return `${ident}["${accessor}"]`;
    }
  };
}