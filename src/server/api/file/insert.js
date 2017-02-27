export default ctx => {
  const {dir, file} = ctx.query;
  const data = ctx.request.body;
  return ctx.state.store.insertFile(dir, file, data)
    .then(result => {
      ctx.body = { dir, file, result };
    })
    .catch(err => {
      ctx.status = 400;
      ctx.body = { error: err.stack || err };
    })
  ;
}
