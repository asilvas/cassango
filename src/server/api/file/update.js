import _ from 'lodash';

export default ctx => {
  const {dir, file, version} = ctx.query;
  const data = ctx.request.body;

  return new Promise((resolve) => {
    ctx.state.store.selectFile(dir, file, version)
      .then(result => {
        if (!result) {
          ctx.status = 404;
          ctx.body = { error: 'Cannot update file as version ' + version + ' was not found' };
          return resolve();
        }

        // todo: support more than JSON
        // todo: support options.parent_version options.diff_alg to write diff instead
        // for now just store the full merged object
        const new_data = _.merge(result.data, data);
        ctx.state.store.insertFile(dir, file, new_data)
          .then(result => {
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
        ctx.status = 400;
        ctx.body = { error: err.stack || err };
        resolve();
      })
    ;
  });
}
