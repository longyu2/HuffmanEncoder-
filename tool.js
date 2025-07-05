const min = (arr2) => {
    let maxIndex = 0
    let minIndex = 0

    for (let i = 0; i < arr2.length; i++) {
        if (arr2[i] == null) {
            maxIndex++
            minIndex++
        }
        else {
            break
        }
    }


    for (let i = 0; i < arr2.length; i++) {
        if (arr2[i] == null) {
            continue
        }
        maxIndex = arr2[i] > arr2[maxIndex] ? i : maxIndex
        minIndex = arr2[i] < arr2[minIndex] ? i : minIndex
    }

    return minIndex
}


// 打印树
const printBinaryTree = (root) => {
    if (!root) return [];

    // 递归处理左右子树
    const leftTree = printBinaryTree(root.left);
    const rightTree = printBinaryTree(root.right);

    // 当前节点的值

    const nodeValue = root.val.toString();
    const nodeWidth = nodeValue.length;

    // 计算左右子树的宽度
    const leftWidth = leftTree.length > 0 ? Math.max(...leftTree.map(line => line.length)) : 0;
    const rightWidth = rightTree.length > 0 ? Math.max(...rightTree.map(line => line.length)) : 0;

    // 计算总宽度（当前节点、连接线和左右子树的总和）
    const totalWidth = Math.max(nodeWidth, leftWidth + rightWidth + 2);

    // 居中当前节点
    const nodeLine = ' '.repeat(Math.floor((totalWidth - nodeWidth) / 2)) +
        nodeValue +
        ' '.repeat(Math.ceil((totalWidth - nodeWidth) / 2));

    // 如果没有子节点，直接返回
    if (leftTree.length === 0 && rightTree.length === 0) {
        return [nodeLine];
    }

    // 计算连接线的位置
    const leftMid = leftTree.length > 0 ? Math.floor(leftTree[0].length / 2) : 0;
    const rightMid = rightTree.length > 0 ? Math.floor(rightTree[0].length / 2) : 0;

    // 左侧连接线起始位置
    const leftConnectorPos = leftTree.length > 0
        ? Math.floor((totalWidth - (leftWidth + rightWidth + 2)) / 2) + leftMid
        : Math.floor(totalWidth / 2) - 1;

    // 右侧连接线起始位置
    const rightConnectorPos = rightTree.length > 0
        ? Math.floor((totalWidth + (leftWidth + rightWidth + 2)) / 2) - rightMid
        : Math.floor(totalWidth / 2) + 1;

    // 生成连接线
    let connectLine = ' '.repeat(totalWidth);
    if (leftTree.length > 0) {
        connectLine = replaceAt(connectLine, leftConnectorPos, '/');
        for (let i = leftConnectorPos + 1; i < Math.floor(totalWidth / 2); i++) {
            connectLine = replaceAt(connectLine, i, '_');
        }
    }
    if (rightTree.length > 0) {
        connectLine = replaceAt(connectLine, rightConnectorPos, '\\');
        for (let i = rightConnectorPos - 1; i > Math.floor(totalWidth / 2); i--) {
            connectLine = replaceAt(connectLine, i, '_');
        }
    }

    // 合并左右子树的行
    const maxHeight = Math.max(leftTree.length, rightTree.length);
    const mergedLines = [];

    for (let i = 0; i < maxHeight; i++) {
        let leftLine = i < leftTree.length ? leftTree[i] : '';
        let rightLine = i < rightTree.length ? rightTree[i] : '';

        // 左侧子树右对齐，右侧子树左对齐
        leftLine = leftLine.padEnd(leftWidth, ' ');
        rightLine = rightLine.padStart(rightWidth, ' ');

        // 合并左右子树行，中间用空格分隔
        const mergedLine = leftLine + '  ' + rightLine;

        // 整体居中
        mergedLines.push(mergedLine.padStart(Math.floor((totalWidth + mergedLine.length) / 2)).padEnd(totalWidth));
    }

    return [nodeLine, connectLine, ...mergedLines];
}

// 辅助函数：替换字符串指定位置的字符
const replaceAt = (str, index, replacement) => {
    return str.substring(0, index) + replacement + str.substring(index + 1);
}


export { min, printBinaryTree, replaceAt }