require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const Uglify = require('uglifyjs-webpack-plugin')

const outputToWindow = {
  output: {
    filename: 'index.js',
    library: 'yu',
    libraryTarget: 'window',
    path: path.resolve(__dirname, 'dist'),
  },
}

const outputToCommonjs2 = {
  output: {
    filename: 'index.js',
    library: 'yu',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'lib'),
  },
}

const prodConfig = {
  mode: 'production',

  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },

  plugins: [
    new Uglify({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
        },
        output: {
          beautify: false,
          comments: false,
        },
      },
    }),
  ],
}

module.exports = [
  merge(prodConfig, outputToWindow),
  merge(prodConfig, outputToCommonjs2),
]
