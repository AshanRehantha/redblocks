const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });

const BUILD_DIR = path.resolve(__dirname, '../client/dist/');
const APP_DIR = path.resolve(__dirname, '../client/public/');

module.exports = {
  mode: 'development',
  entry: ['webpack/hot/only-dev-server', APP_DIR + '/index.jsx'],

  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                'react-refresh/babel',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/, // For CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/, // For SCSS files
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader',   // Translates CSS into CommonJS
          'sass-loader'   // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(mov|mp4)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(otf|pdf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.twig$/,
        use: [
          'raw-loader',
          {
            loader: 'twig-html-loader',
            options: {
              data: {},
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin(),
    new HtmlWebPackPlugin({
      template: APP_DIR + '/views/index.html',
      filename: 'index.html',
      inject: 'body',
      hash: true,
    }),
    new webpack.DefinePlugin({
      'process.env.HRMS_SERVICE_BASEURL': JSON.stringify(
        process.env.HRMS_SERVICE_BASEURL
      ),
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devtool: 'cheap-module-source-map',
  devServer: {
    static: APP_DIR,
    port: process.env.WEBPACK_DEV_SERVER_PORT || 8080,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        target: `http://${process.env.HOST}:${process.env.PORT}`,
        secure: false,
      },
    ],
    hot: true,
    open: true,
  },
};
