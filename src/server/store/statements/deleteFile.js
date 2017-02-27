export default {
  query: 'DELETE FROM file WHERE app=? AND dir=? AND file=?',
  getParams: function(app, dir, file)  { return [...arguments] }
}
