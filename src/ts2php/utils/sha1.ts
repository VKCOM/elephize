import * as crypto from 'crypto';
export function sha1(str: string) {
  let hash = crypto.createHash('sha1');
  hash.update(str);
  return hash.digest('hex');
}
