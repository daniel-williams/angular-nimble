var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const ENV = process.env.ENV = process.env.NODE_ENV = 'dev';
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
    devtool: 'cheap-module-source-map',
    output: {
      path: helpers.root('dist'),
      publicPath: `http://${METADATA.host}:${METADATA.port}/`,
      filename: 'assets/bundles/[name].js',
      chunkFilename: 'assets/bundles/[id].chunk.js',
      sourceMapFilename: '[file].map',
    },
    plugins: [
    ],
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      public: METADATA.public,
      historyApiFallback: true,
      watchOptions: {
        ignored: /node_modules/
      },
    }
  });
};
