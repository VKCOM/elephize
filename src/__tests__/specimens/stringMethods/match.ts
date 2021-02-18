let amat = '12:3:45';
let dmat = amat.match(/[24]/i);
let emat = amat.match(/[24]/ig);
console.log(dmat, emat);
