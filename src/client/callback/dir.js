import request from 'superagent';

export class Dir {
  constructor(client, dir, options) {

    this.client = client;
    this.dir = dir;
    this.options = options;

    // todo: arg validation
  }

  list(top, lastFile, opts, cb) {
    if (typeof top === 'function') {
      cb = top;
      lastFile = null;
      top = null;
      opts = null;
    }
    if (typeof lastFile === 'function') {
      cb = lastFile;
      lastFile = null;
      opts = null;
    }
    if (typeof opts === 'function') {
      cb = opts;
      opts = null;
    }
    top = top || 100;
    const options = opts || {};
    let url = this.client.url + `/api/dir/select?dir=${this.dir}&top=${top}`;
    if (lastFile) url += `&lastFile=${lastFile}`;
    const $this = this;
    request.get(url)
      .then(result => {
        const files = result && result.body && result.body.result;
        const lastFile = files && files[files.length - 1];
        let nextPage;
        if (files && files.length === top) { // if max hit, create a nextPage
          nextPage = lastFile.file;
        }
        cb(null, files, nextPage);
      })
      .catch(err => cb(err))
    ;
  }

  toJSON() {
    return {
      dir: this.dir
    };
  }

  toString() {
    return JSON.stringify(this, null, '  ');
  }
}