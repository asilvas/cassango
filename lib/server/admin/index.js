'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminHtml = _fs2.default.readFileSync(_path2.default.resolve(__dirname, '../../../src/server/admin/index.html'));
var clientJs = _fs2.default.readFileSync(_path2.default.resolve(__dirname, '../../app/client.js'));

exports.default = function (router) {
  router.get('/admin', function (ctx) {
    ctx.type = 'text/html';
    ctx.body = adminHtml;
  });

  router.get('/admin/client.js', function (ctx) {
    ctx.type = 'text/script';
    ctx.body = clientJs;
  });
};