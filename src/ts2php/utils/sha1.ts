import * as crypto from 'crypto';
export function sha1(str: string) {
  const hash = crypto.createHash('sha1');
  hash.update(str);
  return hash.digest('hex');
}
