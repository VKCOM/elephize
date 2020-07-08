let aSpl = [1, 2, 3];
let bSpl = aSpl.splice(1);
let cSpl = aSpl.splice(1, 1);
let dSpl = aSpl.splice(1, 0, 4, 5);
let eSpl = aSpl.splice(1, 2, 4, 5, 6, 7);
console.log(bSpl, cSpl, dSpl, eSpl);
