let ar = [1, 2, 3];
let br = ar.reduce((acc, el) => acc + el, 10);
let dr = ar.reduce((acc, el) => acc + el * ar[0], 20);
let cr = ar.reduce((acc, el, idx) => acc + el * idx, 0);
console.log(br, dr, cr);
