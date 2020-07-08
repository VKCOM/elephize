import * as React from 'react';

/**
 * @elephizeTarget
 * @constructor
 */
export function Jsx() {
  const jsxa = <><div id={'test'}><b>ololo</b>test</div><i>test1</i></>;
  const jsxb = <b>{jsxa}</b>;

  const jsxprops = {id: 'test', className: 'test2'};
  const jsxc = <div title={'testtitle'} {...jsxprops} {...jsxprops}>Oh my {jsxb} my oh</div>;
  return jsxc;
}
