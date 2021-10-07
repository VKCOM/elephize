/* eslint-disable spaced-comment */
/// <reference path="./compiler-extras.d.ts" />

declare interface ElephizeNodeHook {
  run: (
    node: import('../../src/ts2php/types').Node,
    context: import('../../src/ts2php/types').IContext<import('../../src/ts2php/types').Declaration>
  ) => { preventDefault: true; content: string } | { preventDefault: false };
}

declare interface ElephizeNodeHookEntry {
  nodeKind: import('../../src/ts2php/types').SyntaxKind;
  hook: ElephizeNodeHook['run'];
}
