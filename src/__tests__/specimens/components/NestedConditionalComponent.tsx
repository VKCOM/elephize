import * as React from 'react';
import { DummyComponent } from './DummyComponent';
import { NestedComponent } from './NestedComponent';

// @elephizeTarget
export function ComponentWrapper(props: { children: JSX.Element[], onClick: () => void, count: number }) {
  const { children, ...other } = props;
  // @ts-ignore
  return window._elephizeIsServer ?
    <DummyComponent {...other}>{children}</DummyComponent> :
    <NestedComponent>{children}</NestedComponent>;
}
