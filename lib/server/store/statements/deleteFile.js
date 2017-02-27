'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  query: 'DELETE FROM file WHERE app=? AND dir=? AND file=?',
  getParams: function getParams(app, dir, file) {
    return [].concat(Array.prototype.slice.call(arguments));
  }
};