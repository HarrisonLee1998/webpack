/**
 * 目前还存在问题，打包后运行会报错：$ is not a function
 */

const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /**
       * js兼容性处理，使用babel-loader @babel-core
       * 需要下载 babel-loader @babel-core @babel/preset-env
       */
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: {
          // 配置一些预设

          /* 1. @babel/preset-env只能处理一些基本的语法兼容性处理
           * 2. 所以需要另一种，@babel/polyfill, 此时虽然兼容性解决了，但是导致打包后容量体积太大
           * 3. 应该对兼容性处理做按需加载
           */
          presets: ['@babel/preset-env'],
          plugins:['@babel/plugin-transform-runtime', { "corejs": 3 }],
          // 开启缓存，第二次构建时，会读取之前的缓存，从而加快速度
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}