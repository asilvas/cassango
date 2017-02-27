'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _dir = require('./dir');

var _dir2 = _interopRequireDefault(_dir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (router) {
  router.get('/api', function (ctx) {
    ctx.body = { warn: 'not yet implemented' };
  });

  router.get('/api/file/select', _file2.default.select);
  router.get('/api/file/history', _file2.default.history);
  router.post('/api/file/insert', _file2.default.insert);
  router.post('/api/file/update', _file2.default.update);
  router.post('/api/file/remove', _file2.default.remove);
  router.post('/api/file/restore', _file2.default.restore);

  router.get('/api/dir/select', _dir2.default.list);
};