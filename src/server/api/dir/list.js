export default ctx => {
  const {dir, top, lastFile} = ctx.query;
  return ctx.state.store.selectDir(dir, lastFile, { limit: top })
    .then(result => {
      ctx.body = { dir, lastFile, result };
    })
    .catch(err => {
      ctx.status = 400;
      ctx.body = { error: err.stack || err };
    })
    ;
}
