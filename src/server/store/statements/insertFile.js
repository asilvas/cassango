export default {
  query: 'INSERT INTO file (app, dir, file, version, schema_id, is_deleted, data_whole, data_diff, diff_alg, parent_version, owner, headers, acl, info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  getParams: function(app, dir, file, version, schema_id, is_deleted, data_whole, data_diff, diff_alg, parent_version, owner, headers, acl, info) { return [...arguments] }
}
