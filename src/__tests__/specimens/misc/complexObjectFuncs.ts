export function cls(names: { [key: string]: boolean }) {
  // проверить, может проблема из-за чейнинга?йфй
  return Object.keys(names).filter((name) => names[name]).join(' ');
}
