const path = require('path');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
  entry: './src/entry.js',
  output: {
    path: __dirname,//path.resolve(__dirname, '../server/public'), //path.resolve([from ...], to): resolve to an abs path
    filename: 'bundle.js'
  },
  plugin: [new HtmlWebpackPlugin()],
  devtool: 'source-map',
  module: {
    preloaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {test: /\.html$/, loader: 'html'}
    ]
  }
}
