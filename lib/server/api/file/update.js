'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ctx) {
  var _ctx$query = ctx.query,
      dir = _ctx$query.dir,
      file = _ctx$query.file,
      version = _ctx$query.version;

  var data = ctx.request.body;

  return new Promise(function (resolve) {
    ctx.state.store.selectFile(dir, file, version).then(function (result) {
      if (!result) {
        ctx.status = 404;
        ctx.body = { error: 'Cannot update file as version ' + version + ' was not found' };
        return resolve();
      }

      // todo: support more than JSON
      // todo: support options.parent_version options.diff_alg to write diff instead
      // for now just store the full merged object
      var new_data = _lodash2.default.merge(result.data, data);
      ctx.state.store.insertFile(dir, file, new_data).then(function (result) {
        ctx.body = { dir: dir, file: file, result: result };
        resolve();
      }).catch(function (err) {
        ctx.status = 400;
        ctx.body = { error: err.stack || err };
        resolve();
      });
    }).catch(function (err) {
      ctx.status = 400;
      ctx.body = { error: err.stack || err };
      resolve();
    });
  });
};