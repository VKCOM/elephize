let b1 = { a: 1, b: 2 };
let d1 = b1['a'];
let d2 = b1.b;
let d3 = { a: { b: { c: 1 }}};
let d4 = d3.a.b.c.toString();
console.log(d1, d2, d4);
