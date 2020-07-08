let af = [1, 2, 3];
af.forEach((el) => console.log(el * 2));
af.forEach((el, idx) => {
  if (el > 1) {
    return;
  }
  af[idx] = el * 2;
});
af.forEach((el, idx) => af[idx] = el * idx);
