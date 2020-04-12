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

/*
为了压缩css,需要引入一个插件，叫做: optimize-css-assets-webpack-plugin

注意，postcss-loader是提供兼容性，而optimize-css-assets-webpack-plugin是为了压缩css

*/

const {resolve} =   require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin =  require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 设置nodejs环境变量
process.env.NODE_ENV = 'development'

module.exports={
  entry: './src/js/index.js',
  output:{
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // 因为下面添加了css的兼容性处理，所以这里注释掉，下面重新配置过
      // {
      //   test: /\.css$/,
      //   loader: [
      //    /*
      //     为了抽离css到单独的文件，不能使用style-loader了，否则css都被加入到style标签了
      //     使用MiniCssExtractPlugin.loader取代style-loader
      //     */
      //     // 'style-loader',
      //     MiniCssExtractPlugin.loader,
      //     'css-loader'
      //   ]
      // },
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
      },
      /*
        增加对css的兼容性处理
        主要用到postcss 同样需要用到加载器，postcss-loader, 同时还需用到该加载器的插件
        postcss-preset-env, 该插件帮postcss找到package.json中browserlist里面的配置，
        通过配置找到指定的css兼容性样式，下面是browserslist的配置样例：
          "browserslist":{
            "development": [
              "last 1 chrome version",
              "last 1 firefox version",
              "last 1 safari version"
            ],
            // 配置默认是依照开发环境的要求来处理的，设置环境变量来修改
            // 注意，这里所说的环境变量以及开发或生产环境与下面配置的“mode”没有关系
            // 是指的nodejs的环境变量: process.env.NODE_ENV = 'development'
            "production": [
              ">0.2%",
              "not dead",
              "not op_mini all"
            ]
          }
        */
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-preset-env')()
              ]
            }
          }
        ]
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
    }),
    // 压缩CSS
    new optimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    compress: true
  }
}