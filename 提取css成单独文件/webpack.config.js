/*
  下面的’^‘为DOS下的换行符，Linux下则是’\‘
  cnpm i webpack ^
    webpack-cli ^
    css-loader ^
    less ^
    less-loader ^
    style-loader ^
    file-loader ^
    url-loader ^
    html-webpack-plugin ^
    webpack-dev-server -g

  devServer启动命令，npx webpack-dev-server
  webpack命令打包并启动项目
*/

const {resolve} =   require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin =  require('mini-css-extract-plugin')

module.exports={
  entry: './src/js/index.js',
  output:{
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [
         /*
          为了抽离css到单独的文件，不能使用style-loader了，否则css都被加入到style标签了
          使用MiniCssExtractPlugin.loader取代style-loader
          */
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        loader: [
          /*
          为了抽离css到单独的文件，不能使用style-loader了，否则css都被加入到style标签了
          使用MiniCssExtractPlugin.loader取代style-loader
          */
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader:  'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          esModule: false,
          outputPath: 'images'
        }
      },
      {
        exclude: /\.(html|css|less|js|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'other'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // 对输出的文件进行重命名并指定目录，比如当前设置，输出路径为{output.path}/css,文件名为built.css
      filename: 'css/built.css'
    })
  ],
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    compress: true
  }
}