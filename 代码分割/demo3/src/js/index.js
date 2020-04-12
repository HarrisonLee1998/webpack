/**
 * 通过js代码，让某个文件被单独打包成一个chunk
 */

 import $ from 'jquery'

 $('body').css('background-color','deeppink')

import('./test')
.then(({ sum }) => {
  console.log(sum)
  console.log(sum(567, 789))
})
.catch(() => {
  console.log('文件加载失败')
})