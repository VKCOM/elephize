import * as ts from 'typescript';
import { CommonjsModule } from '../components/cjsModules/commonjsModule';
import { Context } from '../components/context';
import { Declaration } from '../types';

export function tExportSpecifier(node: ts.ExportSpecifier, context: Context<Declaration>) {
  let sourceModule: CommonjsModule | undefined;
  const name = node.name.getText();

  // render nodes
  if (context.moduleDescriptor.hasMethod(name)) {
    sourceModule = context.moduleDescriptor;
  } else {
    sourceModule = context.registry.getModuleMethodSource(context.moduleDescriptor, name);
  }

  if (sourceModule) {
    context.moduleDescriptor.registerExport(sourceModule.sourceFileName, name);
  }

  return '';
}
