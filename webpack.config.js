var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './main.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    preLoaders: [
        { test: /\.json$/, exclude: /node_modules/, loader: 'json'},
    ],
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015','stage-0', 'react']
        }
      }
    ]
  },
};