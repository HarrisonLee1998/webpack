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
      {
        // 匹配到css文件
        test: /\.css$/,
        // 使用如下两个loder
        use: [
          /*
          特别注意，use数组中的loader的执行顺序是从右到左，从下到上
          */
          // style-loader创建style标签，将js中的样式资源插入到head中
          'style-loader',
          // css-loader将css文件转换为commonjs模块，加载到js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader'
      }
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