const helpers = require('./helpers');
const webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

// Create multiple instances
const extractBootstrapStyles = new ExtractTextPlugin('assets/bundles/bootstrap.[contenthash].css');
const extractVendorStyles = new ExtractTextPlugin('assets/bundles/vendor.[contenthash].css');
const extractSiteStyles = new ExtractTextPlugin('assets/bundles/site.[contenthash].css');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: helpers.root('config', 'postcss.config.js')
    }
  }
};

const cssPipeline = [
  'to-string-loader',
  'css-loader?-autoprefixer',
  postcssLoader,
];

const scssPipeline = [
  'to-string-loader',
  'css-loader?-autoprefixer',
  postcssLoader,
  'sass-loader',
];

module.exports = function (options) {
  let ENV = JSON.stringify(options.env);

  return {
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': './src/main.ts',
      'extractedStyles': [
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'styles/font-awesome.css',
        'styles/site.scss',
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.ts', '.css', '.scss'],
      alias: {
        'ScrollMagicGSAP': 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap',
        'ScrollToPlugin': 'gsap/src/uncompressed/plugins/ScrollToPlugin',
        'EasePack': 'gsap/src/uncompressed/easing/EasePack',
        node_modules: helpers.root('node_modules'),
        styles: helpers.root('client', 'assets', 'styles'),
      }
    },
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular-router-loader',
            'angular2-template-loader'
          ]
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },
        {
          // extract bootstrap styles
          test: /\.css$/,
          include: [helpers.root('node_modules', 'bootstrap')],
          use: extractBootstrapStyles.extract({
            fallback: 'style-loader',
            use: cssPipeline,
          }),
        },
        {
          // extract vendor styles
          test: /\.css$/,
          include: [helpers.root('client', 'assets', 'styles')],
          use: extractVendorStyles.extract({
            fallback: 'style-loader',
            use: cssPipeline,
          }),
        },
        {
          // extract global styles
          test: /\.scss$/,
          include: [helpers.root('client', 'assets', 'styles')],
          use: extractSiteStyles.extract({
            fallback: 'style-loader',
            use: scssPipeline,
          }),
        },
        {
          // inline all other styles
          test: /\.scss$/,
          include: [helpers.root('src', 'app')],
          use: scssPipeline,
        },
        {
          test: /\.js/,
          use: 'imports-loader?define=>false'
        },
        {
          test: /\.(otf|ttf|eot|woff2?|ico|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/bundles/[name].[hash].[ext]',
                publicPath: '../../', // NOTE: https://github.com/webpack-contrib/file-loader/issues/160
              }
            },
          ]
        },
      ]
    },
    plugins: [
      new DefinePlugin({
        'ENV': ENV,
        'process.env.ENV': ENV,
        'process.env.NODE_ENV': ENV,
      }),
      new CommonsChunkPlugin({
        names: ['app', 'vendor', 'polyfills'],
      }),
      new ContextReplacementPlugin(
        /angular(\\|\/)core/, // (\\|\/) for *nix and Windows
        helpers.root('./src'), // location of your src
        {}
      ),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body',
        favicon: 'client/assets/images/favicon.png',
        showErrors: true
      }),
      new webpack.LoaderOptionsPlugin({
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }),
      extractBootstrapStyles,
      extractVendorStyles,
      extractSiteStyles,
    ],
  };
};
