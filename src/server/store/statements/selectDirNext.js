export default {
  query: 'SELECT file FROM file_by_dir WHERE app=? AND dir=? AND file > ? LIMIT ?',
  getParams: function(app, dir, lastFile, limit)  { return [...arguments] }
}
