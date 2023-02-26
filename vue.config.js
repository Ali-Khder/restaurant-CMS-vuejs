const { defineConfig } = require('@vue/cli-service')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin

module.exports =
  defineConfig({
    // configureWebpack: {
    //   plugins: [new BundleAnalyzerPlugin()]
    // },
    publicPath: '/',
    assetsDir: './',
    productionSourceMap: false,
    chainWebpack: config => {
      config.performance
        .hints(false)
        .maxEntrypointSize(512000)
        .maxAssetSize(512000)
    },
    transpileDependencies: true,
    css: {
      loaderOptions: {
        sass: {
          additionalData: '@import "@/styles/base.scss";'
        }
      }
    },
    // publicPath: process.env.NODE_ENV === 'production'
    //   ? '/my-project/'
    //   : '/'
  })
