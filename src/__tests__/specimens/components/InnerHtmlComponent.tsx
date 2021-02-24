import * as React from 'react';

// @elephizeTarget
export const InnerHtmlComponent = () => {
  const inner = '<b><i><u>ololo!</u></i></b>';
  return <>
    <div dangerouslySetInnerHTML={{__html: inner}}>
      <p>This should be dropped</p>
    </div>
    <i dangerouslySetInnerHTML={{__html: inner}} />
  </>;
};
