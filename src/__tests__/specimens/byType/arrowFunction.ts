const test2 = (b: number) => {
  let a = 1 + b;
  return a;
};
const test3 = (a: number, b: number) => a + b;
console.log(test2(1));
console.log(test3(1, 2));
