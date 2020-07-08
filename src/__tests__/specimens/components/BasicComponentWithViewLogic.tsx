import * as React from 'react';

const {useState} = React;
type GridChildren = Array<Array<JSX.Element | undefined>>;

// @elephizeTarget
export function BasicComponentWithViewLogic(props: { count: number; timestampInSeconds: number; children: GridChildren }) {
  const [count, setCount] = useState(props.count);
  let sec = props.timestampInSeconds % 60;
  let min = Math.floor(props.timestampInSeconds / 60) % 60;
  let hr = Math.floor(props.timestampInSeconds / ( 60 * 60 )) % 24;

  let secStr = sec < 10 ? '0' + sec.toString() : sec.toString();
  let minStr = min < 10 ? '0' + min.toString() : min.toString();
  let hrStr = hr < 10 ? '0' + hr.toString() : hr.toString();

  let time = `${hrStr}:${minStr}:${secStr}`;
  const keys = [hrStr, minStr, secStr];

  function test(kek: string) { // used in callback only, should be eliminated
    console.log(kek);
    return 1;
  }

  return (
    <div>
      <p>You clicked {count} times starting at {props.count}.</p>
      <button onClick={() => setCount(count + test('123'))}>
        {time}
        Click me @ {
          keys.map((c) => <b key={'b'}>{c}</b>) // TODO: fix calls of non-identifiers, like [hrStr, minStr, secStr].map()
        }
        <table><tbody>
          {
            props.children.map((row, idx) => <tr key={'tr' + idx.toString()}>test</tr>)
          }
        </tbody></table>
      </button>
    </div>
  );
}
