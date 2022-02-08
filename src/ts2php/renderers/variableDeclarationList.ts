import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNodes } from '../components/codegen/renderNodes';

export const tVariableDeclarationList = (node: ts.VariableDeclarationList, context: Context<Declaration>) => renderNodes([...node.declarations], context).join('; ');
