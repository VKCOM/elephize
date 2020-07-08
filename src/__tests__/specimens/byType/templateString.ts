const tsa = 'Hello world';
const tsb = `Wow ${tsa}`;
const tsc = `Lol ${tsb.length} kek ${tsa.length} wow`;
const tsd = `Kek ${tsc + tsb.substr(1)} lol`;
const tse = `${tsa} wow`;
console.log(tsd, tse);
