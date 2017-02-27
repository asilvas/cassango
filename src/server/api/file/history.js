export default ctx => {
  const {dir, file, version} = ctx.query;
  return ctx.state.store.selectFileHistory(dir, file)
    .then(result => {
      ctx.body = { dir, file, version, result: result || null };
    })
    .catch(err => {
      ctx.status = 400;
      ctx.body = { error: err.stack || err };
    })
  ;
}
