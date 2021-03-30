let as: any = { v: 1 };

switch (as.v) {
  case 1:
    console.log('lol');
    break;
  case '1':
    console.log('omg');
    // break intentionally omitted
  case 2:
    console.log('kek');
    break;
  default:
    console.log('wow');
}
