function pdf1({ param1: p1, param2: p2, ...other }: { param1: number; param2: string; param3: number; param4: number }, { param1: p3, param2: p4 }: { param1: number; param2: string }, param3: boolean) {
  return p1.toString() + p2 + other.param3.toString() + other.param4.toString() + param3.toString() + p3.toString() + p4;
}

function pdf2([ param1, param2, ...other ]: [ number, string, number, number ], [ param4, param5 ]: [ number, string ], param3: boolean) {
  return param1.toString() + param2 + other[0].toString() + other[1].toString() + param3.toString() + param4.toString() + param5;
}

console.log(
  pdf1({ param1: 1, param2: '2', param3: 3, param4: 4 }, { param1: 1, param2: '2' }, false),
  pdf2([1, '2', 3, 4], [1, '2'], false)
);
