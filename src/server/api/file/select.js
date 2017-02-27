export default ctx => {
  const {dir, file, version, next, prev} = ctx.query;
  return ctx.state.store.selectFile(dir, file, version, { next: next === '1', prev: prev === '1' })
    .then(result => {
      ctx.body = { dir, file, version, result: result || null };
    })
    .catch(err => {
      ctx.status = 400;
      ctx.body = { error: err.stack || err };
    })
  ;
}
