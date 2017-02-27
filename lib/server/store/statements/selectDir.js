'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  query: 'SELECT file FROM file_by_dir WHERE app=? AND dir=? LIMIT ?',
  getParams: function getParams(app, dir, limit) {
    return [].concat(Array.prototype.slice.call(arguments));
  }
};