import * as React from 'react';
import { DummyComponent } from './DummyComponent';
import { NestedComponent } from './NestedComponent';

// @elephizeTarget
export function ComponentWrapper(props: any) {
  const { children, ...other } = props;
  // @ts-ignore
  return window._elephizeIsServer ?
    <DummyComponent {...other}>{children}</DummyComponent> :
    <NestedComponent {...other}>{children}</NestedComponent>;
}
