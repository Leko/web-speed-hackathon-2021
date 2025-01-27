const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackRemoveEmptyScripts = require('webpack-remove-empty-scripts');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const SRC_PATH = path.resolve(__dirname, './src');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const UPLOAD_PATH = path.resolve(__dirname, '../upload');
const DIST_PATH = path.resolve(__dirname, '../dist');

/** @type {import('webpack').Configuration} */
const config = {
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    static: [PUBLIC_PATH, UPLOAD_PATH],
  },
  devtool: isProd ? 'source-map' : 'inline-source-map',
  entry: {
    webfont: path.resolve(SRC_PATH, './styles/webfont.css'),
    app: path.resolve(SRC_PATH, './index.css'),
    main: [path.resolve(SRC_PATH, './buildinfo.js'), path.resolve(SRC_PATH, './index.jsx')],
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false } },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  output: {
    filename: '[name]-[hash].js',
    path: DIST_PATH,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      BUILD_DATE: new Date().toISOString(),
      // Heroku では SOURCE_VERSION 環境変数から commit hash を参照できます
      COMMIT_HASH: process.env.SOURCE_VERSION || '',
      NODE_ENV: process.env.NODE_ENV,
      API_HOST: process.env.API_HOST ?? '',
    }),
    new WebpackRemoveEmptyScripts(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name]-[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, './index.html'),
      publicPath: '/',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: PUBLIC_PATH }],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false,
      path: false,
    },
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
};

module.exports = config;
