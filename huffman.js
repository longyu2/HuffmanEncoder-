import { min, replaceAt, printBinaryTree } from "./tool.js"





const encode = (str, dev = false) => {

    let arr = []        // 装分好的词
    let arr2 = []       // 装分好的词的词频
    let arr3 = []       // 装分好的编码

    // 定义dev模式,重写log函数
    const log = (str) => {
        if (dev) {
            console.log(str)
        }
    }
    log(`开始编码，原码字符串为`)
    log(str)
    // 统计字频,将词和词频装到arr和arr2
    for (let i = 0; i < str.length; i++) {
        if (arr.indexOf(str[i]) != -1) {
            arr2[arr.indexOf(str[i])]++
        }
        else {
            arr2[arr.length] = 1
            arr.push(str[i])
        }
    }

    log("开始统计词频：");
    // 查看词频
    for (let i = 0; i < arr.length; i++) {
        log(`字符${arr[i]}出现了 ${arr2[i]}次`);
    }


    // 树类
    class treeNode {
        left
        right
        val
        str
        constructor(left, right, val, str) {
            this.left = left
            this.right = right
            this.val = val
            this.str = str
        }
    }

    let minIndex = min(arr2)
    let head3 = new treeNode(null, null, arr2[minIndex], minIndex)
    arr2[min(arr2)] = null // 删除最小的元素

    let a2Len = arr2.length - 1
    for (let i = 0; i < a2Len; i++) {
        // 取最小的两个节点，构造叶子节点
        //  然后继续取最小，构造
        let minIndex = min(arr2)

        let head = new treeNode(null, null, arr2[minIndex], minIndex)
        arr2[min(arr2)] = null  // 删除最小的元素
        head3 = new treeNode(head3, head, head3.val + head.val, "非叶子")
    }

    log("生成哈夫曼树：")
    log(printBinaryTree(head3));


    // 获取叶子节点的路径
    const getPathLength = (head, path = "") => {
        if (head == null) {
            return
        }

        getPathLength(head.left, path + "0")
        getPathLength(head.right, path + "1")


        if (head.str != "非叶子") {
            log(arr[head.str] + ' 词频 ' + head.val + ' ' + path);
            arr3[head.str] = path
        }
    }

    getPathLength(head3)    // 获取编码表
    let codeTable = [arr, arr2, arr3]

    let encodeStr = ""
    // 将原数据进行编码
    for (let i = 0; i < str.length; i++) {
        encodeStr += arr3[arr.indexOf(str[i])]
    }




    return [encodeStr, codeTable]
}

// 解码器
const decode = (str, codeTable, dev = false) => {
    let arr = codeTable[0]
    let arr3 = codeTable[2]
    // 定义dev模式,重写log函数
    const log = (str) => {
        if (dev) {
            console.log(str)
        }
    }

    let endStr = ""
    let scStr = ""

    for (let i = 0; i < str.length; i++) {
        scStr += str[i]

        if (arr3.indexOf(scStr) != -1) {
            // 编码命中，输出
            endStr += arr[arr3.indexOf(scStr)]
            scStr = ""
        }
    }
    return endStr
}


export { encode, decode }