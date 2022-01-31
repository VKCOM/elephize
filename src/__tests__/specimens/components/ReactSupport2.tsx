import * as React from 'react';
const st = React.useState;
const ue = React.useEffect;
const uctx = React.useContext;
const ured = React.useReducer;
const ucb = React.useCallback;
const umem = React.useMemo;
const uref = React.useRef;
const uih = React.useImperativeHandle;
const ule = React.useLayoutEffect;
const udv = React.useDebugValue;

/* @elephizeTarget */
export function ReactSupport2() {

  // Note: most of hooks calls should emit an error that can be seen in verbose mode (except useState and useReducer)

  const [cnt] = st(1);
  console.log(cnt);

  ue(() => {
    console.log('kek!');
  });

  const theme = uctx(React.createContext('123'));
  console.log(theme); // Note: this will not be eliminated, console.log is special case for now that's not handled.

  const [state] = ured(() => [1, 2, 3, 4], [1, 2, 3, 4]);
  console.log(state);

  const memoizedCallback = ucb(() => 'kek', []);
  memoizedCallback();

  const memoized = umem(() => () => 'kek', []);
  console.log(memoized());

  const ref = uref(null);
  console.log(ref.current);

  uih(ref, () => null);

  ule(() => {
    console.log('lol!');
  });

  udv('ololo');

  return <div></div>;
}
