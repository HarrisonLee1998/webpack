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
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        // 由于url-loader依赖于file-loader，所以需要下载两个包
        loaders: 'url-loader',
        options:{
          // 表示图片大小小于8kb时，就会被base64处理，
          // 优点是减少请求数量，减轻服务器压力，缺点是文件体积变大，请求速度变慢
          limit: 8*1024,
          /*
           因为url-loader默认使用es6的模块化解析，而html-loader引入图片是commonjs
           解决：关闭url-loader的es6模块化，使用commonjs解析，但是我的4.42.1版本没有出现这个问题
           如果有问题，通过如下设置：
           esModule: false
          */

          /*
            图片处理过后的文件名是文件的哈希值，当前版本下是32位的，
            可以给文件重命名，通过name字段指定
            [hash:10]指的是去hash值前10位
            [ext]指的是文件的原扩展名
          */
         name: '[hash:10].[ext]'
        }
      },
      {
        // 配置less文件的loader
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
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