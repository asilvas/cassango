'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cassandraDriver = require('cassandra-driver');

var _cassandraDriver2 = _interopRequireDefault(_cassandraDriver);

var _selectFile2 = require('./statements/selectFile');

var _selectFile3 = _interopRequireDefault(_selectFile2);

var _selectFileWithVersion = require('./statements/selectFileWithVersion');

var _selectFileWithVersion2 = _interopRequireDefault(_selectFileWithVersion);

var _selectFileWithVersionNext = require('./statements/selectFileWithVersionNext');

var _selectFileWithVersionNext2 = _interopRequireDefault(_selectFileWithVersionNext);

var _selectFileWithVersionPrev = require('./statements/selectFileWithVersionPrev');

var _selectFileWithVersionPrev2 = _interopRequireDefault(_selectFileWithVersionPrev);

var _selectFileHistory2 = require('./statements/selectFileHistory');

var _selectFileHistory3 = _interopRequireDefault(_selectFileHistory2);

var _insertFile2 = require('./statements/insertFile');

var _insertFile3 = _interopRequireDefault(_insertFile2);

var _deleteFile2 = require('./statements/deleteFile');

var _deleteFile3 = _interopRequireDefault(_deleteFile2);

var _insertDirFile = require('./statements/insertDirFile');

var _insertDirFile2 = _interopRequireDefault(_insertDirFile);

var _selectDir2 = require('./statements/selectDir');

var _selectDir3 = _interopRequireDefault(_selectDir2);

var _selectDirNext = require('./statements/selectDirNext');

var _selectDirNext2 = _interopRequireDefault(_selectDirNext);

var _deleteDirFile2 = require('./statements/deleteDirFile');

var _deleteDirFile3 = _interopRequireDefault(_deleteDirFile2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// hard code for now
var client = new _cassandraDriver2.default.Client({
  contactPoints: ['127.0.0.1'],
  keyspace: 'cassango'
});

var Store = function () {
  function Store(app) {
    _classCallCheck(this, Store);

    this.app = app;
  }

  _createClass(Store, [{
    key: 'selectFile',
    value: function selectFile(dir, file, version, opts) {
      var app = this.app;
      var options = opts || {};
      var query = void 0,
          params = void 0;
      if (version) {
        query = options.next ? _selectFileWithVersionNext2.default.query : options.prev ? _selectFileWithVersionPrev2.default.query : _selectFileWithVersion2.default.query;
        params = _selectFileWithVersion2.default.getParams(app, dir, file, new Date(version));
      } else {
        query = _selectFile3.default.query;
        params = _selectFile3.default.getParams(app, dir, file);
      }
      console.log('selectFile:', query, params);
      return new Promise(function (resolve, reject) {
        client.execute(query, params, { prepare: true }, function (err, result) {
          console.log('selectFile.result:', err, result);
          if (err) return reject(err);

          // undefined is desired if nothing found, this is NOT an error
          resolve(Store.fileToJS(result.rows[0]));
        });
      });
    }
  }, {
    key: 'selectFileHistory',
    value: function selectFileHistory(dir, file, opts) {
      var app = this.app;
      var options = opts || {};
      var query = _selectFileHistory3.default.query;
      var params = _selectFileHistory3.default.getParams(app, dir, file);
      console.log('selectFileHistory:', query, params);

      return new Promise(function (resolve, reject) {
        client.execute(query, params, { prepare: true }, function (err, result) {
          console.log('selectFileHistory.result:', err, result);
          if (err) return reject(err);

          var files = (result.rows || []).map(function (row) {
            return { version: row.version, is_deleted: row.is_deleted };
          });

          // undefined is desired if nothing found, this is NOT an error
          resolve(files);
        });
      });
    }
  }, {
    key: 'insertFile',
    value: function insertFile(dir, file, data, opts) {
      var query = _insertFile3.default.query;
      var options = opts || {};
      var o = {
        app: this.app,
        dir: dir,
        file: file,
        version: new Date(),
        schema_id: options.schema_id,
        is_deleted: !!options.is_deleted,
        data: data,
        parent_version: options.diff_alg && options.parent_version,
        owner: 'future', // TODO
        headers: {}, // TODO
        acl: {}, // TODO
        info: options.info || 'insertFile'
      };
      var data_buffer = Buffer.isBuffer(data) ? data : Buffer.from(typeof data === 'string' ? data : JSON.stringify(data), 'utf8');

      var params = _insertFile3.default.getParams(o.app, o.dir, o.file, o.version, o.schema_id, o.is_deleted, !options.diff_alg && data_buffer, options.diff_alg && data_buffer, options.diff_alg, o.parent_version, o.owner, o.headers, o.acl, o.info);
      console.log('insertFile:', query, params);
      var $this = this;
      return new Promise(function (resolve, reject) {
        client.execute(query, params, { prepare: true }, function (err, result) {
          console.log('insertFile.result:', err, result);
          if (err) return reject(err);

          $this.upsertDirFile(dir, file); // fire and forget

          // undefined is desired if nothing found, this is NOT an error
          resolve(Store.fileToJS(o));
        });
      });
    }
  }, {
    key: 'deleteFile',
    value: function deleteFile(dir, file, opts) {
      var app = this.app;
      var options = opts || {};
      var query = _deleteFile3.default.query;
      var params = _deleteFile3.default.getParams(app, dir, file);

      var $this = this;
      return new Promise(function (resolve, reject) {
        client.execute(query, params, { prepare: true }, function (err) {
          if (err) return reject(err);

          $this.deleteDirFile(dir, file); // fire and forget

          resolve({
            app: app, dir: dir, file: file, deleted: true
          });
        });
      });
    }
  }, {
    key: 'upsertDirFile',
    value: function upsertDirFile(dir, file, opts) {
      var query = _insertDirFile2.default.query;
      var options = opts || {};
      var o = {
        app: this.app,
        dir: dir,
        file: file
      };

      var params = _insertDirFile2.default.getParams(o.app, o.dir, o.file);

      return new Promise(function (resolve, reject) {
        client.execute(query, params, { prepare: true }, function (err, result) {
          if (err) return reject(err);

          // undefined is desired if nothing found, this is NOT an error
          resolve(o);
        });
      });
    }
  }, {
    key: 'selectDir',
    value: function selectDir(dir, lastFile, opts) {
      if ((typeof lastFile === 'undefined' ? 'undefined' : _typeof(lastFile)) === 'object') {
        opts = lastFile;
        lastFile = null;
      }

      var app = this.app;
      var options = opts || {};
      options.limit = options.limit || 100;
      var query = lastFile ? _selectDirNext2.default.query : _selectDir3.default.query;
      var params = lastFile ? _selectDirNext2.default.getParams(app, dir, lastFile, options.limit) : _selectDir3.default.getParams(app, dir, options.limit);
      console.log(query, params);
      return new Promise(function (resolve, reject) {
        client.execute(query, params, { prepare: true }, function (err, result) {
          if (err) return reject(err);
          var files = (result.rows || []).map(function (row) {
            return { file: row.file || null };
          });

          // undefined is desired if nothing found, this is NOT an error
          resolve(files);
        });
      });
    }
  }, {
    key: 'deleteDirFile',
    value: function deleteDirFile(dir, file, opts) {
      var app = this.app;
      var options = opts || {};
      var query = _deleteDirFile3.default.query;
      var params = _deleteDirFile3.default.getParams(app, dir, file);

      return new Promise(function (resolve, reject) {
        client.execute(query, params, { prepare: true }, function (err) {
          if (err) return reject(err);

          resolve({
            app: app, dir: dir, file: file, deleted: true
          });
        });
      });
    }
  }], [{
    key: 'fileToJS',
    value: function fileToJS(file) {
      if (!file) return null;

      return {
        app: file.app,
        dir: file.dir,
        file: file.file,
        version: typeof file.version === 'string' ? new Date(file.version) : file.version,
        schema: file.schema_id,
        deleted: file.is_deleted,
        data: file.data || file.data_whole && JSON.parse(file.data_whole.toString('utf8')),
        owner: file.owner,
        headers: file.headers,
        acl: file.acl,
        info: file.info
      };
    }
  }]);

  return Store;
}();

exports.default = Store;