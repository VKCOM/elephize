/**
 * Joins classnames conditionally
 *
 * @example
 *   classNames('foo', 'bar') // "foo bar"
 *   classNames('foo', null, 'bar') // "foo bar"
 *   classNames('foo', 'bar', { baz: false }) // "foo bar"
 *   classNames('foo', 'bar', { baz: true }) // "foo bar baz"
 *
 * @param {...(string|Record<string, boolean>|undefined)} args
 * @return {string}
 */
export function classNames(...args) {
  const result = [];

  args.forEach((item) => {
    if (!item) {
      return;
    }

    switch (typeof item) {
      case 'string':
        result.push(item);
        break;

      case 'object':
        Object.keys(item).forEach((key) => {
          if (item[key]) {
            result.push(key);
          }
        });
        break;

      default:
        result.push('' + item);
    }
  });

  return result.join(' ');
}
