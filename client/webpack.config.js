const path = require('path');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const DefinePlugin = require('webpack').DefinePlugin;

module.exports = {
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, '../server/public'), //path.resolve([from ...], to): resolve to an abs path
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({ //DO NOT USE 'PLUGIN'. THE 'S' is important!
      template: './src/index.html'
    }),
    new DefinePlugin({
      BASE_URL : JSON.stringify( process.env.BASE_URL || '' ),
      CLIENT_ID: JSON.stringify( process.env.CLIENT_ID || '')
    })
    ],
  module: {
    preloaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
          query: {
            presets: ['es2015']
          }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  }
}
