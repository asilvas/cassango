export default {
  query: 'SELECT * FROM file WHERE app=? AND dir=? AND file=? AND version<=? LIMIT 1',
  getParams: function(app, dir, file, version)  { return [...arguments] }
}
