'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  query: 'SELECT file FROM file_by_dir WHERE app=? AND dir=? AND file > ? LIMIT ?',
  getParams: function getParams(app, dir, lastFile, limit) {
    return [].concat(Array.prototype.slice.call(arguments));
  }
};