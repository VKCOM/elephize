export function classNames(...args: mixed[]): string {
  const result: string[] = [];

  args.forEach((item): void => {
    if (!item) {
      return;
    }

    switch (typeof item) {
      case 'string':
        result.push(item);
        break;

      case 'object':
        Object.keys(item).forEach((key: string) => {
          if ((item as any)[key]) {
            result.push(key);
          }
        });
        break;

      default:
        result.push(String(item));
    }
  });

  return result.join(' ');
}
