import { getLang, getLangStatic } from './toReplace';
let obj4 = { a: 1, b: 2 };
do {
  // @ts-ignore
  console.log(getLang('lol!'));
  console.log(getLangStatic('lol!'));
  if (obj4) break;
} while (true);
