

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
      {
        /*
         * 注意，在项目中只检查我们自己写的源代码，而对依赖中的第三方代码不进行检查，所以要exclude掉
         * 需要下载一些包：
         * eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import 
         */
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true // 自动修复
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