"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ctx) {
  var _ctx$query = ctx.query,
      dir = _ctx$query.dir,
      top = _ctx$query.top,
      lastFile = _ctx$query.lastFile;

  return ctx.state.store.selectDir(dir, lastFile, { limit: top }).then(function (result) {
    ctx.body = { dir: dir, lastFile: lastFile, result: result };
  }).catch(function (err) {
    ctx.status = 400;
    ctx.body = { error: err.stack || err };
  });
};