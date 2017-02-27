import { File as FileCb } from '../callback/file';

export class File extends FileCb {
  select(version, options) {
    const fn = super.select;
    const $this = this;
    return new Promise((resolve, reject) => {
      fn.call($this, version, options, (err) => {
        if (err) return reject(err);

        resolve($this);
      });
    });
  }

  insert(data, options) {
    const fn = super.insert;
    const $this = this;
    return new Promise((resolve, reject) => {
      fn.call($this, data, options, (err) => {
        if (err) return reject(err);

        resolve($this);
      });
    });
  }

  update(data, options) {
    const fn = super.update;
    const $this = this;
    return new Promise((resolve, reject) => {
      fn.call($this, data, options, (err) => {
        if (err) return reject(err);

        resolve($this);
      });
    });
  }

  remove(options) {
    const fn = super.remove;
    const $this = this;
    return new Promise((resolve, reject) => {
      fn.call($this, options, (err) => {
        if (err) return reject(err);

        resolve($this);
      });
    });
  }

  history(top, options) {
    const fn = super.history;
    const $this = this;
    return new Promise((resolve, reject) => {
      fn.call($this, top, options, (err, result) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  restore(version, options) {
    const fn = super.restore;
    const $this = this;
    return new Promise((resolve, reject) => {
      fn.call($this, version, options, (err) => {
        if (err) return reject(err);

        resolve($this);
      });
    });
  }
}
