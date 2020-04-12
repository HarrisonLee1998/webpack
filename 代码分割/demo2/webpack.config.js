const {resolve} = require('path')

module.exports={
  entry: {
    main:'./src/js/index.js',
    test:'./src/js/test.js'
  },
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [],
  /**
   *  1. 将node_modules下的文件单独打包
   *  2. 自动分析多入口chunk中，有没有公共的文件，如果有会打包成一个公共的chunk
   */ 
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'development'
}