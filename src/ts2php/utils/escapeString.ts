export function escapeString(str: string) {
  return str
    .replace(/"/g, '\\"')
    .replace(/\$/g, '\\$')
    .replace(/\0/g, '\\0')
    .replace(/\\/g, '\\');
}