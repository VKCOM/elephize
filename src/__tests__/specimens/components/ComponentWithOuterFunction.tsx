import * as React from 'react';

const morePrepare = (classes: string) => classes.split(' ').join('-');

/**
 * @elephizeTarget
 * @param props
 * @constructor
 */
export function ComponentWithOuterFunction(props: { children: React.ReactNode[]; classes: string }) {
  const { children, classes } = props;
  return <div className={prepareClasses(morePrepare(classes))}>{children}</div>;
}

function prepareClasses(classes: string) {
  return classes.split(';').join(' ');
}
