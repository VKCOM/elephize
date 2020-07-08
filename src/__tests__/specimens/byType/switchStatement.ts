let as: any = 1;

switch (as) {
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
