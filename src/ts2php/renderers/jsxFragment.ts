import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNodes } from '../components/codegen/renderNodes';

export const tJsxFragment = (node: ts.JsxFragment, context: Context<Declaration>) => '$this->frg([\n' + renderNodes([...node.children], context).join(',\n') + '\n])';
