import {File} from './file';
import {Dir} from './dir';
import {Client as ClientCb} from '../callback';

export class Client extends ClientCb {
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
