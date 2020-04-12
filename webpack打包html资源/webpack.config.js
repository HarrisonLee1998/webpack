const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
对于loader, 下载，配置使用
对于plugins, 下载，引入，使用
*/
module.exports={
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      
    ]
  },
  plugins: [
    /*
    配置html-webpack-plugin,此插件的功能是默认会创建一个空的html文件，自动打包输出所有JS/CSS资源
    如果需要有结构的HTML文件，则需要在下列构造函数中传入一个对象，包含`template`参数
    */
    new HtmlWebpackPlugin({
      // 把打包好后的css/js加入到我们传入的html文件中
      template:'./src/index.html'
    })
  ],
  mode: 'development'
}