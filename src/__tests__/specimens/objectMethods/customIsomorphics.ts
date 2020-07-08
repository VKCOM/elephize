let obj4 = { a: 1, b: 2 };
do {
  // @ts-ignore
  console.log(getLang('lol!'));
  if (obj4) break;
} while (true);
