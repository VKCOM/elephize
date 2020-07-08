import * as React from 'react';

type CChildren = Array<Array<JSX.Element | undefined>>;

/**
 * @elephizeTarget
 * @param props
 * @constructor
 */
export function TypedComponent(props: { children: CChildren; classes: string }) {
  /** @param string[] children */
  const { children, classes } = props;
  return <div className={classes}>{children}</div>;
}