/* globals __dirname process */
'use strict';
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');

// Hacky way from http://jlongster.com/Backend-Apps-with-Webpack--Part-I#Getting-Started
// This is needed for building dependency for socket.io
let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var backendConfig = {
  devtool: 'source-map',
  target: 'node',
  entry: './src/server.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'backend.js'
  },
  externals: nodeModules
};

var browserConfig = {
  devtool: 'source-map',
  entry: './src/app.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'browser.js'
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    enforceExtension: false,
    modules: [path.join(__dirname, 'node_modules'), 'node_modules']
  },
  resolveLoader: { modules: [path.join(__dirname, 'node_modules')] },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.woff2?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.otf$/, loader: 'file-loader' },
      { test: /\.ttf$/, loader: 'file-loader' },
      { test: /\.eot$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'file-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      // Automtically detect jQuery and $ as free var in modules
      // and inject the jquery library
      // This is required by many jquery plugins
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new webpack.DefinePlugin({
      __HIDE_DATA__: !!process.env.HIDE_DATA
    }),
    new HtmlWebpackPlugin({
      title: 'Vizceral',
      template: './src/index.html',
      favicon: './src/favicon.ico',
      inject: true
    })
  ]
};

module.exports = [backendConfig, browserConfig];
