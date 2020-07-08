const raa = [1, 2, 3, 4];
const [ra1, , ...ra2] = raa;
const [ra3, , ra5, ...ra4] = [1, 2, 3, 4, 5];

const rab = { a: 1, b: 2, c: 3 };
const { a: rb1, ...rest1 } = rab;
const { a: rb2, rb3, ...rest2 } = { a: 1, rb3: 2, c: 3, d: 4 };

function raf(a: number, b: number, ...c: number[]) {
  return a + b + c.reduce((acc, v) => acc + v, 0);
}

console.log(ra1, ra2, ra3, ra4, ra5, rb1, rb2, rb3, rest1, rest2, raf(1, 2, 3, 4));
