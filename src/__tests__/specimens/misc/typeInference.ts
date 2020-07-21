const tyia: number|string = '123';
const tyib: 1 | 2 = 1;
const tyic: 1 | '2' = '2';

const tyid: int = 3;
const tyie: int|string = '32';
const tyif = parseInt('123', 10);

// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
const tyig = parseInt('123') + 456;

const tyih: mixed[]= ['123', 123];
const tyij: Array<mixed | int> = ['123', 123];
const tyik: [mixed, int] = ['123', 123];
let tyii: mixed = 123;
tyii = '123';

export function classNames(...args: mixed[]) {
  const result: string[] = [];

  args.forEach((item: string | string[]) => {
    if (!item) {
      return;
    }

    switch (typeof item) {
      case 'string':
        result.push(item);
        break;

      case 'object':
        Object.keys(item).forEach((key) => {
          if (item[+key]) {
            result.push(key);
          }
        });
        break;

      default:
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        result.push('' + item);
    }
  });

  return result.join(' ');
}

console.log(tyia, tyib, tyic, tyid, tyie, tyif, tyig, tyih, tyii, tyij, tyik);
