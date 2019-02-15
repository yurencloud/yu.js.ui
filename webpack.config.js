const webpackDev = require('./webpack.dev')
const webpackProd = require('./webpack.prod')

module.exports = (env = {}) => {
  if (env.production) {
    return webpackProd
  }
  return webpackDev
}
