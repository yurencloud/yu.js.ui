const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: './build/dev.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '/example/dist'),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(bower_components)/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader'],
        }),
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },

  devtool: 'source-map',

  devServer: {
    port: 9000,
    hot: true,
    contentBase: path.join(__dirname, '/example'),
    watchContentBase: true,
  },

  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      filename: 'index.css',
    }),
  ],
}
