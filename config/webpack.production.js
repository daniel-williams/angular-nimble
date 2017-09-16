var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

var CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const PUBLIC = process.env.PUBLIC_DEV || HOST + ':' + PORT;
const METADATA = {
  host: HOST,
  port: PORT,
  public: PUBLIC,
  ENV: ENV
};


module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {
    devtool: 'source-map',
    output: {
      path: helpers.root('dist'),
      filename: 'assets/bundles/[name].js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].[chunkhash].chunk.js'
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
      }),
      new CopyWebpackPlugin([
        { from: './client/assets', to: './assets' }
      ])
    ]
  });
};