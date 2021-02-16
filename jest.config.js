module.exports = {
  'reporters': [
    'jest-tap-reporter'
  ],
  'roots': [
    '<rootDir>/src'
  ],
  testMatch: [
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  'setupFilesAfterEnv': ['jest-expect-message']
};
