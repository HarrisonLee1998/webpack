/*
index.js webpack的入口文件
1. 运行指令
  开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
  webpack 会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
  整体打包环境是开发环境
  生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
  整体打包环境是生产环境
*/

/*
1. webpack默认只能识别js文件和json文件，对于其他格式，如何引入了的话，默认情况下是会报错的
2. 开发环境和生产环境将ES6模块化编译为浏览器能够识别的模块
3. 生产环境比开发环境多了一个js代码压缩
*/
function add(x, y){
  return x+y
}

console.log(add(1,2))


import data from './user.json'

console.log(data)