const ctyiaStringDictFun = (dict: { [key: string]: string }) => {
  return Object.keys(dict).length;
};

const ctyiaBoolDictFun = (dict: { [key: string]: boolean }) => {
  return Object.keys(dict).length;
};

const ctyiaNumDictFun = (dict: { [key: string]: number }) => {
  return Object.keys(dict).length;
};

const ctyiaMixedDictFun = (dict: { [key: string]: number|string|boolean }) => {
  return Object.keys(dict).length;
};

const ctyiaStringArrFun = (dict: string[]) => {
  return Object.keys(dict).length;
};

const ctyiaBoolArrFun = (dict: boolean[]) => {
  return Object.keys(dict).length;
};

const ctyiaNumArrFun = (dict: number[]) => {
  return Object.keys(dict).length;
};

const ctyiaMixedArrFun = (dict: Array<number|string|boolean>) => {
  return Object.keys(dict).length;
};

console.log(
  ctyiaBoolArrFun([true, false]),
  ctyiaBoolDictFun({'a': true}),
  ctyiaMixedArrFun(['a', true]),
  ctyiaMixedDictFun({'a': true, 'b': 'a'}),
  ctyiaNumArrFun([1, 3, 4]),
  ctyiaNumDictFun({'a': 1}),
  ctyiaStringArrFun(['a', 'b']),
  ctyiaStringDictFun({'a': 'a', 'b': 'b'})
);
