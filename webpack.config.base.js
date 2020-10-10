'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const routeDataMapper = require('webpack-route-data-mapper');
const readConfig = require('read-config');
const path = require('path');

// base config
const SRC = './src';
const DEST = './public';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

// read config from yaml files
const constant = readConfig(`${SRC}/constant.yml`);
const { BASE_DIR } = constant;
const entry = readConfig(`${SRC}/entry.yml`);
const { ENTRY } = entry;

// page/**/*.pug -> public/**/*.html
const htmlTemplates = routeDataMapper({
  baseDir: `${SRC}/pug/page`,
  src: '**/[!_]*.pug',
  options: {
    inject: false
  },
  locals: Object.assign({}, constant, {
    meta: readConfig(`${SRC}/pug/meta.yml`)
  })
});

module.exports = {
  entry: ENTRY,
  output: {
    path: path.resolve(__dirname, DEST + BASE_DIR),
    filename: '[name]',
    publicPath: BASE_DIR
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true,
          cacheDirectory: true
        }
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              root: path.resolve(`${SRC}/pug/`),
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [`${SRC}/scss`]
              }
            }
          ]
        })
      },
      {
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader'
      }
    ]
  },
  // webpack-dev-serverの設定
  devServer: {
    host: HOST,
    port: PORT,
    contentBase: DEST,
    openPage: path.relative('/', BASE_DIR)
  },
  // キャシュ有効化
  cache: true,
  // 拡張子省略時のpath解決
  resolve: {
    extensions: ['.js', '.json', '*'],
    alias: {
      '@': path.join(__dirname, SRC, 'js')
    }
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(`${SRC}/static`),
          to: path.resolve(DEST)
        }
      ]
    }),
    // 複数のHTMLファイルを出力する
    ...htmlTemplates,
    // style.cssを出力
    new ExtractTextPlugin('[name]')
  ]
};
