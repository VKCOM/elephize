import { Scope } from '../ts2php/components/unusedCodeElimination/usageGraph';
import { configureLogging } from '../ts2php/components/cli/configureLogging';
const log = configureLogging({
  baseDir: '', output: '', outDir: ''
});

test.only('ts2php.UsageGraph.NewScope', () => {
  const rootScope = Scope.newRootScope({ flag1: true, flag2: 'false' }, '', log);
  expect(rootScope.localTerminalNode).toBeTruthy();
  expect(rootScope.terminalNode).toBeTruthy();
  expect(rootScope.terminalNode).toEqual(rootScope.localTerminalNode);
  expect(rootScope.declarations.size).toEqual(1);
  expect(rootScope.childScopes).toEqual(new Set());
  expect(rootScope.parentScope).toBeFalsy();
});

test('ts2php.UsageGraph.SimpleDeclaration_terminated', () => {
  const rootScope = Scope.newRootScope({ flag1: true, flag2: 'false' }, '', log);
  const node = rootScope.addDeclaration('test', [], { terminateGlobally: true, dryRun: true });
  expect(rootScope.declarations.size).toEqual(2);
  rootScope.terminalNode.markUsage();
  expect(node?.used).toBeTruthy();
});

test('ts2php.UsageGraph.SimpleDeclaration_eliminated', () => {
  const rootScope = Scope.newRootScope({ flag1: true, flag2: 'false' }, '', log);
  const node = rootScope.addDeclaration('test', [], { dryRun: true });
  expect(rootScope.declarations.size).toEqual(2);
  rootScope.terminalNode.markUsage();
  expect(node).toBeTruthy();
  expect(node?.used).toBeFalsy();
});

test('ts2php.UsageGraph.DependentDeclarations_terminated', () => {
  const rootScope = Scope.newRootScope({ flag1: true, flag2: 'false' }, '', log);
  const node1 = rootScope.addDeclaration('test1', [], { dryRun: true });
  const node2 = rootScope.addDeclaration('test2', ['test1'], { dryRun: true });
  const node3 = rootScope.addDeclaration('test3', ['test2'], { dryRun: true });
  const node4 = rootScope.addDeclaration('test4', ['test3'], { terminateGlobally: true, dryRun: true });
  expect(rootScope.declarations.size).toEqual(5);
  rootScope.terminalNode.markUsage();
  expect(node1?.used).toBeTruthy();
  expect(node2?.used).toBeTruthy();
  expect(node3?.used).toBeTruthy();
  expect(node4?.used).toBeTruthy();
});

// e.g. recursive calls
test('ts2php.UsageGraph.DependentCyclicDeclarations_terminated', () => {
  const rootScope = Scope.newRootScope({ flag1: true, flag2: 'false' }, '', log);
  const node1 = rootScope.addDeclaration('test1', ['test4'], { terminateGlobally: true, dryRun: true });
  const node2 = rootScope.addDeclaration('test2', ['test1'], { dryRun: true });
  const node3 = rootScope.addDeclaration('test3', ['test2'], { dryRun: true });
  const node4 = rootScope.addDeclaration('test4', ['test3'], { dryRun: true });
  expect(rootScope.declarations.size).toEqual(5);
  rootScope.terminalNode.markUsage();
  expect(rootScope.terminalNode.used).toBeTruthy();
  expect(node1?.used).toBeTruthy();
  expect(node2?.used).toBeTruthy();
  expect(node3?.used).toBeTruthy();
  expect(node4?.used).toBeTruthy();
});

test('ts2php.UsageGraph.DependentCyclicDeclarations_eliminated', () => {
  const rootScope = Scope.newRootScope({ flag1: true, flag2: 'false' }, '', log);
  const node1 = rootScope.addDeclaration('test1', ['test4'], { dryRun: true });
  const node2 = rootScope.addDeclaration('test2', ['test1'], { dryRun: true });
  const node3 = rootScope.addDeclaration('test3', ['test2'], { dryRun: true });
  const node4 = rootScope.addDeclaration('test4', ['test3'], { dryRun: true });
  expect(rootScope.declarations.size).toEqual(5);
  rootScope.terminalNode.markUsage();
  expect(rootScope.terminalNode.used).toBeTruthy();
  expect(node1).toBeTruthy();
  expect(node2).toBeTruthy();
  expect(node3).toBeTruthy();
  expect(node4).toBeTruthy();
  expect(node1?.used).toBeFalsy();
  expect(node2?.used).toBeFalsy();
  expect(node3?.used).toBeFalsy();
  expect(node4?.used).toBeFalsy();
});

test('ts2php.UsageGraph.ChildScope_ReturnTermination', () => {
  const rootScope = Scope.newRootScope({ flag1: true, flag2: 'false' }, '', log);
  const node1 = rootScope.addDeclaration('test1', [], { dryRun: true });
  const node2 = rootScope.addDeclaration('test2', ['test1'], { dryRun: true });
  const localScope = node2!.spawnScope('', true);
  const node3 = localScope.addDeclaration('test3', [], { terminateLocally: true, dryRun: true });
  const node4 = rootScope.addDeclaration('test4', ['test2'], { terminateGlobally: true, dryRun: true });
  expect(rootScope.declarations.size).toEqual(4);
  rootScope.terminalNode.markUsage();
  expect(rootScope.terminalNode.used).toBeTruthy();
  expect(node1?.used).toBeTruthy();
  expect(node2?.used).toBeTruthy();
  expect(node3?.used).toBeTruthy();
  expect(node4?.used).toBeTruthy();
});

test('ts2php.UsageGraph.ChildScope_UsageInLowerContext', () => {
  const rootScope = Scope.newRootScope({ flag1: true, flag2: 'false' }, '', log);
  const node1 = rootScope.addDeclaration('test1', [], { dryRun: true });
  const node2 = rootScope.addDeclaration('test2', [], { dryRun: true });
  const localScope = node2!.spawnScope('',true);
  const node3 = localScope.addDeclaration('test3', ['test1'], { terminateLocally: true, dryRun: true });
  const node4 = rootScope.addDeclaration('test4', ['test2'], { terminateGlobally: true, dryRun: true });
  expect(rootScope.declarations.size).toEqual(4);
  rootScope.terminalNode.markUsage();
  expect(rootScope.terminalNode.used).toBeTruthy();
  expect(localScope.terminalNode.used).toBeTruthy();
  expect(localScope.localTerminalNode.used).toBeTruthy();
  expect(node1?.used).toBeTruthy();
  expect(node2?.used).toBeTruthy();
  expect(node3?.used).toBeTruthy();
  expect(node4?.used).toBeTruthy();
});

test('ts2php.UsageGraph.ChildScope_Elimination', () => {
  const rootScope = Scope.newRootScope({ flag1: true, flag2: 'false' }, '', log);
  const node1 = rootScope.addDeclaration('test1', [], { dryRun: true });
  const node2 = rootScope.addDeclaration('test2', [], { dryRun: true });
  const localScope = node2!.spawnScope('', true);
  const node3 = localScope.addDeclaration('test3', ['test1'], { terminateLocally: true, dryRun: true });
  const nodeEl1 = localScope.addDeclaration('test_el1', ['test1'], { dryRun: true });
  const nodeEl2 = localScope.addDeclaration('test_el2', ['test_el1'], { dryRun: true });
  const node4 = rootScope.addDeclaration('test4', ['test2'], { terminateGlobally: true, dryRun: true });
  expect(rootScope.declarations.size).toEqual(4);
  expect(localScope.declarations.size).toEqual(5);
  rootScope.terminalNode.markUsage();
  expect(rootScope.terminalNode.used).toBeTruthy();
  expect(localScope.terminalNode.used).toBeTruthy();
  expect(localScope.localTerminalNode.used).toBeTruthy();
  expect(node1?.used).toBeTruthy();
  expect(node2?.used).toBeTruthy();
  expect(node3?.used).toBeTruthy();
  expect(node4?.used).toBeTruthy();
  expect(nodeEl1).toBeTruthy();
  expect(nodeEl2).toBeTruthy();
  expect(nodeEl1?.used).toBeFalsy();
  expect(nodeEl2?.used).toBeFalsy();
});

test.skip('ts2php.UsageGraph.ChildScope_ScopeElimination', () => {
  const rootScope = Scope.newRootScope({ flag1: true, flag2: 'false' }, '', log);
  const node1 = rootScope.addDeclaration('test1', [], { terminateGlobally: true, dryRun: true });
  const node2 = rootScope.addDeclaration('test2', [], { dryRun: true });
  const localScope = node2!.spawnScope('', true);
  const node3 = localScope.addDeclaration('test3', ['test1'], { terminateLocally: true, dryRun: true });
  const node4 = rootScope.addDeclaration('test4', ['test2'], { dryRun: true });
  expect(rootScope.declarations.size).toEqual(4);
  rootScope.terminalNode.markUsage();
  expect(rootScope.terminalNode.used).toBeTruthy();
  expect(localScope.terminalNode.used).toBeTruthy();
  expect(localScope.localTerminalNode.used).toBeFalsy();
  expect(node1?.used).toBeTruthy();
  expect(node2).toBeTruthy();
  expect(node3).toBeTruthy();
  expect(node4).toBeTruthy();
  expect(node2?.used).toBeFalsy();
  expect(node3?.used).toBeFalsy();
  expect(node4?.used).toBeFalsy();
});