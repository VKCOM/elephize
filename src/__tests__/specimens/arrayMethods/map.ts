let am = [1, 2, 3];
let bm = am.map((el) => el * 2);
let cm = am.map((el, idx) => el * idx);
let dm = am.map((el) => el * am[0]);
let em = am.map((el, idx) => {
  am[idx] = el * am[idx];
  return el;
});
let fmc = 0;
let fm = am.map((el) => {
  fmc += 1;
  fmc++;
  --fmc;
  return el * am[0];
});
let gmc = 0;
let gm = am.map((el) => {
  gmc = el + 4;
  return el * am[0];
});
console.log(bm, cm, dm, em, fm, fmc, gm, gmc);
