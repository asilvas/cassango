import { Dir as DirCb } from '../callback/dir';

export class Dir extends DirCb {
  list(top, lastFile, options) {
    const fn = super.list;
    const $this = this;
    return new Promise((resolve, reject) => {
      fn.call($this, top, lastFile, options, (err, files, nextPage) => {
        if (err) return reject(err);

        resolve({files, nextPage});
      });
    });
  }
}

function createNextPage(nextPageCb) {
  if (!nextPageCb) return;

  return (nextTop) => {
    return new Promise((resolve, reject) => {
      nextPageCb(nextTop, (err, files, nextPageCb) => {
        if (err) return reject(err);

        resolve({files, nextPage: createNextPage(nextPageCb)});
      });
    });
  };
}