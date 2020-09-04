import * as React from 'react';

type CChildren = Array<Array<JSX.Element | undefined>>;

const morePrepare = (classes: string) => classes.split(' ').join('-');

/**
 * @elephizeTarget
 * @param props
 * @constructor
 */
export function ComponentWithOuterFunction(props: { children: CChildren; classes: string }) {
  /** @param string[] children */
  const { children, classes } = props;
  return <div className={prepareClasses(morePrepare(classes))}>{children}</div>;
}

function prepareClasses(classes: string) {
  return classes.split(';').join(' ');
}
