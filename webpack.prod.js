require('webpack')
const path = require('path')
const Uglify = require('uglifyjs-webpack-plugin')

module.exports = [
  // 生成es5的/dist/index.js，专门给浏览器端使用
  {
    mode: 'production',

    entry: './src/index.js',

    output: {
      filename: 'index.js',
      library: 'yu',
      libraryTarget: 'window',
      path: path.resolve(__dirname, 'dist'),
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
  },
]
