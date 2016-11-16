var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/app.js',
  output: { path: path.join(__dirname, "umd"), filename: 'ReactiveMaps.js' },
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
      },
      {
        test: /node_modules\/JSONStream\/index\.js$/,
        loaders: ['shebang', 'babel']
      }
    ]
  },
};

 // for multiple build
// module.exports = {
//   entry: {
//     app: './app/app.js'
//   },
//   output: {
//     path: path.join(__dirname, "dist"),
//     publicPath: "/dist/",
//     filename: '[name].bundle.js'
//   },
//   module: {
//     preLoaders: [
//         { test: /\.json$/, exclude: /node_modules/, loader: 'json'},
//     ],
//     loaders: [
//       {
//         test: /.jsx?$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         query: {
//           presets: ['es2015','stage-0', 'react']
//         }
//       },
//       {
//         test: /node_modules\/JSONStream\/index\.js$/,
//         loaders: ['shebang', 'babel']
//       }
//     ]
//   },
// };
