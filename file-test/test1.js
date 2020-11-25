const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件
// fs.readFile(fileName, (err, data) => {
//     if(err) {
//         console.error(err)
//         return;
//     }
//     // data是二进制类型
//     console.log(data.toString());
// })

// 写入文件
// const content = '写入内容\n';
// const opt = {
//     flag: 'a' // 追加写入, 覆盖用'w'
// }
// fs.writeFile(fileName, content, opt, (err) => {
//     if(err) {
//         console.log(err);
//     }
// })

// 判断文件是否存在
console.log(fs.existsSync(fileName));
