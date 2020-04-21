const path = require('path');
var merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const productionConfig = merge([{
  output: {
    publicPath: "/",
    publicPath: "/test/",
  },
}, ]);

module.exports = {
  entry: {
    app: './src/app.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: false
    }),
    new HtmlReplaceWebpackPlugin([{
        pattern: '<link rel="stylesheet" href="styles.css">',
        replacement: '<link rel="stylesheet" href="app.min.css">'
      },
      {
        pattern: ' <script src="app.js"></script>',
        replacement: ' <script src="app.min.js"></script>'
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'app.min.css',
    }),
  ],
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [{
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.html$/,
        loader: "underscore-template-loader",
        query: {
          engine: 'lodash',
        }
      }
    ],
  },

};