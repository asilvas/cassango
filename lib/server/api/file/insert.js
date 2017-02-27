"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ctx) {
  var _ctx$query = ctx.query,
      dir = _ctx$query.dir,
      file = _ctx$query.file;

  var data = ctx.request.body;
  return ctx.state.store.insertFile(dir, file, data).then(function (result) {
    ctx.body = { dir: dir, file: file, result: result };
  }).catch(function (err) {
    ctx.status = 400;
    ctx.body = { error: err.stack || err };
  });
};