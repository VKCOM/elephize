import { getLang, getLangStatic } from './toReplace';
import { getFoo, getBar } from './toReplaceIndex/index';
let obj4 = { a: 1, b: 2 };
do {
  // @ts-ignore
  console.log(getLang('lol!'));
  console.log(getLangStatic('lol!'));
  console.log(getFoo('lol!'));
  console.log(getBar('lol!'));
  if (obj4) break;
} while (true);
