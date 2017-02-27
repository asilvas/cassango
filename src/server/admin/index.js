import fs from 'fs';
import path from 'path';

const adminHtml = fs.readFileSync(path.resolve(__dirname, '../../../src/server/admin/index.html'));
const clientJs = fs.readFileSync(path.resolve(__dirname, '../../app/client.js'));

export default router => {
  router.get('/admin', ctx => {
    ctx.type = 'text/html';
    ctx.body = adminHtml;
  });

  router.get('/admin/client.js', ctx => {
    ctx.type = 'text/script';
    ctx.body = clientJs;
  });
}
