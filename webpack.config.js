const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/index',

  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'example/dist'),
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
