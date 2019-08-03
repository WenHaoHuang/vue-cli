'use strict'
const path = require('path')
const proxyTable = require('./proxy.table.js')
const HOST = 'localhost'
// const HOST = require('ip').address()
const PORT = 8080
// const baseDir = '../../server'
const baseDir = '../dist'

const config = {
  dev: {
    NODE_ENV: '"development"',
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: proxyTable,
    host: HOST,
    port: PORT,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    devtool: '#cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true,
    useEslint: true,
    disableHostCheck: true
  },
  build: {
    NODE_ENV: '"production"',
    index: 'index.html',
    assetsRoot: path.resolve(__dirname, `${baseDir}/public`),
    assetsSubDirectory: '',
    assetsPublicPath: `/`,
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: false
  }
}

module.exports = config
