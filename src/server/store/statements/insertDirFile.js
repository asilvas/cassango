export default {
  query: 'INSERT INTO file_by_dir (app, dir, file) VALUES (?, ?, ?)',
  getParams: function(app, dir, file) { return [...arguments] }
}
