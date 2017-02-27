import request from 'superagent';

export class File {
  constructor(client, dir, file, options) {

    this.client = client;
    this.dir = dir;
    this.file = file;
    this.options = options;
    this._history = [];

    // todo: arg validation
  }

  get state() {
    return this._history[this._history.length - 1];
  }

  set state(data) {
    if (data) {
      this._history.push(data);
    }
  }

  select(version, opts, cb) {
    if (typeof version === 'function') {
      cb = version;
      version = null;
      opts = null;
    }
    if (typeof opts === 'function') {
      cb = opts;
      opts = null;
    }
    const options = opts || {};
    let url = this.client.url + `/api/file/select?dir=${this.dir}&file=${this.file}`;
    if (version) url += `&version=${version}`;
    if (options.next) url += '&next=1';
    if (options.prev) url += '&prev=1';
    const $this = this;
    request.get(url)
      .then(result => {
        $this.state = result && result.body && result.body.result;
        cb(null, $this);
      })
      .catch(err => cb(err))
    ;
  }

  insert(data, opts, cb) {
    let url = this.client.url + `/api/file/insert?dir=${this.dir}&file=${this.file}`;
    const $this = this;

    request.post(url)
      .send(data) // json only for now
      .then(result => {
        $this.state = result && result.body && result.body.result;
        cb(null, $this);
      })
      .catch(err => cb(err))
    ;
  }

  update(data, opts, cb) {
    if (!this.state) return void cb(new Error('Cannot perform an UPDATE with no historical state'));

    let url = this.client.url + `/api/file/update?dir=${this.dir}&file=${this.file}&version=${this.state.version}`;
    const $this = this;

    request.post(url)
      .send(data) // json only for now
      .then(result => {
        $this.state = result && result.body && result.body.result;
        cb(null, $this);
      })
      .catch(err => cb(err))
    ;
  }

  remove(opts, cb) {
    const options = opts || {};
    let url = this.client.url + `/api/file/remove?dir=${this.dir}&file=${this.file}`;
    if (options.hardDelete) url += `&hardDelete=${options.hardDelete}`;
    const $this = this;

    request.post(url)
      .then(result => {
        if (options.hardDelete) {
          $this._history = []; // wipe out history, it's gone
        } else { // otherwise track the soft delete state
          $this.state = result && result.body && result.body.result;
        }
        cb(null, $this);
      })
      .catch(err => cb(err))
    ;
  }

  history(top, opts, cb) {
    if (typeof top === 'function') {
      cb = top;
      top = null;
      opts = null;
    }
    if (typeof opts === 'function') {
      cb = opts;
      opts = null;
    }
    const options = opts || {};
    top = top || 100;
    let url = this.client.url + `/api/file/history?dir=${this.dir}&file=${this.file}&top=${top}`;
    request.get(url)
      .then(result => {
        const files = result && result.body && result.body.result;

        // todo: add support for paging once it's supported from api

        cb(null, files);
      })
      .catch(err => cb(err))
    ;
  }

  restore(version, opts, cb) {
    if (typeof version === 'function') {
      cb = version;
      version = null;
      opts = null;
    }
    if (typeof opts === 'function') {
      cb = opts;
      opts = null;
    }
    const options = opts || {};
    let url = this.client.url + `/api/file/restore?dir=${this.dir}&file=${this.file}&version=${version}`;
    if (options.prev) url += '&prev=1';
    else url += '&next=1'; // default
    const $this = this;
    request.post(url)
      .send({})
      .then(result => {
        $this.state = result && result.body && result.body.result;
        cb(null, $this);
      })
      .catch(err => cb(err))
    ;
  }

  toJSON() {
    return {
      dir: this.dir,
      file: this.file,
      state: this.state,
      history: this._history
    };
  }

  toString() {
    return JSON.stringify(this, null, '  ');
  }
}