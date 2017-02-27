import file from './file';
import dir from './dir';

export default router => {
  router.get('/api', ctx => {
    ctx.body = { warn: 'not yet implemented' };
  });

  router.get('/api/file/select', file.select);
  router.get('/api/file/history', file.history);
  router.post('/api/file/insert', file.insert);
  router.post('/api/file/update', file.update);
  router.post('/api/file/remove', file.remove);
  router.post('/api/file/restore', file.restore);

  router.get('/api/dir/select', dir.list);
}
