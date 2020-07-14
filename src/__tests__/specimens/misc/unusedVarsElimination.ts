// eslint-disable-next-line @typescript-eslint/no-unused-vars
const uve = 3; // should be eliminated
export const uv = 1; // should not eliminate exports
const uvctx = 1; // used in lower context and should not be eliminated
export function uvfun() {
  const a = uvctx; // used
  const b = a + 2; // unused and should be eliminated (elimination of const c makes it so)
  const c = b + 3; // unused and should be eliminated (elimination of const e makes it so)
  const d = a;
  console.log(d);
  const e = uvefun(c); // unused and should be eliminated (elimination of const f makes it so)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const f = e;
  const g = uvctx;
  return g;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function uvefun(s: number) { // unused and should be eliminated (elimination of const e makes it so)
  console.log('azaza');
  return 11;
}
