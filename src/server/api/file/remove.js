export default ctx => {
  const {dir, file, hardDelete} = ctx.query;

  if (hardDelete) {
    return ctx.state.store.deleteFile(dir, file)
      .then(result => {
        ctx.body = { dir, file, result };
      })
      .catch(err => {
        ctx.status = 400;
        ctx.body = { error: err.stack || err };
      })
    ;
  }

  return ctx.state.store.insertFile(dir, file, null, { is_deleted: true })
    .then(result => {
      ctx.body = { dir, file, result };
    })
    .catch(err => {
      ctx.status = 400;
      ctx.body = { error: err.stack || err };
    })
  ;
}
