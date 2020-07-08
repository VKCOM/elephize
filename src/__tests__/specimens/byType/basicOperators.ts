let op1 = 2 + 5;
let op2 = 5 - 2;
let op3 = 2 + '5'; // eslint-disable-line @typescript-eslint/restrict-plus-operands
let op4 = 2 * 5;
let op5 = 5 / 2;
let op6 = 6 / 5.;
let op7 = 5 % 3;
let op8 = (op1 + op2 - op4) * (op5 / op6) % op7;

op1 += op2;
op2 -= op1;
op4 *= op1;
op5 /= op1;
op6++;
op7--;

let op10 = op1 || op4;
let op11 = op2 && op6;
let op12 = !op3;
let op13 = !!op3;
let op14 = !(!(op10 && op11 && op12) || op13);
let op15 = +op1;
let op16 = -op5;

let op21 = op1 & op2;
let op22 = op2 | op1;
op21 &= op4;
op22 |= op5;
let op23 = op10 * op11 | 0;

let op24 = true;
let op25 = false;
let op26 = undefined;
let op27 = null;

let op28 = op25 || [];
let op29 = op1 || op4 === 4;

let op31 = op1 == op2;
let op32 = op1 === op4;
let op33 = op5 != op6;
let op34 = op5 !== op7;
let op35 = op1 < op2;
let op36 = op1 > op4;
let op37 = op5 <= op6;
let op38 = op5 >= op7;

console.log(op8, op14, op15, op16, op21, op22, op23, op24, op25, op26, op27, op28, op29, op31, op32, op33, op34, op35, op36, op37, op38);
