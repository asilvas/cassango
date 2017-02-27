import cassandra from 'cassandra-driver';
import selectFile from './statements/selectFile';
import selectFileWithVersion from './statements/selectFileWithVersion';
import selectFileWithVersionNext from './statements/selectFileWithVersionNext';
import selectFileWithVersionPrev from './statements/selectFileWithVersionPrev';
import selectFileHistory from './statements/selectFileHistory';
import insertFile from './statements/insertFile';
import deleteFile from './statements/deleteFile';
import insertDirFile from './statements/insertDirFile';
import selectDir from './statements/selectDir';
import selectDirNext from './statements/selectDirNext';
import deleteDirFile from './statements/deleteDirFile';

// hard code for now
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  keyspace: 'cassango'
});

export default class Store {
  constructor(app) {
    this.app = app;
  }

  selectFile(dir, file, version, opts) {
    const app = this.app;
    const options = opts || {};
    let query, params;
    if (version) {
      query = options.next ? selectFileWithVersionNext.query
        : options.prev ? selectFileWithVersionPrev.query
        : selectFileWithVersion.query
      ;
      params = selectFileWithVersion.getParams(app, dir, file, new Date(version));
    } else {
      query = selectFile.query;
      params = selectFile.getParams(app, dir, file);
    }
console.log('selectFile:', query, params);
    return new Promise((resolve, reject) => {
      client.execute(query, params, { prepare: true }, (err, result) => {
console.log('selectFile.result:', err, result);
        if (err) return reject(err);

        // undefined is desired if nothing found, this is NOT an error
        resolve(Store.fileToJS(result.rows[0]));
      });
    });
  }

  selectFileHistory(dir, file, opts) {
    const app = this.app;
    const options = opts || {};
    const query = selectFileHistory.query;
    const params = selectFileHistory.getParams(app, dir, file);
    console.log('selectFileHistory:', query, params);

    return new Promise((resolve, reject) => {
      client.execute(query, params, { prepare: true }, (err, result) => {
        console.log('selectFileHistory.result:', err, result);
        if (err) return reject(err);

        const files = (result.rows || []).map(row => { return { version: row.version, is_deleted: row.is_deleted } });

        // undefined is desired if nothing found, this is NOT an error
        resolve(files);
      });
    });
  }

  insertFile(dir, file, data, opts) {
    const query = insertFile.query;
    const options = opts || {};
    const o = {
      app: this.app,
      dir,
      file,
      version: new Date(),
      schema_id: options.schema_id,
      is_deleted: !!options.is_deleted,
      data,
      parent_version: options.diff_alg && options.parent_version,
      owner: 'future', // TODO
      headers: {}, // TODO
      acl: {}, // TODO
      info: options.info || 'insertFile'
    };
    const data_buffer = Buffer.isBuffer(data) ? data
      : Buffer.from(typeof data === 'string' ? data : JSON.stringify(data), 'utf8');

    const params = insertFile.getParams(
      o.app, o.dir, o.file, o.version, o.schema_id, o.is_deleted,
      !options.diff_alg && data_buffer, options.diff_alg && data_buffer, options.diff_alg,
      o.parent_version, o.owner, o.headers, o.acl, o.info
    );
console.log('insertFile:', query, params);
    const $this = this;
    return new Promise((resolve, reject) => {
      client.execute(query, params, { prepare: true }, (err, result) => {
        console.log('insertFile.result:', err, result);
        if (err) return reject(err);

        $this.upsertDirFile(dir, file); // fire and forget

        // undefined is desired if nothing found, this is NOT an error
        resolve(Store.fileToJS(o));
      });
    });
  }

  deleteFile(dir, file, opts) {
    const app = this.app;
    const options = opts || {};
    const query = deleteFile.query;
    const params = deleteFile.getParams(app, dir, file);

    const $this = this;
    return new Promise((resolve, reject) => {
      client.execute(query, params, { prepare: true }, (err) => {
        if (err) return reject(err);

        $this.deleteDirFile(dir, file); // fire and forget

        resolve({
          app, dir, file, deleted: true
        });
      });
    });
  }

  upsertDirFile(dir, file, opts) {
    const query = insertDirFile.query;
    const options = opts || {};
    const o = {
      app: this.app,
      dir,
      file
    };

    const params = insertDirFile.getParams(o.app, o.dir, o.file);

    return new Promise((resolve, reject) => {
      client.execute(query, params, { prepare: true }, (err, result) => {
        if (err) return reject(err);

        // undefined is desired if nothing found, this is NOT an error
        resolve(o);
      });
    });
  }

  selectDir(dir, lastFile, opts) {
    if (typeof lastFile === 'object') {
      opts = lastFile;
      lastFile = null;
    }

    const app = this.app;
    const options = opts || {};
    options.limit = options.limit || 100;
    const query = lastFile ? selectDirNext.query : selectDir.query;
    const params = lastFile ? selectDirNext.getParams(app, dir, lastFile, options.limit)
        : selectDir.getParams(app, dir, options.limit)
      ;
console.log(query, params);
    return new Promise((resolve, reject) => {
      client.execute(query, params, { prepare: true }, (err, result) => {
        if (err) return reject(err);
        const files = (result.rows || []).map(row => { return { file: row.file || null } });

        // undefined is desired if nothing found, this is NOT an error
        resolve(files);
      });
    });
  }

  deleteDirFile(dir, file, opts) {
    const app = this.app;
    const options = opts || {};
    const query = deleteDirFile.query;
    const params = deleteDirFile.getParams(app, dir, file);

    return new Promise((resolve, reject) => {
      client.execute(query, params, { prepare: true }, (err) => {
        if (err) return reject(err);

        resolve({
          app, dir, file, deleted: true
        });
      });
    });
  }

  static fileToJS(file) {
    if (!file) return null;

    return {
      app: file.app,
      dir: file.dir,
      file: file.file,
      version: typeof file.version === 'string' ? new Date(file.version) : file.version,
      schema: file.schema_id,
      deleted: file.is_deleted,
      data: file.data || (file.data_whole && JSON.parse(file.data_whole.toString('utf8'))),
      owner: file.owner,
      headers: file.headers,
      acl: file.acl,
      info: file.info
    };
  }

}
