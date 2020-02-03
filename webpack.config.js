const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');


module.exports = {
  entry: {
    app: './src/script.js'
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
        pattern: ' <script src="script.js"></script>',
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
    }, ],
  },

};