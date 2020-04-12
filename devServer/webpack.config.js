const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
对于loader, 下载，配置使用
对于plugins, 下载，引入，使用
*/
module.exports={
  entry: ['./src/index.js'],
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
  mode: 'development',
  /*
  开发服务器，自动编译，自动打开浏览器，自动刷新浏览器
  注意，只在内存中编译，不会输出到磁盘中
  启动server的命令： npx webpack-dev-server
  */
  devServer: {
    compress: true, // 启动gzip压缩
    port:3000,
    open: true, // 自动打开浏览器
    /**
     * 为了解决修改了某个模块而导致所以模块被重新加载
     * css：使用style-loader可以做到HMR
     * js: 默认不能HMR
     * html：默认不能HMR，而且更新不能刷新出来了
     * 为了解决js和html的问题，需要修改entry，但是单页面的情况下，不需要做html的HMR
     * 
     */
    hot:true // 开启HMR(hot module repalcement)热模块替换
  },
  /**
   * source-map是一种源代码到构建后代码的映射技术，因为很多时候代码出错，浏览器中显示的时打包后的代码，
   * 很难找到代码的原位置，所以该工具可以解决这样的问题
   * [inline-|hidden-|eval-][nosources-][cheap-[moudule]]source-map
   * 
   * source-map:
   *  能够提示到错误代码准确信息和源代码的错误位置
   * 
   * inline-source-map 内联（只生成一个内联source-map）:
   *  能够提示到错误代码准确信息和源代码的错误位置
   * 
   * hidden-source-map 外部:
   *  错误代码的错误原因，但是没有错误位置，不能追踪到源代码的位置，只能到构建后的代码位置
   * 
   * eval-source-map 内联(每一个文件都生成一个source-map):
   *  能够提示到错误代码准确信息和源代码的错误位置
   * 
   * nosources-source-map 外部:
   *  能够提示到错误代码准确信息,但是没有任何源代码信息
   * 
   * cheap-source-map:
   *  能够提示到错误代码准确信息，也能找到源代码位置，但是只能定位行，不能定位列（当多行位于一行时，整行都报错）
   * 
   * cheap-module-source-map 外部:
   *  和cheap-source-map一样,但是这个加了module，意味着会将loader的信息加入
   * 
   * 内联和外部的区别：内联构建速度快；外部生成了文件，而内联则没有
   * 
   * 如何选择使用哪种？
   * 
   * 开发环境：
   *  速度快，调试信息友好
   *  快：（eval>inline>cheap>...）
   *  eval-cheap-source-map
   *  eval-source-map
   *  调试友好：
   *  source-map
   *  cheap-module-source-map
   *  cheap-source-map
   *  
   *  通过两者折中，最好选择 eval-source-map
   * 
   *  生产环境：
   *  由于内联会让文件体积变得非常大，所以不会用。
   *  隐藏源代码：
   *  nosource-source-map 全部隐藏
   *  hidden-source-map 只隐藏源代码，会提示构建后代码的错误信息
   */
  devtool: 'inline-source-map'
}