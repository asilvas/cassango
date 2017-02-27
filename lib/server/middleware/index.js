'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (router) {
  router.use(function (ctx, next) {
    ctx.state.app = 'default'; // hard code for now
    ctx.state.store = new _store2.default(ctx.state.app);

    return next();
  });

  router.use((0, _koaBodyparser2.default)());
};