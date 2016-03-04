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
      CLIENT_ID: JSON.stringify( process.env.CLIENT_ID || ''),
      EMAIL: JSON.stringify( process.env.EMAIL || 'no email')
    })
    ],
  module: {
    preloaders: [
      {
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        loader: "jshint-loader"
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
          query: {
          presets: ['es2015'],
          cacheDirectory: true,
          plugins: [ 'transform-runtime' ]//https://www.npmjs.com/package/babel-plugin-transform-runtime
          }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        // scss -> css -> style loader
        loader: 'style!css?sourceMap!sass?sourceMap'
        // custom name for easier debug:
        //loader: 'style!css?modules&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]!sass?sourceMap'
        // use "css modules", see https://github.com/css-modules/css-modules
        //loader: 'style!css?modules&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]!sass?sourceMap'
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  },
  sassLoader: {
    includePaths: [ './src/scss' ] //, './src/scss/colors'
  }
}
