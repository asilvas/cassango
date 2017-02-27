import {File} from './file';
import {Dir} from './dir';

export class Client {
  constructor(url, options) {
    this.url = url || '';
    this.options = options;
  }

  file(dir, file, options) {
    const args = [null, this, ...arguments];
    return new (Function.prototype.bind.apply(File, args));
  }

  dir(dir, options) {
    const args = [null, this, ...arguments];
    return new (Function.prototype.bind.apply(Dir, args));
  }

  // todo: add shortcuts?
}
