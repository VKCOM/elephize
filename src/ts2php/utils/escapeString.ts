/** Used to map characters to HTML entities. */
const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#x27;'
} as const;

/** Used to match HTML entities and HTML characters. */
const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
export function escapeHtml(str: string) {
  return (str && reHasUnescapedHtml.test(str))
    ? str.replace(reUnescapedHtml, (chr: keyof typeof htmlEscapes) => htmlEscapes[chr])
    : (str || '');
}


export function escapeString(str: string) {
  return str
    .replace(/"/g, '\\"')
    .replace(/\$/g, '\\$')
    .replace(/\0/g, '\\0')
    .replace(/\\/g, '\\');
}