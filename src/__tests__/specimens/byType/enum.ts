enum NumberedEnum {
  'kek',
  'lol',
  'azaza'
}

// This should produce an error
enum ForcedNumberedEnum {
  'kek' = 45,
  'lol',
  'azaza'
}

export enum ValuesBasedEnum {
  'kek' = 'kekvalue',
  'lol' = 'lolvalue',
  'azaza' = 'azazavalue'
}

const enut1 = NumberedEnum.kek;
const enut2 = ForcedNumberedEnum.azaza;
const enut3 = ValuesBasedEnum.lol;

console.log(enut1, enut2, enut3);
