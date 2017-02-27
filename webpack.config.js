var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: './src/app/client.js',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'lib/app')
  }
};
