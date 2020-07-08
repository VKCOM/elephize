import * as React from 'react';

const {useState} = React;

/**
 * @elephizeTarget
 * @param props
 * @constructor
 */
export function BasicComponentWithProps(props: { count: number }) {
  const [count, setCount] = useState(props.count);

  return (
    <div>
      <p>You clicked {count} times starting at {props.count}.</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
