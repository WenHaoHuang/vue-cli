'use strict'

process.env.NODE_ENV = 'development'

const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const chalk = require('chalk')
const config = require('./webpack.config')

const devWebpackConfig = merge(baseWebpackConfig, {
  context: utils.resolve('./'),
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  devtool: config.dev.devtool,
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    contentBase: false,
    compress: true,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    watchOptions: {
      poll: config.dev.poll
    },
    disableHostCheck: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: config.dev.NODE_ENV
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = config.dev.port
  console.log('> Starting dev server...')
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              chalk.gray('--------------------------------------------'),
              'Running: ' + chalk.magenta(`http://${devWebpackConfig.devServer.host}:${port}`),
              chalk.gray('--------------------------------------------')
            ]
          },
          onErrors: utils.createNotifierCallback()
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
