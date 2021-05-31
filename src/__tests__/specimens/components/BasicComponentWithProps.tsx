import * as React from 'react';

const {useState} = React;

interface Props {
  count: number;
}

/**
 * @elephizeTarget
 * @param props
 * @constructor
 */
export function BasicComponentWithProps(props: Props) {
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
