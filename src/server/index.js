import 'babel-polyfill';

//import {http} from 'uws';
import http from 'http';
//import path from 'path';
import middleware from './middleware';
import api from './api';
import admin from './admin';
//import serve from 'koa-static';
import Router from 'koa-router';
import Koa from 'koa';

const app = new Koa();
const router = new Router();

const PORT = 12244;

middleware(router);
api(router);
admin(router);

//router.use(serve(path.resolve(__dirname, '../../src/server/admin')));
//router.use(serve(path.resolve(__dirname, '../app')));

app.use(router.routes());
app.use(router.allowedMethods());

http
  .createServer(app.callback())
  .listen(PORT, () => console.log(`Listening @ http://localhost:${PORT}`))
;
