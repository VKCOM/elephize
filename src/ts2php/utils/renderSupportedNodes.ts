import { Declaration, NodeInfo } from '../types';
import { Context } from '../components/context';

export function renderSupportedNodes(nodes: Array<NodeInfo | undefined>, context: Context<Declaration>, filterEmpty = true): string[] {
  const list = nodes.map((child) => {
    return child?.node?.supported ? child.node.gen(child, context) : null;
  });

  if (filterEmpty) {
    return list.filter(function (child): child is string {
      return !!child && child !== '!null';
    });
  } else {
    return list.map((child) => {
      if (!child || child === '!null') {
        child = '';
      }
      return child;
    });
  }
}

