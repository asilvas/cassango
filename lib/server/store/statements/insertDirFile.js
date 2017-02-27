'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  query: 'INSERT INTO file_by_dir (app, dir, file) VALUES (?, ?, ?)',
  getParams: function getParams(app, dir, file) {
    return [].concat(Array.prototype.slice.call(arguments));
  }
};