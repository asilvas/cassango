export default ctx => {
  const {dir, file, version, next, prev} = ctx.query;

  console.log('restore.select.promise:', dir, file, version);
  return new Promise((resolve) => {
    ctx.state.store.selectFile(dir, file, version, { next: next === '1', prev: prev === '1' })
      .then(result => {
console.log('restore.select.file:', result);
        if (!result || !result.data) {
          ctx.status = 404;
          ctx.body = { warn: 'Not Found' };
          return resolve();
        }

        ctx.state.store.insertFile(dir, file, result.data)
          .then(result => {
console.log('restore.insert.file:', result);
            ctx.body = { dir, file, result };
            resolve();
          })
          .catch(err => {
            ctx.status = 400;
            ctx.body = { error: err.stack || err };
            resolve();
          })
        ;

      })
      .catch(err => {
console.log('restore.select.file:', err);
        ctx.status = 400;
        ctx.body = { error: err.stack || err };
        resolve();
      })
    ;
  });
}
