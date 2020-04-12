import $ from 'jquery'

function sum(...args){
  return args.reduce((p, c) => p+c, 0)
}

console.log($)