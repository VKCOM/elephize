import { runWatcherTests } from './watcherTestEnv';

test('ts2php.watcher', () => {
  return runWatcherTests([
    {
      entry: 'modifyFile.entry.ts',
      diff: 'modifyFile.1.patch',
      checkFiles: [['modifyFile.entry.ts', 'ModifyFileModule.1.php']],
    },
    {
      entry: 'modifyFile.entry.ts',
      diff: 'modifyFile.2.patch',
      checkFiles: [['modifyFile.entry.ts', 'ModifyFileModule.2.php']],
    },
    {
      entry: 'importNewFile.entry.ts',
      diff: 'importNewFile.1.patch',
      checkFiles: [
        ['importNewFile.entry.ts', 'ImportNewFileModule.1.php'],
        ['importNewFileToImport.ts', 'ImportNewFileToImportModule.1.php']
      ],
    },
    {
      entry: 'removeImport.entry.ts',
      diff: 'removeImport.1.patch',
      checkFiles: [['removeImport.entry.ts', 'RemoveImportModule.1.php']]
    },
    { // crash
      entry: 'brokenTsTyping.entry.ts',
      diff: 'brokenTsTyping.1.patch',
      checkFiles: [['brokenTsTyping.entry.ts', 'BrokenTsTypingModule.1.php']],
      expectError: 2322
    },
    { // fix
      entry: 'brokenTsTyping.entry.ts',
      diff: 'brokenTsTyping.2.patch',
      checkFiles: [['brokenTsTyping.entry.ts', 'BrokenTsTypingModule.2.php']]
    },
    { // crash
      entry: 'brokenTsSyntax.entry.ts',
      diff: 'brokenTsSyntax.1.patch',
      checkFiles: [['brokenTsSyntax.entry.ts', 'BrokenTsSyntaxModule.1.php']],
      expectError: 1005
    },
    { // fix
      entry: 'brokenTsSyntax.entry.ts',
      diff: 'brokenTsSyntax.2.patch',
      checkFiles: [['brokenTsSyntax.entry.ts', 'BrokenTsSyntaxModule.2.php']]
    },
    { // crash
      entry: 'unusedVariable.entry.ts',
      diff: 'unusedVariable.1.patch',
      checkFiles: [['unusedVariable.entry.ts', 'UnusedVariableModule.1.php']]
    },
    { // fix
      entry: 'unusedVariable.entry.ts',
      diff: 'unusedVariable.2.patch',
      checkFiles: [['unusedVariable.entry.ts', 'UnusedVariableModule.1.php']]
    },
    { // crash
      entry: 'variableUsage.entry.ts',
      diff: 'variableUsage.1.patch',
      checkFiles: [['variableUsage.entry.ts', 'VariableUsageModule.1.php']]
    },
    { // fix
      entry: 'variableUsage.entry.ts',
      diff: 'variableUsage.2.patch',
      checkFiles: [['variableUsage.entry.ts', 'VariableUsageModule.2.php']]
    },
    { // crash
      entry: 'undefVariableUsage.entry.ts',
      diff: 'undefVariableUsage.1.patch',
      checkFiles: [['undefVariableUsage.entry.ts', 'UndefVariableUsageModule.1.php']],
      expectError: 2304
    },
    { // fix
      entry: 'undefVariableUsage.entry.ts',
      diff: 'undefVariableUsage.2.patch',
      checkFiles: [['undefVariableUsage.entry.ts', 'UndefVariableUsageModule.2.php']]
    }
  ]);



  // return runWatcherTests({
  // 'Create entrypoint file': {
  //   'startFile': '',
  //   'diffs': {
  //     'diffname': 'expectedFile'
  //   }
  // },
  // 'Delete file (file or entrypoint, used and unused)': {
  //   'startFile': '',
  //   'diffs': {
  //     'diffname': 'expectedFile'
  //   }
  // },
  // 'Added/removed @elephize* annotations': {
  //   'startFile': '',
  //   'diffs': {
  //     'diffname': 'expectedFile'
  //   }
  // },
  // });
});
