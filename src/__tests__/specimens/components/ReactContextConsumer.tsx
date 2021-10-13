import * as React from 'react';
import { Ctx1 } from './ReactContextSource';
const { useContext } = React;

// @elephizeTarget
export function ReactContextConsumer(props: { someprop: number, innerctx: React.Context<{ testInnerVal: number }> }) {
  const innerctxValue = useContext(props.innerctx);
  const outerctxValue = useContext(Ctx1);
  return <div>Inner: {innerctxValue}, outer: {outerctxValue}</div>;
}
