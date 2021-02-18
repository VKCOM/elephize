import { LogObj } from './log';
import { Node } from 'typescript';

export const extractRegexFlags = (regex: string, log: LogObj, ctx: Node) => {
  let [matched, expression, flags] = regex.match(/^"\/(.*?)\/([a-zA-Z]+)?"$/) || [];
  let output = {
    phpFlags: '',
    globalSearch: false,
    expression
  };

  if (!matched) {
    log.error('Failed to parse regexp: %s', [regex], log.ctx(ctx));
    return output;
  }

  if (flags.includes('g')) {
    output.globalSearch = true;
    flags = flags.replace('g', '');
  }

  if (flags.includes('i')) {
    output.phpFlags += 'i';
    flags = flags.replace('i', '');
  }

  if (flags !== '') {
    log.error('Unsupported regexp modifiers encountered: %s', [flags], log.ctx(ctx));
  }

  return output;
};
