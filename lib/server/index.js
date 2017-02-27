'use strict';

require('babel-polyfill');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import serve from 'koa-static';


//import {http} from 'uws';
var app = new _koa2.default();
//import path from 'path';

var router = new _koaRouter2.default();

var PORT = 12244;

(0, _middleware2.default)(router);
(0, _api2.default)(router);
(0, _admin2.default)(router);

//router.use(serve(path.resolve(__dirname, '../../src/server/admin')));
//router.use(serve(path.resolve(__dirname, '../app')));

app.use(router.routes());
app.use(router.allowedMethods());

_http2.default.createServer(app.callback()).listen(PORT, function () {
  return console.log('Listening @ http://localhost:' + PORT);
});