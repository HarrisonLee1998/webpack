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
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        loader: [
          'style-loader',
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
    })
  ],
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    compress: true
  }
}