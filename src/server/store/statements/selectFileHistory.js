export default {
  query: 'SELECT version, is_deleted FROM file WHERE app=? AND dir=? AND file=? LIMIT 1000',
  getParams: function(app, dir, file)  { return [...arguments] }
}
