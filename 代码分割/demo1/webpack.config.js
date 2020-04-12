const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
  // 多入口写法
  entry: {
    main: './src/js/index.js', 
    test: '/src/js/test.js'
  },
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode: 'development'
}