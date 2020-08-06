import { runWatcherTests } from './watcherTestEnv';

test('ts2php.watcher', () => {
  return runWatcherTests([
    {
      entry: 'modifyFile.entry.ts',
      diff: 'modifyFile.1.patch',
      checkFiles: [['ModifyFileModule.php', 'ModifyFileModule.1.php']],
    },
    {
      entry: 'modifyFile.entry.ts',
      diff: 'modifyFile.2.patch',
      checkFiles: [['ModifyFileModule.php', 'ModifyFileModule.2.php']],
    },
    {
      entry: 'importNewFile.entry.ts',
      diff: 'importNewFile.1.patch',
      checkFiles: [
        ['ImportNewFileModule.php', 'ImportNewFileModule.1.php'],
        ['ImportNewFileToImportModule.php', 'ImportNewFileToImportModule.1.php']
      ],
    },
    {
      entry: 'removeImport.entry.ts',
      diff: 'removeImport.1.patch',
      checkFiles: [['RemoveImportModule.php', 'RemoveImportModule.1.php']]
    },
    { // crash
      entry: 'brokenTsTyping.entry.ts',
      diff: 'brokenTsTyping.1.patch',
      checkFiles: [['BrokenTsTypingModule.php', 'BrokenTsTypingModule.1.php']],
      expectError: 2322
    },
    { // fix
      entry: 'brokenTsTyping.entry.ts',
      diff: 'brokenTsTyping.2.patch',
      checkFiles: [['BrokenTsTypingModule.php', 'BrokenTsTypingModule.2.php']]
    },
    { // crash
      entry: 'brokenTsSyntax.entry.ts',
      diff: 'brokenTsSyntax.1.patch',
      checkFiles: [['BrokenTsSyntaxModule.php', 'BrokenTsSyntaxModule.1.php']],
      expectError: 1005
    },
    { // fix
      entry: 'brokenTsSyntax.entry.ts',
      diff: 'brokenTsSyntax.2.patch',
      checkFiles: [['BrokenTsSyntaxModule.php', 'BrokenTsSyntaxModule.2.php']]
    },
    { // crash
      entry: 'unusedVariable.entry.ts',
      diff: 'unusedVariable.1.patch',
      checkFiles: [['UnusedVariableModule.php', 'UnusedVariableModule.1.php']]
    },
    { // fix
      entry: 'unusedVariable.entry.ts',
      diff: 'unusedVariable.2.patch',
      checkFiles: [['UnusedVariableModule.php', 'UnusedVariableModule.1.php']]
    },
    { // crash
      entry: 'variableUsage.entry.ts',
      diff: 'variableUsage.1.patch',
      checkFiles: [['VariableUsageModule.php', 'VariableUsageModule.1.php']]
    },
    { // fix
      entry: 'variableUsage.entry.ts',
      diff: 'variableUsage.2.patch',
      checkFiles: [['VariableUsageModule.php', 'VariableUsageModule.2.php']]
    },
    { // crash
      entry: 'undefVariableUsage.entry.ts',
      diff: 'undefVariableUsage.1.patch',
      checkFiles: [['UndefVariableUsageModule.php', 'UndefVariableUsageModule.1.php']],
      expectError: 2304
    },
    { // fix
      entry: 'undefVariableUsage.entry.ts',
      diff: 'undefVariableUsage.2.patch',
      checkFiles: [['UndefVariableUsageModule.php', 'UndefVariableUsageModule.2.php']]
    },

    // TODO: #491
    // { // add ignore annotation
    //   entry: 'elephizeAnnotationIgnore.entry.ts',
    //   diff: 'elephizeAnnotationIgnore.1.patch',
    //   checkFiles: [['ElephizeAnnotationIgnoreModule.php', 'ElephizeAnnotationIgnoreModule.1.php']]
    // },
    // { // try change ignored file, should not change
    //   entry: 'elephizeAnnotationIgnore.entry.ts',
    //   diff: 'elephizeAnnotationIgnore.2.patch',
    //   checkFiles: [['ElephizeAnnotationIgnoreImportedModule.php', 'ElephizeAnnotationIgnoreImportedModule.1.php']]
    // },
    // { // remove ignore annotation
    //   entry: 'elephizeAnnotationIgnore.entry.ts',
    //   diff: 'elephizeAnnotationIgnore.3.patch',
    //   checkFiles: [['ElephizeAnnotationIgnoreModule.php', 'ElephizeAnnotationIgnoreModule.2.php']]
    // },
    // { // try change ignored file, now it should change
    //   entry: 'elephizeAnnotationIgnore.entry.ts',
    //   diff: 'elephizeAnnotationIgnore.4.patch',
    //   checkFiles: [['ElephizeAnnotationIgnoreImportedModule.php', 'ElephizeAnnotationIgnoreImportedModule.2.php']]
    // },
    // { // add target annotation
    //   entry: 'elephizeAnnotationTarget.entry.ts',
    //   diff: 'elephizeAnnotationTarget.1.patch',
    //   checkFiles: [
    //     ['ElephizeAnnotationTargetModule.php', 'ElephizeAnnotationTargetModule.1.php'],
    //     ['ElephizeAnnotationTarget.php', 'ElephizeAnnotationTarget.1.php']
    //   ]
    // },
    // { // remove target annotation
    //   entry: 'elephizeAnnotationTarget.entry.ts',
    //   diff: 'elephizeAnnotationTarget.2.patch',
    //   checkFiles: [
    //     ['ElephizeAnnotationTargetModule.php', 'ElephizeAnnotationTargetModule.2.php']
    //   ]
    // },
  ]);
});
