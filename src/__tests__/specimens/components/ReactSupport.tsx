import * as React from 'react';

// @elephizeTarget
export function ReactSupport() {
  const {
    useState: us,
    useEffect: ue,
    useContext: uctx,
    useReducer: ured,
    useCallback: ucb,
    useMemo: umem,
    useRef: uref,
    useImperativeHandle: uih,
    useLayoutEffect: ule,
    useDebugValue: udv
  } = React;

  // Note: most of hooks calls should emit an error that can be seen in verbose mode (except useState and useReducer)

  const [count] = us(0);
  console.log(count);

  ue(() => {
    console.log('kek!');
  });

  const theme = uctx(React.createContext('123'));
  console.log(theme); // Note: this will not be eliminated, console.log is special case for now that's not handled.

  const [state] = ured(() => [1, 2, 3, 4], [1, 2, 3, 4]);
  console.log(state);

  const memoizedCallback = ucb(() => 'kek', []);
  memoizedCallback();

  const memoized = umem(() => 'kek', []);
  console.log(memoized);

  const ref = uref(null);
  console.log(ref.current);

  uih(ref, () => null);

  ule(() => {
    console.log('lol!');
  });

  udv('ololo');

  return <div ref={ref}>kek</div>;
}
