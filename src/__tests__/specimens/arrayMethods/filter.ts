let afl = [1, 2, 3];
let bfl = afl.filter((el) => el % 2);
let cfl = afl.filter((el, idx) => el * idx % 2);
console.log(bfl, cfl);
