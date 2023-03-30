import { normalizeFileExt } from '../utils';

describe('normalizeFileExt', () => {
  test('replace source extension to .php', () => {
    expect(normalizeFileExt('path/to/source.tsx', ['.ts', '.tsx'])).toEqual('path/to/source.php');
  });

  test('leave only one .php extension', () => {
    expect(normalizeFileExt('path/to/source.php.jsx', ['.jsx', '.tsx'])).toEqual('path/to/source.php');
  });

  test('do not change .php', () => {
    expect(normalizeFileExt('path/to/source.php', ['.js', '.jsx'])).toEqual('path/to/source.php');
  });
});
