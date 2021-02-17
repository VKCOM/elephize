export const parseTitle = (title: string): string => {
  const hasInlineStyle = title.includes('[/style]');

  if (hasInlineStyle) {
    const t = title.split('[style');
    const parsedTitle = t.reduce((acc: string, rawSubString: string) => {
      if (rawSubString.includes('[/style]')) {
        const re = /\](.*?)\[\/style\]/;
        const foundText = rawSubString.match(re) as string[];
        const textContent = foundText[0].split('[/style]')[0].slice(1);

        const rawStyleString = rawSubString.split('[/style]')[0].split(']')[0];

        const keyValuePairs = rawStyleString.includes(';')
          ? rawStyleString.split(';').map((el) => el.trim())
          : [rawStyleString.trim()];

        const styles = keyValuePairs.reduce((acc: any, rawStyle: string) => {
          const [key, value] = rawStyle.split('=');
          acc[key] = value.replace(/['"]+/g, '');
          return acc;
        }, {});

        const styleString = Object.keys(styles).reduce((acc, key) => {
          acc += `${key}: var(--${key}-${styles[key]});`;
          return acc;
        }, '');

        const styledTag = `<span style="${styleString}">
            ${textContent}
          </span> `;
        acc += styledTag;
        return acc;
      }
      return acc + rawSubString + ' ';
    }, '');

    return parsedTitle;
  }

  return title;
};
