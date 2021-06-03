import * as React from 'react';

const armenian = "&#1345;&#1381;&#1408;";
const injection = `<img src=x onerror=alert()>`;

// @elephizeTarget
export const EscapeHtmlChars = () => {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {armenian}
      {injection}
      <br />
      &#1345;&#1381;&#1408;
      <br />
      <input placeholder="&#1345;&#1381;&#1408;" />
      <br />
      <input placeholder={armenian} />
      <br />
    </div>
  );
};
