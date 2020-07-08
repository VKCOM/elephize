const tia = { a: 1, b: 2, c: 3 };
const tib = { ...tia, d: 4, e: 5 };
const { c: tic, e: tie, ...others } = tib;

const tid = [1, 2, 3];
const tif = [5, ...tid, 6];
const [tig, tih, ...others2] = tif;

console.log(tic, tie, others);
console.log(tig, tih, others2);
