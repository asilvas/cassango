'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  query: 'SELECT version, is_deleted FROM file WHERE app=? AND dir=? AND file=? LIMIT 1000',
  getParams: function getParams(app, dir, file) {
    return [].concat(Array.prototype.slice.call(arguments));
  }
};