"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ctx) {
  var _ctx$query = ctx.query,
      dir = _ctx$query.dir,
      file = _ctx$query.file,
      version = _ctx$query.version;

  return ctx.state.store.selectFileHistory(dir, file).then(function (result) {
    ctx.body = { dir: dir, file: file, version: version, result: result || null };
  }).catch(function (err) {
    ctx.status = 400;
    ctx.body = { error: err.stack || err };
  });
};