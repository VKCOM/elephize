import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode } from '../components/codegen/renderNodes';

export function tJsxAttribute(node: ts.JsxAttribute, context: Context<Declaration>) {
  const expr = renderNode(node.initializer, context);
  return `"${node.name.getText()}" => ${expr}`;
}
