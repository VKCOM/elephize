import { runWatcherTests } from './watcherTestEnv';
import DoneCallback = jest.DoneCallback;

test('ts2php.watcher', (done: DoneCallback) => {
  void runWatcherTests([
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
      entry: 'modifyFileTypehints.entry.ts',
      diff: 'modifyFileTypehints.1.patch',
      checkFiles: [['ModifyFileTypehintsModule.php', 'ModifyFileTypehintsModule.1.php']],
    },
    {
      entry: 'modifyFileTypehints.entry.ts',
      diff: 'modifyFileTypehints.2.patch',
      checkFiles: [['ModifyFileTypehintsModule.php', 'ModifyFileTypehintsModule.2.php']],
    },
    {
      entry: 'importNewFile.entry.ts',
      diff: 'importNewFile.1.patch',
      checkFiles: [
        ['ImportNewFileModule.php', 'ImportNewFileModule.1.php'],
        ['ImportNewFileToImportModule.php', 'ImportNewFileToImportModule.1.php'],
      ],
    },
    {
      entry: 'removeImport.entry.ts',
      diff: 'removeImport.1.patch',
      checkFiles: [['RemoveImportModule.php', 'RemoveImportModule.1.php']],
    },
    { // crash
      entry: 'brokenTsTyping.entry.ts',
      diff: 'brokenTsTyping.1.patch',
      checkFiles: [['BrokenTsTypingModule.php', 'BrokenTsTypingModule.1.php']],
      expectError: 2322,
    },
    { // fix
      entry: 'brokenTsTyping.entry.ts',
      diff: 'brokenTsTyping.2.patch',
      checkFiles: [['BrokenTsTypingModule.php', 'BrokenTsTypingModule.2.php']],
    },
    { // crash
      entry: 'brokenTsSyntax.entry.ts',
      diff: 'brokenTsSyntax.1.patch',
      checkFiles: [['BrokenTsSyntaxModule.php', 'BrokenTsSyntaxModule.1.php']],
      expectError: 1005,
    },
    { // fix
      entry: 'brokenTsSyntax.entry.ts',
      diff: 'brokenTsSyntax.2.patch',
      checkFiles: [['BrokenTsSyntaxModule.php', 'BrokenTsSyntaxModule.2.php']],
    },
    { // crash
      entry: 'unusedVariable.entry.ts',
      diff: 'unusedVariable.1.patch',
      checkFiles: [['UnusedVariableModule.php', 'UnusedVariableModule.1.php']],
    },
    { // fix
      entry: 'unusedVariable.entry.ts',
      diff: 'unusedVariable.2.patch',
      checkFiles: [['UnusedVariableModule.php', 'UnusedVariableModule.1.php']],
    },
    { // crash
      entry: 'variableUsage.entry.ts',
      diff: 'variableUsage.1.patch',
      checkFiles: [['VariableUsageModule.php', 'VariableUsageModule.1.php']],
    },
    { // fix
      entry: 'variableUsage.entry.ts',
      diff: 'variableUsage.2.patch',
      checkFiles: [['VariableUsageModule.php', 'VariableUsageModule.2.php']],
    },
    { // crash
      entry: 'undefVariableUsage.entry.ts',
      diff: 'undefVariableUsage.1.patch',
      checkFiles: [['UndefVariableUsageModule.php', 'UndefVariableUsageModule.1.php']],
      expectError: 2304,
    },
    { // fix
      entry: 'undefVariableUsage.entry.ts',
      diff: 'undefVariableUsage.2.patch',
      checkFiles: [['UndefVariableUsageModule.php', 'UndefVariableUsageModule.2.php']],
    },
    { // add target annotation
      entry: 'elephizeAnnotationTarget.entry.tsx',
      diff: 'elephizeAnnotationTarget.1.patch',
      checkFiles: [
        ['ElephizeAnnotationTarget.php', 'ElephizeAnnotationTarget.1.php'],
      ],
    },
    { // remove target annotation
      entry: 'elephizeAnnotationTarget.entry.tsx',
      diff: 'elephizeAnnotationTarget.2.patch',
      checkFiles: [
        ['ElephizeAnnotationTargetModule.php', 'ElephizeAnnotationTargetModule.2.php'],
      ],
    },
  ], done);
});
