function sum3(arg1: number, arg2: number, arg3: number, arg4: number) {
  return arg1 + arg2 + arg3 + arg4;
}

let sumCurry = sum3.bind(null, [2]);
console.log(sumCurry.apply(null, [2, 3, 4]));
console.log(sumCurry.call(null, 2, 3, 4));

let sumCurry2 = sumCurry.bind(null, [3, 4]);
console.log(sumCurry2.apply(null, [4]));
console.log(sumCurry2.call(null, 5));
