export default {
  query: 'SELECT file FROM file_by_dir WHERE app=? AND dir=? LIMIT ?',
  getParams: function(app, dir, limit)  { return [...arguments] }
}
