const iaa = Array.isArray([1, 2, 3, 4]);
const iab = Array.isArray({ a: 1, b: 2 });
const iac = Array.isArray(123);
console.log(iaa, iab, iac);
