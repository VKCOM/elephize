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
    {
      entry: 'brokenTsTyping.entry.ts',
      diff: 'brokenTsTyping.1.patch',
      checkFiles: [['brokenTsTyping.entry.ts', 'BrokenTsTypingModule.1.php']],
      expectError: 2322
    },
    {
      entry: 'brokenTsTyping.entry.ts',
      diff: 'brokenTsTyping.2.patch',
      checkFiles: [['brokenTsTyping.entry.ts', 'BrokenTsTypingModule.2.php']]
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
  // 'Broken TS code (typing)': {
  //   'startFile': '',
  //   'diffs': {
  //     'diffname': 'expectedFile'
  //   }
  // },
  // 'Broken TS code (syntax)': {
  //   'startFile': '',
  //   'diffs': {
  //     'diffname': 'expectedFile'
  //   }
  // },
  // 'Restored TS code (typing)': {
  //   'startFile': '',
  //   'diffs': {
  //     'diffname': 'expectedFile'
  //   }
  // },
  // 'Restored TS code (syntax)': {
  //   'startFile': '',
  //   'diffs': {
  //     'diffname': 'expectedFile'
  //   }
  // },
  // 'Added/removed unused variable': {
  //   'startFile': '',
  //   'diffs': {
  //     'diffname': 'expectedFile'
  //   }
  // },
  // 'Added/removed usage of variable': {
  //   'startFile': '',
  //   'diffs': {
  //     'diffname': 'expectedFile'
  //   }
  // },
  // 'Added/removed usage of undeclared variable': {
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
