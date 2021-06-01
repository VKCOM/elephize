import * as React from 'react';

const {useState} = React;

interface Props {
  count: number;
  handleScroll: () => void;
}

/**
 * @elephizeTarget
 * @param props
 * @constructor
 */
export function BasicComponentWithProps({count: cnt, handleScroll}: Props) {
  const [count, setCount] = useState(cnt);

  return (
    <div onScroll={handleScroll}>
      <p>You clicked {count} times starting at {cnt}.</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
