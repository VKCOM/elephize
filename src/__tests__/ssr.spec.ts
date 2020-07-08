import { spawn }  from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
jest.setTimeout(10000);

const getFromProcess = (command: string, args: string[]): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    let child = spawn(command, args);
    let cont = '';
    child.stdout.on('data', (data) => cont += data);
    child.on('close', (code) => {
      if (code > 0) {
        reject();
      } else {
        resolve(cont);
      }
    });
  });
};

test('ts2php.SSR', async () => {
  if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'demo', 'public', 'build', 'bootstrap.php'))) {
    await getFromProcess('yarn', ['--silent', 'demo_build']);
  }
  const reactData = await getFromProcess('yarn', ['--silent', 'demo_outreact']);
  const phpData = await getFromProcess('yarn', ['--silent', 'demo_outphp']);
  expect(reactData).toBeTruthy();
  expect(phpData).toBeTruthy();
  expect(reactData).toEqual(phpData);
});
