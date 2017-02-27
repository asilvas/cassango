export default {
  query: 'SELECT * FROM file WHERE app=? AND dir=? AND file=? LIMIT 1',
  getParams: function(app, dir, file)  { return [...arguments] }
}
