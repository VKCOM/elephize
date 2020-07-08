import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { escapeString } from '../utils/escapeString';
import { Context } from '../components/context';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';

export function tTemplateExpression(node: ts.TemplateExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      return renderSupportedNodes(self.children, context).join(' . ');
    }
  };
}

export function tTemplateSpan(node: ts.TemplateSpan): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const [expr, literal] = renderSupportedNodes(self.children, context);
      return `(${expr})` + (literal && literal !== '""' ? ' . ' + literal : '');
    }
  };
}

export function tTemplateStatic(node: ts.TemplateHead | ts.TemplateMiddle | ts.TemplateTail | ts.NoSubstitutionTemplateLiteral): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => {
      const str = escapeString(node.text);
      if (str) {
        return '"' + str +'"';
      }
      return '';
    }
  };
}
