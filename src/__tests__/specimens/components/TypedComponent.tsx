import * as React from 'react';

/**
 * @elephizeTarget
 * @param props
 * @constructor
 */
export function TypedComponent(props: { children: React.ReactNode[]; classes: string }) {
  const { children, classes } = props;
  return <div className={classes}>{children}</div>;
}