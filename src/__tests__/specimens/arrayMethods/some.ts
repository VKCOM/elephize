let asm = [1, 2, 3];
let bsm = asm.some((val) => val > 1);
let csm = asm.some((val, idx) => val * idx % 2);
console.log(bsm, csm);
