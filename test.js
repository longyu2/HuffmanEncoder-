import { encode, decode } from "./huffman.js"

const str = "解码器只能解码由本编码器生成的编码，因为编码表格式不同"

let result = encode(str)
// let result =  encode(str,true)  // 可选项，开启调试，可以看到树的构造过程

let encodeStr = result[0]   // 
let codeTable = result[1]   // 编码表，编码必须要对应唯一的编码表才可解码

// 解码器只能解码由本编码器生成的编码，因为编码表格式不同
console.log(
    `
    原码：${str}
    编码后：${encodeStr}
    解码：${decode(encodeStr, codeTable)}
    `
);


