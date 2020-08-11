import * as React from 'react';

const { useState } = React;

export function ElephizeAnnotationTarget() { // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(0);

  return (<div>
    <p>You clicked {count} times </p>
    <button onClick={() => setCount(count + 1)
    }>
      Click me
    </button>
    <button onClick={() => setCount(count + 1)} disabled={true} >
      Click me
        </button>
  </div>);
}
