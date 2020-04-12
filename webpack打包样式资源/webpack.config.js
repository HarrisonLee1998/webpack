/*
webpack的配置文件，运行webpack指令的时候会读取该文件内的指令
*/

const {resolve} = require('path')

module.exports={
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
      // 详细的loader配置
      /*
        不同的文件格式需要不同的配置，所以需要配置多个对象对应不同的格式使用不同的loader
      */
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
  // plugin的配置
  plugins: [
    // 详细的plugin的配置
  ],
  mode: 'development' //或者是production，二选一
}