const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname,'./src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    hot: isDev,
    port: 3000,
    historyApiFallback: true,
    compress: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.hbs'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {
              precompileOptions: {
                knownHelpersOnly: false,
              },
              runtime: 'handlebars/dist/handlebars.runtime',
            },
          },
        ],

        exclude: /(node_modules)/,
      },
      {
        test: /\.pcss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  'postcss-preset-env': {},
                  'postcss-custom-properties': {},
                  'postcss-import': {},
                  // 'postcss-modules': {},
                  'postcss-nested': {},
                  'postcss-url': {},
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.RESOURCES_URL': JSON.stringify(process.env.RESOURCES_URL),
      'process.env.API_WS_URL': JSON.stringify(process.env.API_WS_URL),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets",
          to: "./assets",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[hash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
  ],
};
