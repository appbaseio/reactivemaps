var path = require('path');
var webpack = require('webpack');

// module.exports = {
//   entry: './main.js',
//   output: { path: __dirname, filename: 'bundle.js' },
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

 // for multiple build
module.exports = {
  entry: {
    main: './main.js',
    meetupblast: './examples/meetupblast/main.js',
    now: './examples/now/main.js',
    heatmap: './examples/heatmap/main.js',
    transport: './examples/transport/main.js',
    earthquake: './examples/earthquake/main.js'
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/",
    filename: '[name].bundle.js'
  },
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