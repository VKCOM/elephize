import * as React from 'react';

const { useState } = React;

// @elephizeTarget
export function KeywordTestComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => setCount(count + 1)} disabled={true}>
        Click me
      </button>
    </div>
  );
}
