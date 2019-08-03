const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.config')
const baseWebpackConfig = require('./webpack.base.conf')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: utils.assetsPath('js/[name].js?v=[chunkhash:4]'),
    chunkFilename: utils.assetsPath('js/[id].js?v=[chunkhash:4]')
  },
  performance: {
    maxAssetSize: 1024000,
    maxEntrypointSize: 2048000,
    assetFilter: assetFilename => {
      // return assetFilename.endsWith('.js')
      return !/\.map$/.test(assetFilename)
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000, // 模块的最小体积
      minChunks: 1, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      automaticNameDelimiter: '~', // 文件名的连接符
      name: true,
      cacheGroups: {
        // 缓存组
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
      new UglifyJsPlugin({
        parallel: true,
        cache: true,
        sourceMap: config.build.productionSourceMap,
        uglifyOptions: {
          warnings: false
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: config.build.assetsRoot
    }),
    // 开启dll加速
    // new webpack.DllReferencePlugin({
    //   context: config.dll.rootDir,
    //   manifest: require('../dll/vendor-manifest.json')
    // }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css?v=[contenthash:4]'),
      chunkFilename: utils.assetsPath('css/[id].css?v=[contenthash:4]')
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css(.*)$/,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.resolve('./static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')(.*)$'),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
