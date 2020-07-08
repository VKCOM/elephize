let aff = [1, 2, 3];
let bff = aff.find((el) => el % 2);
let cff = aff.find((el, idx) => el * idx % 2);
console.log(bff, cff);
