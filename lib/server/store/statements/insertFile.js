'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  query: 'INSERT INTO file (app, dir, file, version, schema_id, is_deleted, data_whole, data_diff, diff_alg, parent_version, owner, headers, acl, info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  getParams: function getParams(app, dir, file, version, schema_id, is_deleted, data_whole, data_diff, diff_alg, parent_version, owner, headers, acl, info) {
    return [].concat(Array.prototype.slice.call(arguments));
  }
};