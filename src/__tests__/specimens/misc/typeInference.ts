const tyia: number|string = '123';
const tyib: 1 | 2 = 1;
const tyic: 1 | '2' = '2';

const tyid: int = 3;
const tyie: int|string = '32';
const tyif = parseInt('123', 10);

// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
const tyig = parseInt('123') + 456;

console.log(tyia, tyib, tyic, tyid, tyie, tyif, tyig);
