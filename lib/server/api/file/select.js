'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ctx) {
  var _ctx$query = ctx.query,
      dir = _ctx$query.dir,
      file = _ctx$query.file,
      version = _ctx$query.version,
      next = _ctx$query.next,
      prev = _ctx$query.prev;

  return ctx.state.store.selectFile(dir, file, version, { next: next === '1', prev: prev === '1' }).then(function (result) {
    ctx.body = { dir: dir, file: file, version: version, result: result || null };
  }).catch(function (err) {
    ctx.status = 400;
    ctx.body = { error: err.stack || err };
  });
};