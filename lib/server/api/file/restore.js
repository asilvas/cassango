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


  console.log('restore.select.promise:', dir, file, version);
  return new Promise(function (resolve) {
    ctx.state.store.selectFile(dir, file, version, { next: next === '1', prev: prev === '1' }).then(function (result) {
      console.log('restore.select.file:', result);
      if (!result || !result.data) {
        ctx.status = 404;
        ctx.body = { warn: 'Not Found' };
        return resolve();
      }

      ctx.state.store.insertFile(dir, file, result.data).then(function (result) {
        console.log('restore.insert.file:', result);
        ctx.body = { dir: dir, file: file, result: result };
        resolve();
      }).catch(function (err) {
        ctx.status = 400;
        ctx.body = { error: err.stack || err };
        resolve();
      });
    }).catch(function (err) {
      console.log('restore.select.file:', err);
      ctx.status = 400;
      ctx.body = { error: err.stack || err };
      resolve();
    });
  });
};