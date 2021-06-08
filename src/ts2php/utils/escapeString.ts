import { decode, encode } from 'html-entities';

/** Used to map characters to HTML entities. */
const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#x27;',
} as const;

/** Used to match HTML entities and HTML characters. */
const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
export function escapeHtml(str: string) {
  return (str && reHasUnescapedHtml.test(str)) ?
    str.replace(reUnescapedHtml, (chr: keyof typeof htmlEscapes) => htmlEscapes[chr]) :
    (str || '');
}

export function escapeString(str: string) {
  return str
    .replace(/"/g, '\\"')
    .replace(/\$/g, '\\$')
    .replace(/\0/g, '\\0')
    .replace(/\\/g, '\\');
}

export function escapeTextLiteral(txt: string, escapeAll = false) {
  const txtDecoded = decode(txt);
  const txtEscaped = escapeAll
    ? encode(txtDecoded, { mode: 'nonAscii' })
    : escapeHtml(txtDecoded);
  const str = txtEscaped.replace(/^\s+|\s+$/g, ' ');
  if (str !== ' ' && str !== '  ') {
    return '"' + str + '"';
  }
  return '';
}

export function unescapeHtml(str: string) {
  return str && Object.keys(htmlEscapes).reduce((acc, k: keyof typeof htmlEscapes) => {
    return acc.replace(new RegExp(htmlEscapes[k], 'g'), k);
  }, str).replace(/"/g, '\\"');
}

// Special workaround to match react behavior for escaping literal strings in jsx expressions in attributes
export function escapeExprLiteral(txt: string) {
  const txtDecoded = decode(txt);
  const txtEscaped = encode(txtDecoded, { mode: 'nonAscii' });
  const str = unescapeHtml(txtEscaped.replace(/^\s+|\s+$/g, ' '));
  if (str !== ' ' && str !== '  ') {
    return '"' + str + '"';
  }
  return '';
}
