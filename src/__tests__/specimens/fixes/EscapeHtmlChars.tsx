import * as React from 'react';

const armenian = "&#1345;&#1381;&#1408;";
const injection = `<img src=x onerror=alert()>`;

// @elephizeTarget
export const EscapeHtmlChars = ({ children }: { children: React.ReactNode[] }) => {
  const arr = [1, 2, 3, 4];
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {arr.map((v) => <span>{injection}{v}</span>)}
      {armenian}
      {injection}
      <br />
      &#1345;&#1381;&#1408;
      <br />
      <input placeholder="&#1345;&#1381;&#1408;" />
      <br />
      <input placeholder={armenian} />
      <br />
      {children}
    </div>
  );
};
