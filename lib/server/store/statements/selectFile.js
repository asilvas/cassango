'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  query: 'SELECT * FROM file WHERE app=? AND dir=? AND file=? LIMIT 1',
  getParams: function getParams(app, dir, file) {
    return [].concat(Array.prototype.slice.call(arguments));
  }
};