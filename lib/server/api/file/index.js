'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _select = require('./select');

var _select2 = _interopRequireDefault(_select);

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

var _insert = require('./insert');

var _insert2 = _interopRequireDefault(_insert);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

var _restore = require('./restore');

var _restore2 = _interopRequireDefault(_restore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { select: _select2.default, history: _history2.default, insert: _insert2.default, update: _update2.default, remove: _remove2.default, restore: _restore2.default };